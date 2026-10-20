import { useRef, useState } from 'react';
import ObjectBox from './ObjectBox';
import useObjectDrag from './useObjectDrag';
import { boxHit } from './objectGeometry';
import EditCanvas from '../EditCanvas/EditCanvas';

export default {
  title: 'Components/ObjectBox',
  component: ObjectBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
판 위 개체의 선택 상자와 도구 줄, 그리고 그것을 끄는 셈(\`useObjectDrag\`). 판 위에서 그림·글자를 옮기고 키우고 돌리는 편집 판은 모두 이것을 쓴다(2026-10-20 사용자, 카톡테마 메이커 \`phase5/src/ui/parts/objectBox.js\`·\`objectDrag.js\`에서 올렸다).
EditFrame 안 EditCanvas 위에 얹는다. 아래 예시는 모두 눌러 볼 수 있다.

**상자: 돌고 뒤집혀도 되는 일만 한다.** 개체를 돌리거나 뒤집으면 상자도 함께 돈다. 모서리에 일을 나눠 두었더니 어느 모서리가 무엇인지 헷갈렸다(2026-10-20 사용자).
- 네 모서리 점 = 크기. 맞은편 모서리를 붙든 채 키우고 줄인다(돌아간 채로도)
- 위쪽 가운데 대(30) 끝 점 = 회전. 0·90·180·270도 근처(약 4도)에서 붙는다
- 상자 안을 끌면 옮기기. 가운데가 판 가운데 4px 안이면 붙고 그 축에 점선(1px, 4px 간격)이 판을 가로지른다
- 점에는 아이콘이 없다. 지름 12, 바탕 \`bg-default\`, 테두리와 상자 선 모두 \`border-accent\` 1.5. 점과 선은 한 장의 SVG에 그린다(따로 그리면 기기 픽셀 반올림으로 굵기가 달라 보인다)
- 짚는 자리는 40(보이는 점보다 넓다). 처음 닿은 자리가 짚는 자리 안이면 손잡이, 아니면 개체·바탕이다. 점 자체는 손가락을 받지 않는다
- 두 손가락으로 키우고, 돌릴 수 있는 개체면 함께 돌린다. 하나를 떼면 남은 손가락으로 이어 옮긴다
- 최소 크기는 화면 20

**판 밖**
- 판보다 큰 개체는 상자와 점이 판 밖으로 그대로 나온다. 그림은 판 안만 보인다(판이 자른다)
- 판 밖 회색 바탕을 끌어도 개체가 옮겨진다(판 밖에 걸친 곳을 잡아도, 두 번째 손가락도). 빈 바탕을 누르면 고른 것을 푼다
- 점이 판 밖으로 나가도 판 안으로 붙들지 않는다(2026-10-20 사용자). 바탕 밖으로 나간 점 대신 판 밖에 걸친 곳을 끌거나 두 손가락을 쓴다

**도구 줄: 돌면 헷갈리는 일은 상자에서 떼어 반듯한 줄로 둔다**
- 알약, 바탕 \`bg-inverse\`, 안쪽 여백·사이 \`spacing-1\`, 단추 36 동그라미, 아이콘 20 \`icon-oninverse\`, 그림자 없음. 못 쓰는 단추는 흐리게(0.5)
- 순서는 **지우개 · 순서 · 좌우 반전 · 삭제**, 구분선 없음. 판마다 넣을 것만 넣고, 넣을 것이 없으면 띄우지 않는다
- 순서 단추 하나가 두 일을 한다: 맨 앞이 아니면 [맨 앞으로](\`layerUp\`), 맨 앞이면 [맨 뒤로](\`layerDown\`)
- 자리: 돌아간 상자(회전 점까지)를 감싸는 네모 **아래** 12. 바탕 아래 끝 8 안에 안 들어가면 **위**, 위에도 안 들어가면 **바탕 맨 위**. 가로는 상자 가운데, 바탕 양끝 8 안에서 멈춘다
- 끄는 동안(옮기기·크기·회전·두 손가락) 숨고, 손을 떼면 다시 앉는다

**어느 단추를 넣나 (판을 설계할 때 정한다, 2026-10-20 사용자)**

| 단추 | 넣는다 | 넣지 않는다 |
|---|---|---|
| 지우개 | 개체(덩어리) 단위로 다루는 그림 | 배경류. 이미 누끼가 따진 그림(말풍선 샘플, 프사 파츠 같은 제공 그림), 이미 배경을 지운 개체 |
| 순서 | 개체를 둘 이상 불러올 수 있는 판 | 하나만 다루는 판 |
| 좌우 반전 | 개체를 다루는 판 | 배경류. 뒤집을 까닭이 없는 판 |
| 삭제 | 거의 모든 판 | 그 개체가 곧 판의 목적이라 지우면 할 일이 없어지는 판(칸 그림 첨부, 무늬 그림, 사진 맞추기) |

- 일부러 자리를 고정한 개체는 점을 세우지 않는다(\`can.handles: false\`). 상자 선과 도구 줄만 선다(짤 자막)
- 크기·자리가 결과에 안 들어가는 개체(무늬 그림, 말풍선 장식)는 회전 점만 세운다(\`can: { move: false, resize: false }\`). 눌러도 아무 일 없는 점을 두지 않는다
- 배경류는 크기·옮기기만(\`can.rotate: false\`), 도구 줄 없음
- 상자가 크기에 비례하지 않는 개체(냉장고 표정)는 \`can.anchor: 'center'\`로 가운데를 붙든다

**쓰는 법**
- React 판: \`const drag = useObjectDrag(board, { canvas, stage, frame })\` → \`<ObjectBox {...drag} obj={...} can={...} actions={...} onAction={...} />\`. \`canvas\`·\`stage\`는 EditCanvas와 EditFrame \`stageRef\`로 받은 요소(ref 콜백 state)다
- \`ObjectBox\`는 EditCanvas의 **형제**로 둔다(EditFrame children에 판과 나란히). 판 안에 두면 판이 잘라 판 밖 상자가 안 보인다
- 캔버스를 직접 그리는 판은 \`createObjectDrag(board, [stage])\`를 부르고, 그릴 때마다 \`dragging()\`·\`guide()\`를 ObjectBox에 넘긴다
- \`frame\`은 판 너비가 판 단위로 얼마인가다. 판마다 단위가 달라(340, 판 너비 1, 1080…) 화면 px로 정한 값(붙기 4, 최소 20, 짚는 자리 40)은 부품이 \`unit\`을 곱해 맞춘다. 판 좌표에 줄이기가 섞이면 board에 \`toPt\`·\`unit\`을 직접 준다
- 어느 개체를 눌렀나는 그림 요소가 아니라 좌표로 짚는다(\`boxHit\`). 판이 판 밖을 자르면 그림 요소는 판 밖에 걸친 곳에서 눌리지 않는다
- 휠로 키우기는 부품 밖, 판마다 둔다
        `,
      },
    },
  },
};

