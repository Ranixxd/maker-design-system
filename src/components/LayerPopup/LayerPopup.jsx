import { useEffect, useState, useRef, useCallback } from 'react';
import IconButton from '../IconButton/IconButton';
import Title from '../Title/Title';
import styles from './LayerPopup.module.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function snapNearest(value, points) {
  return points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/* 이만큼(px)만 끌어도 끈 방향의 다음 스냅으로 넘어간다(2026-09-18).
   가장 가까운 스냅으로만 붙이면 반 넘게 끌어야 바뀌어 둔했다 */
const SNAP_SWIPE_PX = 24;

/* 열려 있는 창을 연 순서대로 쌓아 둔다. Esc는 맨 위 창 하나만 받는다(2026-09-18).
   창 위에 시트가 뜨는 자리(말풍선 만들기 위 QnA)에서 Esc 한 번에 둘 다 닫히지 않게 한다 */
const openStack = [];

function rubberBand(value, min, max) {
  if (value > max) return max + (value - max) * 0.12;
  if (value < min) return min + (value - min) * 0.12;
  return value;
}

export default function LayerPopup({
  isOpen,
  onClose,
  title,
  titleIcon,              // 제목 글자 옆 아이콘 단추 { icon, 'aria-label', onClick } (Title의 icon)
  titleAction,            // 제목 글자 옆 글자 단추 { label, onClick } (Title의 action)
  headerStart,            // 머리 왼쪽 칸(뒤로 가기·취소처럼 이 창에서 나가는 것)
  headerEnd,              // 머리 오른쪽 칸. 주면 닫기 단추 자리를 이것이 대신한다(이미지 만들기의 [편집 완료])
  children,
  toolbar,                // 머리 아래 늘 보이는 자리(찾기칸·분류 탭). 스크롤되지 않고 본문만 스크롤된다
  footer,                 // 본문 아래에 늘 보이는 자리(주요 단추). 본문만 스크롤된다
  mobileType = 'sheet',   // 'sheet' | 'page'

  // Sheet-only props
  initialSnap = 'auto',   // 'auto' | 10 | 50 | 90
  snapPoints = null,       // null = 스냅없이 자유드래그 | Array<10|50|90>
  closeable = true,        // false = 드래그로 닫히지 않음, 최소 10%

  className,
  headerClassName,        // 머리·본문·발판의 여백을 창마다 달리 줘야 할 때(이미지 만들기처럼 판이 창을 꽉 채우는 창)
  bodyClassName,
  footerClassName,
  ...props               // id·aria-* 등은 패널(dialog)에 그대로 붙는다
}) {
  const isMobile = useIsMobile();
  const panelRef = useRef(null);

  // null = auto height, number = fixed dvh percentage
  const [heightPct, setHeightPct] = useState(null);
  const [snapping, setSnapping] = useState(false); // controls height transition

  // Ref to always read latest heightPct inside touch handlers
  const heightPctRef = useRef(null);
  useEffect(() => { heightPctRef.current = heightPct; }, [heightPct]);

  const drag = useRef({ active: false, startY: 0, startH: 0 });

  const isSheet = isMobile && mobileType === 'sheet';
  const minH = closeable ? 0 : 10;

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setHeightPct(initialSnap === 'auto' ? null : initialSnap);
      setSnapping(false);
    }
  }, [isOpen, initialSnap]);

  /* 열린 차례를 쌓는다. 맨 위(마지막) 창만 Esc를 받는다 */
  const selfRef = useRef({});
  useEffect(() => {
    if (!isOpen) return undefined;
    const me = selfRef.current;
    openStack.push(me);
    return () => {
      const i = openStack.indexOf(me);
      if (i >= 0) openStack.splice(i, 1);
    };
  }, [isOpen]);

  // ESC to close (only when closeable)
  useEffect(() => {
    if (!isOpen) return undefined;
    const handler = (e) => {
      if (e.key !== 'Escape' || !closeable) return;
      if (openStack[openStack.length - 1] !== selfRef.current) return;
      onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose, closeable]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const measureH = () => {
    const panel = panelRef.current;
    if (!panel) return 50;
    return (panel.getBoundingClientRect().height / window.innerHeight) * 100;
  };

  const onTouchStart = useCallback((e) => {
    const h = measureH();
    drag.current = { active: true, startY: e.touches[0].clientY, startH: h, lastY: undefined };
    setSnapping(false);
    setHeightPct(h); // auto → fixed so dragging has a baseline
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!drag.current.active) return;
    drag.current.lastY = e.touches[0].clientY;
    const deltaPct = ((drag.current.startY - e.touches[0].clientY) / window.innerHeight) * 100;
    const raw = drag.current.startH + deltaPct;
    setHeightPct(rubberBand(raw, minH, 90));
  }, [minH]);

  const onTouchEnd = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setSnapping(true);

    const h = heightPctRef.current ?? measureH();

    /* 스냅이 있으면 끈 방향으로 판단한다(2026-09-18). 톡 치기로는 높이가 바뀌지 않는다.
       - SNAP_SWIPE_PX보다 덜 움직였으면 원래 스냅으로 돌아간다
       - 위로 끌었으면 시작 스냅보다 높은 스냅 중 손을 뗀 높이에 가장 가까운 것
       - 아래로 끌었으면 시작 스냅보다 낮은 스냅 중 가장 가까운 것. 더 낮은 스냅이 없으면 닫는다 */
    if (snapPoints && snapPoints.length > 0) {
      const sorted = [...snapPoints].filter((v) => v >= minH).sort((a, b) => a - b);
      const startSnap = snapNearest(drag.current.startH, sorted);
      const upPx = drag.current.lastY === undefined ? 0 : drag.current.startY - drag.current.lastY;
      if (Math.abs(upPx) < SNAP_SWIPE_PX) { setHeightPct(startSnap); return; }
      if (upPx > 0) {
        const higher = sorted.filter((v) => v > startSnap);
        setHeightPct(higher.length ? snapNearest(h, higher) : startSnap);
        return;
      }
      const lower = sorted.filter((v) => v < startSnap);
      if (lower.length) { setHeightPct(snapNearest(h, lower)); return; }
      if (closeable) { onClose(); return; }
      setHeightPct(startSnap);
      return;
    }

    // Close gesture — dragged below threshold
    const lowestSnap = snapPoints?.length ? Math.min(...snapPoints) : 10;
    const closeThreshold = closeable ? lowestSnap * 0.45 : -Infinity;

    if (closeable && h < closeThreshold) {
      onClose();
      return;
    }

    // Persistent floor
    if (!closeable && h < 10) {
      setHeightPct(10);
      return;
    }

    if (snapPoints && snapPoints.length > 0) {
      // Snap to nearest valid snap point
      const valid = snapPoints.filter((s) => s >= minH);
      setHeightPct(snapNearest(Math.max(h, minH), valid));
    } else {
      // No snap (null or []) — clamp and stay
      setHeightPct(Math.min(90, Math.max(minH, h)));
    }
  }, [snapPoints, closeable, minH, onClose]);

  if (!isOpen) return null;

  const panelClass = isSheet
    ? styles.sheet
    : (isMobile && mobileType === 'page') ? styles.page : styles.modal;

  // Inline style: only set height when we have a fixed value (not auto)
  const sheetStyle = isSheet
    ? {
        ...(heightPct !== null && { height: `${Math.max(0, heightPct)}dvh` }),
        transition: snapping ? 'height var(--motion-duration-medium-2) var(--motion-easing-standard)' : 'none',
      }
    : {};

  return (
    <div
      className={styles.overlay}
      onClick={closeable ? onClose : undefined}
    >
      <div
        ref={panelRef}
        className={[styles.panel, panelClass, className].filter(Boolean).join(' ')}
        style={sheetStyle}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        {...props}
        onClick={(e) => e.stopPropagation()}
      >
        {isSheet ? (
          // 드래그 가능한 헤더 영역 (그립 바 + 타이틀/닫기 버튼 포함)
          <div
            className={styles.sheetHandle}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className={styles.handleBar} />
            {(title || closeable || headerStart || headerEnd) && (
              <div className={[styles.header, headerClassName].filter(Boolean).join(' ')}>
                {headerStart && <div className={styles.headerStart}>{headerStart}</div>}
                {title && <Title size="md" align="center" icon={titleIcon} action={titleAction} className={styles.title}>{title}</Title>}
                {headerEnd
                  ? <div className={styles.headerEnd}>{headerEnd}</div>
                  : closeable && <IconButton icon="X" size="md" className={styles.closeBtn} onClick={onClose} aria-label="닫기" />}
              </div>
            )}
          </div>
        ) : (
          <div className={[styles.header, headerClassName].filter(Boolean).join(' ')}>
            {headerStart && <div className={styles.headerStart}>{headerStart}</div>}
            {title && <Title size="md" align="center" icon={titleIcon} action={titleAction} className={styles.title}>{title}</Title>}
            {headerEnd
              ? <div className={styles.headerEnd}>{headerEnd}</div>
              : closeable && <IconButton icon="X" size="md" className={styles.closeBtn} onClick={onClose} aria-label="닫기" />}
          </div>
        )}

        {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        <div className={[styles.body, bodyClassName].filter(Boolean).join(' ')}>{children}</div>
        {footer && <div className={[styles.footer, footerClassName].filter(Boolean).join(' ')}>{footer}</div>}
      </div>
    </div>
  );
}
