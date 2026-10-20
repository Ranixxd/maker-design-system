/* 판 위 개체 끌기. 보이는 쪽(ObjectBox)과 짝이다. React 판은 useObjectDrag로, 캔버스를 직접 그리는 판은 이것을 바로 부른다.

   - 옮기기: 누른 개체를 끈다. 가운데가 판 가운데에서 화면 4px 안이면 붙고 그 축에 점선을 세운다(guide)
   - 크기: 모서리 점을 끌면 맞은편 모서리를 붙든 채 키운다(돌아간 채로도). anchor 'center'는 가운데를 붙든다
   - 돌리기: 회전 점을 끌면 손가락과 가운데 사이 각으로 돌린다. 0·90·180·270도 근처(약 4도)에서 붙는다
   - 두 손가락: 키우고, 돌릴 수 있는 개체면 함께 돌린다. 하나를 떼면 남은 손가락으로 이어 옮긴다
   - 판 밖 바탕을 눌러도 받는다. 빈 바탕을 누르면 고른 것을 푼다

   손잡이도 한 처리기가 받는다. 처음 닿은 자리가 손잡이 짚는 자리(40px) 안이면 손잡이, 아니면 개체·바탕이다.
   그래서 손잡이는 그림일 뿐 손가락을 받지 않는다. 바탕 밖으로 나간 손잡이는 못 잡는다(판 밖에 걸친 곳을 끌거나 두 손가락으로).

   board(판이 넘기는 것)
   - toPt(e) → 판 좌표, unit() → 화면 1px이 판 단위로 얼마인가
   - hit(p) → 누른 개체의 열쇠(없으면 null), selected() → 고른 열쇠, select(key) 고르기(null이면 풀기)
   - get(key) → { x, y, w, h, rot }, can(key) → canOf 꼴(없으면 다 된다)
   - begin(key) → 끌기 처음 값(판 마음대로, scale에 그대로 돌려준다)
   - place(key, x, y), turn(key, rot), scale(key, k, start) 처음 대비 k배. 실제로 쓴 배율을 돌려준다(막혔으면 그만큼)
   - center() 붙을 판 가운데(없으면 붙지 않는다), anyMove 개체가 하나뿐이라 어디를 눌러도 그것을 옮긴다
   - minSize 최소 변(화면 px), enabled() 지금 끌기를 받나, changed() 다시 그려라 */
import { BOX_CORNERS, HANDLE_HIT, MIN_SIZE, SNAP, boxToWorld, canOf, handlePoints, snapAngle } from './objectGeometry.js';

/* 손잡이를 짚었나. { type: 'rotate' } | { type: 'resize', corner } | null */
export function handleAt(o, c, p, unit) {
  if (!c.handles) return null;
  const { corners, rot } = handlePoints(o, unit);
  const dist = (q) => Math.hypot(p.x - q.x, p.y - q.y) / unit;
  if (c.rotate && dist(rot) <= HANDLE_HIT) return { type: 'rotate' };
  if (!c.resize) return null;
  /* 작은 개체는 짚는 자리가 겹쳐 가장 가까운 모서리를 고른다 */
  let best = -1, bd = Infinity;
  corners.forEach((q, i) => { const d = dist(q); if (d < bd) { bd = d; best = i; } });
  return best >= 0 && bd <= HANDLE_HIT ? { type: 'resize', corner: best } : null;
}

/* 모서리 손잡이 커서. 돌아간 상자에서도 끄는 방향에 맞춘다 */
function cornerCursor(o, i) {
  const [sx, sy] = BOX_CORNERS[i];
  const q = boxToWorld(o, sx, sy);
  const a = Math.atan2(q.y - o.y, q.x - o.x);
  const m = ((a % Math.PI) + Math.PI) % Math.PI;
  return m < Math.PI / 2 ? 'nwse-resize' : 'nesw-resize';
}

