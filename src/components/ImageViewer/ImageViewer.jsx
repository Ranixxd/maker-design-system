import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import IconButton from '../IconButton/IconButton';
import styles from './ImageViewer.module.css';

/* 그림 한 장을 화면 위에 띄워 꾹 눌러 저장하게 하는 스크림(2026-10-24 사용자, web ui/viewer/ImageViewer에서 올림).
   스크림 그 자체다. 제 주소가 있는 페이지(냉장고 그림, 배경 자랑 글)는 이것을 쓰지 않고 제 레이아웃으로 그린다.
   세 칸이다. 상단 기능바(왼쪽 lead, 오른쪽 닫기) · 바디 · 푸터(단추).
   바디는 기능바와 푸터를 뺀 남은 높이를 다 쓰고, 푸터 단추는 화면 아래로 내려간다. 흰 블러 딤이다.

   바디 속은 이 차례로 정해져 있다: 저장 안내 > 그림 > 내용 > 지표.
   그림은 바디의 남은 높이·너비 안에 원본 비율로 들어가게 크기를 잰다(키우지는 않는다).
   저장 안내와 내용은 묶음 너비(480px까지)를 다 쓴다. 묶음 전체가 바디 가운데에 선다.

   label: 창 이름(낭독기)
   lead: 기능바 왼쪽(⋯ 메뉴 등). 없으면 닫기만 선다
   hint: 그림 위 저장 안내. null이면 안 둔다
   src·alt: 그림. 없으면 그림 없이 내용만 선다(지워진 그림 등)
   imageClassName: 그림의 테두리·반경·바탕(배경화면처럼 틀이 있는 그림)
   caption: 그림 아래 내용 한 줄(짤 제목 등)
   meta: 내용 아래 지표 한 줄(👀 · ♥ 등)
   footer: 바디 아래 단추 줄. 단추는 줄 너비로 선다
   children: 지표 아래에 덧붙는 것(떠 있는 스티커 등). 크기 셈에 넣지 않는다
   escBlocked: 이 창 위에 다른 창(신고 창 등)이 떠 있는 동안 true. 그동안 Esc는 그 창 몫이다 */
export default function ImageViewer({
  label,
  onClose,
  lead,
  hint = '이미지를 꾹 누르거나 우클릭하여 저장해요.',
  closeLabel = '닫기',
  escBlocked = false,
  src,
  alt = '',
  imageClassName,
  caption,
  meta,
  footer,
  className,
  children,
}) {
  const closeRef = useRef(null);

  /* 잡는 단계(capture)에서 먼저 본다. 뒤에서 보면 위에 뜬 창이 같은 Esc로 먼저 닫혀 이 창까지 함께 닫힌다 */
  const blockedRef = useRef(escBlocked);
  blockedRef.current = escBlocked;
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !blockedRef.current) onClose?.(); };
    addEventListener('keydown', onKey, true);
    return () => removeEventListener('keydown', onKey, true);
  }, [onClose]);
  useEffect(() => { closeRef.current?.focus(); }, []);

  /* 열려 있는 동안 뒤 페이지가 구르지 않게 html에 건다. 위에 뜨는 LayerPopup이 닫힐 때 body의 잠금을 풀어 버려서
     body에 걸면 이 창이 열린 채로 뒤가 다시 구른다. 둘이 다른 곳을 쥐면 서로 풀지 않는다 */
  useEffect(() => {
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => { root.style.overflow = before; };
  }, []);

  /* 그림 크기 재기. 바디(stage)의 너비·높이에서 안내·내용·지표와 사이 간격을 뺀 자리에 원본 비율로 넣는다 */
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const [size, setSize] = useState(null);
  const measure = useCallback(() => {
    const stage = stageRef.current, img = imgRef.current;
    if (!stage || !img || !img.naturalWidth) return;
    const others = [...stage.children].filter((el) => el !== img && el.dataset.flow !== 'off');
    /* 사이 간격은 각 줄의 margin이다(안내 아래 20, 그림 아래 16, 내용 아래 8) */
    const outer = (el) => {
      const s = getComputedStyle(el);
      return el.getBoundingClientRect().height + parseFloat(s.marginTop) + parseFloat(s.marginBottom);
    };
    const used = others.reduce((s, el) => s + outer(el), 0);
    const W = stage.clientWidth, H = Math.max(0, stage.clientHeight - used);
    const k = Math.min(1, W / img.naturalWidth, H / img.naturalHeight);
    const next = { w: Math.floor(img.naturalWidth * k), h: Math.floor(img.naturalHeight * k) };
    setSize((s) => (s && s.w === next.w && s.h === next.h ? s : next));
  }, []);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [measure]);
  useLayoutEffect(() => { measure(); }, [measure, src, hint, caption, meta]);

  /* 기능바·바디·푸터 안의 누름이 딤으로 새면 창이 닫힌다 */
  const 멈춤 = (e) => e.stopPropagation();

  return (
    <div className={[styles.dim, className].filter(Boolean).join(' ')} onClick={onClose}
      role="dialog" aria-modal="true" aria-label={label}>
      <div className={styles.topBar} onClick={멈춤}>
        {lead}
        <div className={styles.spacer} />
        <IconButton ref={closeRef} icon="X" aria-label={closeLabel} onClick={onClose} />
      </div>

      <div className={styles.body}>
        <div ref={stageRef} className={styles.stage}>
          {hint && <p className={`text-body-sm ${styles.hint}`} onClick={멈춤}>{hint}</p>}
          {src && (
            <img ref={imgRef} className={[styles.image, imageClassName].filter(Boolean).join(' ')} src={src} alt={alt}
              style={size ? { width: size.w, height: size.h } : { width: 0, height: 0, visibility: 'hidden' }} onLoad={measure} onClick={멈춤} />
          )}
          {caption && <p className={`text-body-md ${styles.caption}`} onClick={멈춤}>{caption}</p>}
          {meta && <p className={`text-body-sm ${styles.meta}`} onClick={멈춤}>{meta}</p>}
          {children && <div data-flow="off" className={styles.extra} onClick={멈춤}>{children}</div>}
        </div>
      </div>

      {footer && (
        <div className={styles.footer} onClick={멈춤}>
          <div className={styles.footerInner}>{footer}</div>
        </div>
      )}
    </div>
  );
}
