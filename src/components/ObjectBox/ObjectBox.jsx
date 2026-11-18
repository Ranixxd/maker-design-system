import { useRef } from 'react';
import { DOT_R, LINE, canOf, handlePoints } from './objectGeometry.js';
import styles from './ObjectBox.module.css';
import { useOverlayRect, placeBar, BoxBar, clamp } from './boxOverlay.jsx';

/* 판 위 개체의 선택 상자와 도구 줄. 끄는 셈은 useObjectDrag(React 판)나 createObjectDrag(캔버스 판)가 한다.

   상자는 돌고 뒤집혀도 되는 일만 한다: 네 모서리 점 크기, 위쪽 대 끝 점 회전. 점은 그림일 뿐 손가락은 끌기 쪽이 받는다.
   돌면 헷갈리는 일(지우개·복사·순서·반전·삭제)은 반듯한 도구 줄로 뗐다. 어느 단추를 넣을지는 쓰는 판이 정해 넘긴다.

   판(EditCanvas)과 같은 자리에 겹쳐 그린다. 판의 형제로 두면 판보다 큰 개체의 상자와 점이 판 밖으로 그대로 나온다.
   상자 선·점·대·가운데 점선은 한 장의 SVG에 그린다. 점을 CSS 테두리로 그리면 기기 픽셀에 맞춰 반올림돼 상자 선과 굵기가 달라 보인다 */

export default function ObjectBox({
  canvas,           // 판 요소(EditCanvas). 이 자리에 겹친다
  stage,            // 도구 줄을 붙들 바탕(EditFrame stageRef). 없으면 겹친 자리의 부모
  frame,            // 판 너비가 판 단위로 얼마인가. 없으면 화면 px
  obj,              // { x, y, w, h, rot } 판 단위, x·y가 가운데. 없으면 아무것도 안 그린다(점선만)
  can,              // { resize, rotate, handles } 끌기와 같은 것을 넘긴다
  actions = [],     // 도구 줄 단추 [{ id, icon: 'eraser'|'copy'|'layerUp'|'layerDown'|'flip'|'trash', label, disabled }]
  onAction,
  barSide = 'below', // 도구 줄을 먼저 앉힐 쪽 'below' | 'above'. 판 아래 끝에 고정한 개체(짤 자막)는 above
  dragging = false, // 끄는 동안 도구 줄을 숨긴다
  guide = null,     // { x, y } 붙은 축에 판 가운데 점선
  className,
}) {
  const ref = useRef(null);
  const g = useOverlayRect(ref, canvas, stage);

  const pos = g ? { left: g.l, top: g.t, width: g.w, height: g.h } : { display: 'none' };
  if (!g || (!obj && !guide)) return <div ref={ref} className={[styles.box, className].filter(Boolean).join(' ')} style={pos} hidden />;

  const k = g.w / (frame || g.w);
  const lines = (
    <>
      {guide?.x && <line className={styles.guide} x1={g.w / 2} y1={0} x2={g.w / 2} y2={g.h} />}
      {guide?.y && <line className={styles.guide} x1={0} y1={g.h / 2} x2={g.w} y2={g.h / 2} />}
    </>
  );
  if (!obj) {
    return (
      <div ref={ref} className={[styles.box, className].filter(Boolean).join(' ')} style={pos}>
        <svg className={styles.svg}>{lines}</svg>
      </div>
    );
  }

  const c = canOf(can);
  const px = (p) => ({ x: p.x * k, y: p.y * k });
  const hp = handlePoints(obj, 1 / k);
  const pts = hp.corners.map(px), tp = px(hp.top), rp = px(hp.rot);
  const showCorners = c.handles && c.resize;
  const showRot = c.handles && c.rotate;
  const dots = (showCorners ? pts : []).concat(showRot ? [rp] : []);

  /* 도구 줄. 끄는 동안 숨기고, 놓으면 돌아간 상자(회전 점까지)를 감싸는 네모의 아래 → 위 → 바탕 맨 위 순으로 앉힌다.
     barSide가 above면 위 → 아래 → 바탕 맨 위 순이다. 상자가 바탕 밖으로 나가면 보이는 데까지만 감싼다 */
  let bar = null;
  if (!dragging && actions.length) {
    const vis = (showRot ? [...pts, rp] : pts).map((p) => ({ x: clamp(p.x, g.bl, g.br), y: clamp(p.y, g.bt, g.bb) }));
    const l = Math.min(...vis.map((p) => p.x)), r = Math.max(...vis.map((p) => p.x));
    const t = Math.min(...vis.map((p) => p.y)) - DOT_R, b = Math.max(...vis.map((p) => p.y)) + DOT_R;
    bar = placeBar({ l, t, r, b }, g, actions.length, barSide);
  }

  return (
    <div ref={ref} className={[styles.box, className].filter(Boolean).join(' ')} style={pos}>
      <svg className={styles.svg}>
        {lines}
        <polygon className={styles.line} points={pts.map((p) => `${p.x},${p.y}`).join(' ')} />
        {showRot && <line className={styles.line} x1={tp.x} y1={tp.y} x2={rp.x} y2={rp.y} />}
        {dots.map((p, i) => <circle key={i} className={styles.dot} cx={p.x} cy={p.y} r={DOT_R - LINE / 2} />)}
      </svg>
      {bar && <BoxBar actions={actions} onAction={onAction} at={bar} label="고른 개체" />}
    </div>
  );
}