const COLORS = ['#f6c344', '#7cc4f2', '#f29bb2']; /* @token-ok 예시 개체의 그림 색(콘텐츠) */

/* EditFrame 바탕을 흉내 낸 자리. 실제로는 EditFrame stageRef와 children을 쓴다 */
function Stage({ setStage, children }) {
  return (
    <div ref={setStage} style={{
      position: 'relative', height: 440, overflow: 'hidden', display: 'grid', placeItems: 'center',
      background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)',
    }}>
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

const FRAME = 340;

function Demo({ initial, can, actions: actionsOf, anyMove = false, ratio = 1 }) {
  const [canvas, setCanvas] = useState(null);
  const [stage, setStage] = useState(null);
  const [items, setItems] = useState(initial);
  const [sel, setSel] = useState(initial.length === 1 ? 0 : null);
  const live = useRef();
  live.current = { items, sel };
  const H = FRAME / ratio;
  const canFor = (o) => (typeof can === 'function' ? can(o) : can);

  const upd = (i, f) => setItems((list) => list.map((o, j) => (j === i ? { ...o, ...f(o) } : o)));
  const drag = useObjectDrag({
    hit: (p) => { const i = boxHit(live.current.items, p.x, p.y); return i < 0 ? null : i; },
    selected: () => live.current.sel,
    select: (k) => setSel(k),
    get: (k) => live.current.items[k],
    can: (k) => canFor(live.current.items[k]),
    begin: (k) => ({ w: live.current.items[k].w, h: live.current.items[k].h }),
    place: (k, x, y) => upd(k, () => ({ x, y })),
    turn: (k, rot) => upd(k, () => ({ rot })),
    scale: (k, m, st) => { upd(k, () => ({ w: st.w * m, h: st.h * m })); return m; },
    center: () => ({ x: FRAME / 2, y: H / 2 }),
    anyMove,
  }, { canvas, stage, frame: FRAME });

  const onAction = (id) => {
    const i = sel;
    if (id === 'flip') upd(i, (o) => ({ flip: !o.flip }));
    if (id === 'trash') { setItems((l) => l.filter((_, j) => j !== i)); setSel(null); }
    if (id === 'layerUp' || id === 'layerDown') {
      setItems((l) => { const o = l[i], rest = l.filter((_, j) => j !== i); return id === 'layerUp' ? [...rest, o] : [o, ...rest]; });
      setSel(id === 'layerUp' ? items.length - 1 : 0);
    }
  };
  const it = sel != null ? items[sel] : null;
  const top = sel === items.length - 1;

  return (
    <Stage setStage={setStage}>
      <EditCanvas ref={setCanvas} ratio={ratio} style={{ background: 'var(--color-bg-default)', width: 280 }}>
        {items.map((o, i) => (
          <div key={o.id} style={{
            position: 'absolute', left: `${((o.x - o.w / 2) / FRAME) * 100}%`, top: `${((o.y - o.h / 2) / H) * 100}%`,
            width: `${(o.w / FRAME) * 100}%`, height: `${(o.h / H) * 100}%`,
            transform: `rotate(${o.rot || 0}rad) scaleX(${o.flip ? -1 : 1})`,
            background: COLORS[i % COLORS.length], borderRadius: 'var(--radius-md)',
            display: 'grid', placeItems: 'center', color: 'var(--color-text-default)',
          }} className="text-label-md">{o.label}</div>
        ))}
      </EditCanvas>
      <ObjectBox {...drag} obj={it} can={it ? canFor(it) : undefined} actions={it && actionsOf ? actionsOf(top, items.length) : []} onAction={onAction} />
    </Stage>
  );
}

const two = [
  { id: 'a', label: '사진', x: 120, y: 140, w: 120, h: 90, rot: 0 },
  { id: 'b', label: '말풍선', x: 220, y: 210, w: 110, h: 110, rot: 0.3 },
];

export const Composer = {
  name: '여러 개체 (이미지 만들기)',
  render: () => (
    <Demo
      initial={two}
      actions={(top, n) => [
        { id: 'eraser', icon: 'eraser', label: '배경 지우기' },
        ...(n > 1 ? [top ? { id: 'layerDown', icon: 'layerDown', label: '맨 뒤로' } : { id: 'layerUp', icon: 'layerUp', label: '맨 앞으로' }] : []),
        { id: 'flip', icon: 'flip', label: '좌우 반전' },
        { id: 'trash', icon: 'trash', label: '삭제' },
      ]}
    />
  ),
};

export const IconKind = {
  name: '개체 하나, 아이콘류 (칸 그림)',
  render: () => (
    <Demo
      initial={[{ id: 'a', label: '아이콘', x: 170, y: 170, w: 160, h: 160, rot: 0 }]}
      anyMove
      actions={() => [{ id: 'eraser', icon: 'eraser', label: '배경 지우기' }, { id: 'flip', icon: 'flip', label: '좌우 반전' }]}
    />
  ),
};

export const Background = {
  name: '배경류: 크기·옮기기, 도구 줄 없음',
  render: () => (
    <Demo initial={[{ id: 'a', label: '배경 사진', x: 170, y: 220, w: 420, h: 520, rot: 0 }]} anyMove ratio={9 / 14} can={{ rotate: false }} />
  ),
};

export const TurnOnly = {
  name: '회전만 (무늬 그림·말풍선 장식)',
  render: () => (
    <Demo
      initial={[{ id: 'a', label: '무늬', x: 170, y: 170, w: 180, h: 140, rot: 0 }]}
      anyMove
      can={{ move: false, resize: false }}
      actions={() => [{ id: 'eraser', icon: 'eraser', label: '배경 지우기' }, { id: 'flip', icon: 'flip', label: '좌우 반전' }]}
    />
  ),
};

export const Fixed = {
  name: '선만 (짤 자막)',
  render: () => (
    <Demo
      initial={[{ id: 'a', label: '말풍선', x: 170, y: 140, w: 140, h: 120, rot: 0 }, { id: 'b', label: '자막', x: 170, y: 300, w: 340, h: 60, rot: 0 }]}
      can={(o) => (o.id === 'b' ? { move: false, resize: false, rotate: false, handles: false } : undefined)}
      actions={(top) => [
        top ? { id: 'layerDown', icon: 'layerDown', label: '맨 뒤로' } : { id: 'layerUp', icon: 'layerUp', label: '맨 앞으로' },
        { id: 'trash', icon: 'trash', label: '삭제' },
      ]}
    />
  ),
};