/* surfaces: 손가락을 받을 요소(보통 편집 바탕 하나). 누른 요소가 손가락을 붙잡는다 */
export function createObjectDrag(board, surfaces) {
  const ptrs = new Map();
  let drag = null;
  let guide = null;
  const can = (key) => canOf(board.can ? board.can(key) : null);
  const changed = () => { if (board.changed) board.changed(); };
  const on = () => !board.enabled || board.enabled();

  function startMove(key, p) {
    const o = board.get(key);
    drag = can(key).move ? { mode: 'move', key, sx: p.x, sy: p.y, x0: o.x, y0: o.y } : { mode: 'hold', key };
  }

  function startPinch() {
    const key = board.selected();
    if (key == null) return;
    const [a, b] = [...ptrs.values()];
    const o = board.get(key);
    guide = null;
    drag = { mode: 'pinch', key, d0: Math.max(1e-6, Math.hypot(b.x - a.x, b.y - a.y)), a0: Math.atan2(b.y - a.y, b.x - a.x),
      rot0: o.rot || 0, start: board.begin(key) };
  }

  function startHandle(key, h, p) {
    const o = board.get(key), c = can(key);
    if (h.type === 'rotate') {
      drag = { mode: 'rotate', key, grab: Math.atan2(p.y - o.y, p.x - o.x) - (o.rot || 0) };
      return;
    }
    const [sx, sy] = BOX_CORNERS[h.corner], hw = o.w / 2, hh = o.h / 2;
    const center = c.anchor === 'center';
    const a = center ? { x: o.x, y: o.y } : boxToWorld(o, -sx * hw, -sy * hh);
    const k = boxToWorld(o, sx * hw, sy * hh);
    drag = { mode: 'resize', key, ox: a.x, oy: a.y, dx: k.x - a.x, dy: k.y - a.y, sx: p.x, sy: p.y,
      w0: o.w, h0: o.h, center, start: board.begin(key) };
  }

  function down(e) {
    /* 도구 줄 단추는 제 일을 한다 */
    if (e.target.closest && e.target.closest('button, [data-obox-bar]')) return;
    if (ptrs.size >= 2) return;
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { /* 못 잡아도 된다 */ }
    const p = board.toPt(e);
    ptrs.set(e.pointerId, p);
    if (ptrs.size === 2) { startPinch(); changed(); return; }
    const sel = board.selected();
    if (sel != null) {
      const h = handleAt(board.get(sel), can(sel), p, board.unit());
      if (h) { startHandle(sel, h, p); changed(); return; }
    }
    const hit = board.anyMove && sel != null ? sel : board.hit(p);
    if (hit !== sel) board.select(hit);
    drag = null;
    if (hit != null) startMove(hit, p);
    changed();
  }

  function hover(e) {
    if (e.pointerType !== 'mouse') return;
    const sel = board.selected();
    let cur = '';
    if (sel != null) {
      const o = board.get(sel);
      const h = handleAt(o, can(sel), board.toPt(e), board.unit());
      if (h) cur = h.type === 'rotate' ? 'grab' : cornerCursor(o, h.corner);
    }
    e.currentTarget.style.cursor = cur;
  }

  function move(e) {
    if (!ptrs.has(e.pointerId)) { if (on()) hover(e); return; }
    e.preventDefault();
    const p = board.toPt(e);
    ptrs.set(e.pointerId, p);
    const d = drag;
    if (!d) return;
    const u = board.unit();
    if (d.mode === 'pinch') {
      if (ptrs.size < 2) return;
      const [a, b] = [...ptrs.values()];
      const c = can(d.key);
      if (c.resize) board.scale(d.key, Math.hypot(b.x - a.x, b.y - a.y) / d.d0, d.start);
      if (c.rotate) board.turn(d.key, snapAngle(d.rot0 + Math.atan2(b.y - a.y, b.x - a.x) - d.a0));
    } else if (d.mode === 'move') {
      let x = d.x0 + (p.x - d.sx), y = d.y0 + (p.y - d.sy);
      const ctr = board.center ? board.center() : null;
      if (ctr) {
        const t = SNAP * u, gx = Math.abs(x - ctr.x) < t, gy = Math.abs(y - ctr.y) < t;
        if (gx) x = ctr.x;
        if (gy) y = ctr.y;
        guide = gx || gy ? { x: gx, y: gy } : null;
      }
      board.place(d.key, x, y);
    } else if (d.mode === 'rotate') {
      const o = board.get(d.key);
      board.turn(d.key, snapAngle(Math.atan2(p.y - o.y, p.x - o.x) - d.grab));
    } else if (d.mode === 'resize') {
      const len = Math.max(1e-6, Math.hypot(d.dx, d.dy)), ux = d.dx / len, uy = d.dy / len;
      const d0 = Math.max(u, (d.sx - d.ox) * ux + (d.sy - d.oy) * uy);
      const m = (board.minSize || MIN_SIZE) * u;
      const want = Math.max(m / d.w0, m / d.h0, ((p.x - d.ox) * ux + (p.y - d.oy) * uy) / d0);
      const k = board.scale(d.key, want, d.start);
      if (!d.center) board.place(d.key, d.ox + d.dx * k / 2, d.oy + d.dy * k / 2);
    }
    changed();
  }

  function up(e) {
    if (!ptrs.has(e.pointerId)) return;
    ptrs.delete(e.pointerId);
    guide = null;
    if (ptrs.size === 1 && drag && drag.mode === 'pinch') {
      /* 두 손가락 중 하나를 떼면 남은 손가락으로 이어 옮긴다 */
      startMove(drag.key, [...ptrs.values()][0]);
    } else if (ptrs.size === 0) {
      drag = null;
    }
    changed();
  }

  /* 한 손가락을 한 번만 센다. 안쪽 surface에서 난 것이 바깥 surface로 번지면 버린다 */
  const inner = (e) => surfaces.some((s) => s !== e.currentTarget && e.currentTarget.contains(s) && s.contains(e.target));
  const onDown = (e) => { if (on() && !inner(e)) down(e); };
  const onMove = (e) => { if (!inner(e)) move(e); };
  const onUp = (e) => { if (!inner(e)) up(e); };
  for (const s of surfaces) {
    s.style.touchAction = 'none';
    s.addEventListener('pointerdown', onDown, { passive: false });
    s.addEventListener('pointermove', onMove, { passive: false });
    s.addEventListener('pointerup', onUp);
    s.addEventListener('pointercancel', onUp);
  }

  return {
    dragging: () => !!drag && drag.mode !== 'hold' && ptrs.size > 0,
    guide: () => guide,
    destroy() {
      for (const s of surfaces) {
        s.removeEventListener('pointerdown', onDown);
        s.removeEventListener('pointermove', onMove);
        s.removeEventListener('pointerup', onUp);
        s.removeEventListener('pointercancel', onUp);
        s.style.touchAction = '';
        s.style.cursor = '';
      }
    },
  };
}
