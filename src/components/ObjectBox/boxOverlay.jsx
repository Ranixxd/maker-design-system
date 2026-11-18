import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './ObjectBox.module.css';

/* 판 위에 겹치는 상자들(ObjectBox·CropBox)이 같이 쓰는 것: 판 자리 재기, 도구 줄 자리 정하기, 도구 줄 */

export const BAR_GAP = 12;  // 상자와 도구 줄 사이
export const BAR_EDGE = 8;  // 바탕 끝과 도구 줄 사이
const BTN = 36;
const PAD = 4;              // 도구 줄 안쪽 여백·사이(spacing-1)

export const el = (x) => (x && 'current' in x ? x.current : x);
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const sameRect = (a, b) => a && b && ['l', 't', 'w', 'h', 'bl', 'bt', 'br', 'bb'].every((k) => Math.abs(a[k] - b[k]) < 0.01);

/* 판과 같은 자리·크기로 겹친다. 창이 뜨는 동안(scaleIn)은 겉보기 크기가 줄어 있어, 잰 값을 그 배율(z)로 나눠 제 크기로 되돌린다.
   돌려주는 값: l·t·w·h 판 자리(겹친 요소의 offsetParent 기준), bl·bt·br·bb 바탕(stage) 끝(판 왼쪽 위 기준) */
export function useOverlayRect(ref, canvas, stage) {
  const [g, setG] = useState(null);
  const measure = useCallback(() => {
    const host = ref.current, cv = el(canvas);
    if (!host || !cv) return;
    const op = host.offsetParent;
    const cr = cv.getBoundingClientRect();
    if (!cr.width) return;
    const hr = op ? op.getBoundingClientRect() : cr;
    const z = op && op.offsetWidth ? hr.width / op.offsetWidth : 1;
    const sr = (el(stage) || op || cv).getBoundingClientRect();
    const next = {
      l: (cr.left - hr.left) / z, t: (cr.top - hr.top) / z, w: cr.width / z, h: cr.height / z,
      bl: (sr.left - cr.left) / z, bt: (sr.top - cr.top) / z, br: (sr.right - cr.left) / z, bb: (sr.bottom - cr.top) / z,
    };
    setG((prev) => (sameRect(prev, next) ? prev : next));
  }, [ref, canvas, stage]);

  useLayoutEffect(measure);
  useEffect(() => {
    const cv = el(canvas);
    if (!cv || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(cv);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [canvas, measure]);
  return g;
}

/* 도구 줄 자리. 감쌀 네모(l·t·r·b, 판 기준 화면 px)의 아래 → 위 → 바탕 맨 위 순으로 앉힌다.
   side가 above면 위 → 아래 → 바탕 맨 위. 가로는 네모 가운데, 바탕 양끝 BAR_EDGE 안에서 멈춘다 */
export function placeBar({ l, t, r, b }, g, n, side = 'below') {
  const bw = n * BTN + (n - 1) * PAD + PAD * 2, bh = BTN + PAD * 2;
  const below = b + BAR_GAP, above = t - BAR_GAP - bh;
  const fitsBelow = below + bh <= g.bb - BAR_EDGE, fitsAbove = above >= g.bt + BAR_EDGE;
  let y;
  if (side === 'above') y = fitsAbove ? above : fitsBelow ? below : g.bt + BAR_EDGE;
  else y = fitsBelow ? below : fitsAbove ? above : g.bt + BAR_EDGE;
  const x = clamp((l + r) / 2 - bw / 2, g.bl + BAR_EDGE, Math.max(g.bl + BAR_EDGE, g.br - BAR_EDGE - bw));
  return { x, y };
}

/* 좌우 반전. 루시드 flip-horizontal-2가 위아래 삼각형으로 바뀌어 세로선과 좌우 삼각형을 직접 그린다.
   옆 단추의 Icon sm과 같은 실제 1.5px가 되게 24칸 단위 1.8을 준다(1.5 × 24/20) */
function FlipH() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 7 5 5-5 5V7" /><path d="m21 7-5 5 5 5V7" /><path d="M12 20V4" />
    </svg>
  );
}
const ICON_NAMES = { eraser: 'Eraser', layerUp: 'LayersArrowUp', layerDown: 'LayersArrowDown', copy: 'Copy', trash: 'Trash2' };

/* 도구 줄. 알약, 단추 36, 아이콘 20 */
export function BoxBar({ actions, onAction, at, label }) {
  return (
    <div className={styles.bar} role="toolbar" aria-label={label} data-obox-bar=""
      style={{ transform: `translate(${at.x}px, ${at.y}px)` }}>
      {actions.map((a) => (
        <button key={a.id} type="button" className={styles.btn} aria-label={a.label} title={a.label}
          disabled={!!a.disabled} onClick={() => onAction && onAction(a.id)}>
          {a.icon === 'flip' ? <FlipH /> : <Icon name={ICON_NAMES[a.icon]} size="sm" />}
        </button>
      ))}
    </div>
  );
}
