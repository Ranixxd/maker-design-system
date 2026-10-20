/* 판 위 개체의 모양 셈. 상자(ObjectBox)와 끌기(objectDrag)가 같이 쓴다.
   개체는 { x, y, w, h, rot }이고 x·y가 가운데, 단위는 판 단위다(판마다 다르다).
   화면 px로 정한 값은 unit(화면 1px이 판 단위로 얼마인가)을 곱해 판 단위로 바꾼다 */

export const SNAP = 4;          // 가운데 붙기(화면 px)
export const ANGLE_SNAP = 0.07; // 각도 붙기(라디안, 약 4도)
export const HANDLE_HIT = 20;   // 손잡이 짚는 자리 40의 반(화면 px)
export const ROT_ARM = 30;      // 회전 대 길이(화면 px)
export const DOT_R = 6;         // 손잡이 점 반지름(화면 px)
export const LINE = 1.5;        // 상자 선·점 테두리 굵기
export const MIN_SIZE = 20;     // 최소 변(화면 px)

/* 모서리 순서: 왼쪽 위, 오른쪽 위, 오른쪽 아래, 왼쪽 아래. 맞은편은 (i + 2) % 4 */
export const BOX_CORNERS = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

/* 막는 것만 판이 고른다(없으면 다 된다).
   handles: false면 손잡이를 하나도 세우지 않는다(일부러 자리를 고정한 개체).
   anchor: 'center'면 크기를 바꿀 때 가운데를 붙든다(상자가 크기에 비례하지 않는 개체) */
export const canOf = (c) => ({ move: true, resize: true, rotate: true, handles: true, anchor: 'corner', ...(c || {}) });

export function snapAngle(rad) {
  const near = Math.round(rad / (Math.PI / 2)) * (Math.PI / 2);
  return Math.abs(rad - near) < ANGLE_SNAP ? near : rad;
}

/* 개체 안쪽 좌표(가운데 기준)를 판 좌표로. 회전을 태운다 */
export function boxToWorld(o, lx, ly) {
  const c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
  return { x: o.x + lx * c - ly * s, y: o.y + lx * s + ly * c };
}

/* 판 좌표 한 점이 개체 안인가. 그림이 아니라 좌표로 짚어 판 밖에 걸친 곳도 잡힌다.
   list는 아래부터 쌓인 순서다. 맨 위부터 찾아 처음 맞는 것의 번호, 없으면 -1 */
export function boxHit(list, px, py, skip) {
  for (let i = list.length - 1; i >= 0; i--) {
    const o = list[i];
    if (skip && skip(o)) continue;
    const c = Math.cos(-(o.rot || 0)), s = Math.sin(-(o.rot || 0));
    const dx = px - o.x, dy = py - o.y;
    if (Math.abs(dx * c - dy * s) <= o.w / 2 && Math.abs(dx * s + dy * c) <= o.h / 2) return i;
  }
  return -1;
}

/* 손잡이 자리(판 단위). 모서리 넷, 위 변 가운데, 회전 점 */
export function handlePoints(o, unit) {
  const hw = o.w / 2, hh = o.h / 2;
  const corners = BOX_CORNERS.map(([sx, sy]) => boxToWorld(o, sx * hw, sy * hh));
  const top = boxToWorld(o, 0, -hh);
  const a = o.rot || 0;
  const rot = { x: top.x + Math.sin(a) * ROT_ARM * unit, y: top.y - Math.cos(a) * ROT_ARM * unit };
  return { corners, top, rot };
}
