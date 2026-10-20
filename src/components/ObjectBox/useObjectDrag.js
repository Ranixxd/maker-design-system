import { useEffect, useRef, useState } from 'react';
import { createObjectDrag } from './objectDrag.js';

/* React 판의 끌기. objectDrag를 판(canvas)과 바탕(stage)에 걸고, 끄는 중인지·붙기 점선을 상태로 돌려준다.
   돌려받은 것을 ObjectBox에 그대로 넘긴다: <ObjectBox {...drag} ... />

   canvas·stage는 요소다(ref 콜백으로 받은 state). 손가락은 바탕이 받는다(판 밖을 끌어도 옮겨진다).
   frame은 판 너비가 판 단위로 얼마인가(없으면 화면 px를 그대로 판 단위로 쓴다).
   판 좌표에 줄이기가 섞인 판은 board에 toPt·unit을 직접 넘겨 덮는다.
   board는 그릴 때마다 새로 넘겨도 된다(처리기는 늘 마지막 것을 읽는다) */
export default function useObjectDrag(board, { canvas, stage, frame, enabled = true }) {
  const live = useRef({ board, canvas, frame, enabled });
  live.current = { board, canvas, frame, enabled };
  const [state, setState] = useState({ dragging: false, guide: null });

  useEffect(() => {
    if (!canvas) return undefined;
    const rect = () => live.current.canvas.getBoundingClientRect();
    const scale = () => { const r = rect(); return r.width ? (live.current.frame || r.width) / r.width : 1; };
    const B = () => live.current.board;
    let d = null;
    const proxy = {
      toPt: (e) => {
        if (B().toPt) return B().toPt(e);
        const r = rect(), s = scale();
        return { x: (e.clientX - r.left) * s, y: (e.clientY - r.top) * s };
      },
      unit: () => (B().unit ? B().unit() : scale()),
      hit: (p) => B().hit(p),
      selected: () => B().selected(),
      select: (k) => B().select(k),
      get: (k) => B().get(k),
      can: (k) => (B().can ? B().can(k) : null),
      begin: (k) => (B().begin ? B().begin(k) : null),
      place: (k, x, y) => B().place(k, x, y),
      turn: (k, r) => B().turn && B().turn(k, r),
      scale: (k, m, st) => (B().scale ? B().scale(k, m, st) : 1),
      center: () => (B().center ? B().center() : null),
      get anyMove() { return !!B().anyMove; },
      get minSize() { return B().minSize; },
      enabled: () => live.current.enabled,
      changed: () => {
        if (!d) return;
        const dragging = d.dragging(), g = d.guide();
        setState((s) => (s.dragging === dragging && sameGuide(s.guide, g) ? s : { dragging, guide: g }));
        if (B().changed) B().changed();
      },
    };
    d = createObjectDrag(proxy, [stage || canvas]);
    return () => { d.destroy(); d = null; };
  }, [canvas, stage]);

  return { canvas, stage, frame, ...state };
}

const sameGuide = (a, b) => (!a && !b) || (a && b && a.x === b.x && a.y === b.y);
