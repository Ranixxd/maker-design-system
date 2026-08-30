import { useEffect, useState, useRef, useCallback } from 'react';
import Icon from '../Icon/Icon';
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

function rubberBand(value, min, max) {
  if (value > max) return max + (value - max) * 0.12;
  if (value < min) return min + (value - min) * 0.12;
  return value;
}

export default function LayerPopup({
  isOpen,
  onClose,
  title,
  children,
  mobileType = 'sheet',   // 'sheet' | 'page'

  // Sheet-only props
  initialSnap = 'auto',   // 'auto' | 10 | 50 | 90
  snapPoints = null,       // null = 스냅없이 자유드래그 | Array<10|50|90>
  closeable = true,        // false = 드래그로 닫히지 않음, 최소 10%

  className,
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

  // ESC to close (only when closeable)
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape' && closeable) onClose(); };
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
    drag.current = { active: true, startY: e.touches[0].clientY, startH: h };
    setSnapping(false);
    setHeightPct(h); // auto → fixed so dragging has a baseline
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!drag.current.active) return;
    const deltaPct = ((drag.current.startY - e.touches[0].clientY) / window.innerHeight) * 100;
    const raw = drag.current.startH + deltaPct;
    setHeightPct(rubberBand(raw, minH, 90));
  }, [minH]);

  const onTouchEnd = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setSnapping(true);

    const h = heightPctRef.current ?? measureH();

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
            {(title || closeable) && (
              <div className={styles.header}>
                {title && <span className={styles.title}>{title}</span>}
                {closeable && (
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="닫기"
                  >
                    <Icon name="X" size="md" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.header}>
            {title && <span className={styles.title}>{title}</span>}
            {closeable && (
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="닫기"
              >
                <Icon name="X" size="md" />
              </button>
            )}
          </div>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
