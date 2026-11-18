import { useRef } from 'react';
import { useOverlayRect, placeBar, BoxBar, clamp, el } from '../ObjectBox/boxOverlay.jsx';
import styles from './CropBox.module.css';

/* 판 위 자르기 상자. 상자 밖 덮개, 상자 선, 네 변 가운데 손잡이, 상자 아래 도구 줄을 그린다.
   변을 끄는 셈은 쓰는 판이 한다. 손잡이는 그림일 뿐 손가락은 판이 받는다.
   판(EditCanvas)의 형제로 두어 판과 같은 자리에 겹친다. 손잡이와 도구 줄은 판 밖으로 나와도 된다 */

export const CROP_LINE = 1.5;     // 상자 선(화면 px)
export const CROP_HANDLE = { len: 28, thick: 6 };  // 손잡이(화면 px)

export default function CropBox({
  canvas,           // 판 요소(EditCanvas). 이 자리에 겹친다
  stage,            // 도구 줄을 붙들 바탕(EditFrame stageRef). 없으면 겹친 자리의 부모
  frame,            // 판 너비가 판 단위로 얼마인가. 없으면 화면 px
  box,              // { x, y, w, h } 판 단위, x·y가 왼쪽 위. 없으면 아무것도 안 그린다
  handles = true,   // 네 변 가운데 손잡이
  actions = [],     // 도구 줄 단추. ObjectBox와 같다
  onAction,
  barSide = 'below',
  dragging = false, // 끄는 동안 도구 줄을 숨긴다
  radius,           // 판 모서리 둥글기(CSS 값). 없으면 canvas 요소에서 읽는다. canvas로 판 안 요소를 넘길 때 준다
  className,
}) {
  const ref = useRef(null);
  const g = useOverlayRect(ref, canvas, stage);
  const cls = [styles.box, className].filter(Boolean).join(' ');
  const pos = g ? { left: g.l, top: g.t, width: g.w, height: g.h } : { display: 'none' };
  if (!g || !box) return <div ref={ref} className={cls} style={pos} hidden />;

  const cv = el(canvas);
  const round = radius != null ? radius : (cv ? getComputedStyle(cv).borderTopLeftRadius : 0);
  const k = g.w / (frame || g.w);
  const x = box.x * k, y = box.y * k, w = box.w * k, h = box.h * k;
  const half = CROP_LINE / 2;
  const { len: L, thick: T } = CROP_HANDLE;
  const hs = handles ? [
    [x + w / 2 - L / 2, y - T, L, T],
    [x + w / 2 - L / 2, y + h, L, T],
    [x - T, y + h / 2 - L / 2, T, L],
    [x + w, y + h / 2 - L / 2, T, L],
  ] : [];

  /* 도구 줄은 손잡이까지 감싼 네모 아래에 앉는다. 상자가 바탕 밖으로 나가면 보이는 데까지만 감싼다 */
  let bar = null;
  if (!dragging && actions.length) {
    const pad = handles ? T : 0;
    const l = clamp(x, g.bl, g.br), r = clamp(x + w, g.bl, g.br);
    const t = clamp(y - pad, g.bt, g.bb), b = clamp(y + h + pad, g.bt, g.bb);
    bar = placeBar({ l, t, r, b }, g, actions.length, barSide);
  }

  return (
    <div ref={ref} className={cls} style={pos}>
      {/* 덮개는 판 모서리 둥글기를 따른다. 판 밖으로 나가는 손잡이와 따로 자른다 */}
      <div className={styles.dimWrap} style={{ borderRadius: round }}>
        <svg className={styles.svg}>
          <path className={styles.dim} fillRule="evenodd"
            d={`M0 0H${g.w}V${g.h}H0Z M${x} ${y}H${x + w}V${y + h}H${x}Z`} />
        </svg>
      </div>
      <svg className={styles.svg}>
        <rect className={styles.line} x={x + half} y={y + half} width={Math.max(0, w - CROP_LINE)} height={Math.max(0, h - CROP_LINE)} />
        {hs.map(([hx, hy, hw, hh], i) => <rect key={i} className={styles.handle} x={hx} y={hy} width={hw} height={hh} />)}
      </svg>
      {bar && <BoxBar actions={actions} onAction={onAction} at={bar} label="자르기" />}
    </div>
  );
}
