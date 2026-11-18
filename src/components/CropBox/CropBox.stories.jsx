import { useRef, useState } from 'react';
import CropBox from './CropBox';
import EditCanvas from '../EditCanvas/EditCanvas';

export default {
  title: 'Components/CropBox',
  component: CropBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
판 위 자르기 상자. 판에 올린 그림에서 쓸 영역만 남길 때 쓴다(2026-11-19 사용자). 정해진 판 크기에 맞춰 넣는 판(ObjectBox)과 달리, 안 쓰는 영역을 걷어 내는 판이 쓴다.
EditFrame 안 EditCanvas 위에 얹는다. 아래 예시는 변을 끌어 볼 수 있다.

**보이는 것**
- **상자 밖은 덮개로 어둡게 한다**(\`bg-overlay\`). 판 안만 덮는다. 밝게 보이는 것은 상자 안뿐이다. 덮지 않으면 자르기로 읽히지 않는다
- 상자 밖에 판이 함께 그리는 것(미리보기용 짝 그림 등)도 덮개 아래다
- 상자는 각진 네모, 선은 \`border-accent\` 1.5(ObjectBox 상자 선과 같다). 선은 상자 안쪽에 그려 바깥 끝이 덮개 구멍과 맞고, 판 끝에 붙어도 잘리지 않는다
- **네 변 가운데에 손잡이**: 변을 따라 긴 막대 28 × 6, \`border-accent\`, 외곽선·둥근 모서리 없음. **변 바깥에 붙는다.** 안쪽에 두면 그림 끝을 가려 미세 조정이 안 된다. 판 끝에 붙은 변의 손잡이는 판 밖으로 나온다
- 손잡이는 그림일 뿐이다. 잡는 자리는 쓰는 판이 정한다(변 전체 근처를 잡게 한다. 폰에서 6px 막대를 겨누지 않게)

**도구 줄**
- ObjectBox 도구 줄과 같은 단추·모양이다(\`actions\`, \`onAction\`, \`barSide\`). 판마다 넣을 것만 넣고, 넣을 것이 없으면 띄우지 않는다
- 자리: 손잡이까지 감싼 네모 **아래** 12. 바탕 아래 끝에 안 들어가면 위, 위에도 안 들어가면 바탕 맨 위. 끄는 동안(\`dragging\`) 숨는다

**쓰는 법**
- \`<CropBox canvas={canvas} stage={stage} frame={판 너비 단위} box={{ x, y, w, h }} dragging={끄는 중} />\`. \`box\`는 판 단위, x·y가 왼쪽 위다. \`box\`가 없으면 아무것도 안 그린다
- \`CropBox\`는 EditCanvas의 **형제**로 둔다(판 안에 두면 판이 잘라 판 밖 손잡이·도구 줄이 안 보인다)
- 상자 밖 그림을 숨기는 것(실제로 잘려 나갈 곳을 안 보이게)은 판이 그릴 때 한다. 덮개는 어둡게만 한다
- 변 끄는 셈은 판이 한다. 손가락은 상자에 닿지 않고 아래 판이 받는다(\`pointer-events: none\`, 도구 줄만 받는다)
        `,
      },
    },
  },
};

const FRAME = 340;
const MIN = 40;
const HIT = 24; /* 변을 잡는 자리(판 단위) */

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

function Demo({ initial, actions = [] }) {
  const [canvas, setCanvas] = useState(null);
  const [stage, setStage] = useState(null);
  const [box, setBox] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const [said, setSaid] = useState('');
  const drag = useRef(null);

  const toPt = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * FRAME / r.width, y: (e.clientY - r.top) * FRAME / r.height };
  };
  const down = (e) => {
    const p = toPt(e), b = box;
    const d = [['l', Math.abs(p.x - b.x)], ['r', Math.abs(p.x - (b.x + b.w))], ['t', Math.abs(p.y - b.y)], ['b', Math.abs(p.y - (b.y + b.h))]]
      .sort((a, c) => a[1] - c[1])[0];
    if (d[1] > HIT) return;
    drag.current = { side: d[0], p, b };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const move = (e) => {
    const s = drag.current; if (!s) return;
    const p = toPt(e), dx = p.x - s.p.x, dy = p.y - s.p.y, b = s.b;
    let { x, y, w, h } = b;
    if (s.side === 'l') { x = Math.min(Math.max(0, b.x + dx), b.x + b.w - MIN); w = b.x + b.w - x; }
    if (s.side === 'r') w = Math.min(Math.max(MIN, b.w + dx), FRAME - b.x);
    if (s.side === 't') { y = Math.min(Math.max(0, b.y + dy), b.y + b.h - MIN); h = b.y + b.h - y; }
    if (s.side === 'b') h = Math.min(Math.max(MIN, b.h + dy), FRAME - b.y);
    setBox({ x, y, w, h });
  };
  const up = () => { drag.current = null; setDragging(false); };

  return (
    <div>
      <Stage setStage={setStage}>
        <EditCanvas ref={setCanvas} ratio={1} style={{ background: 'var(--color-bg-default)', width: 280, touchAction: 'none' }}>
          <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
            style={{ position: 'absolute', inset: 0 }}>
            <div style={{
              position: 'absolute', left: '20%', top: '25%', width: '60%', height: '50%',
              background: '#f6c344', borderRadius: 'var(--radius-lg)', /* @token-ok 예시 그림 색(콘텐츠) */
            }} />
          </div>
        </EditCanvas>
        <CropBox canvas={canvas} stage={stage} frame={FRAME} box={box} dragging={dragging}
          actions={actions} onAction={(id) => setSaid(id)} />
      </Stage>
      {actions.length > 0 && <p className="text-body-sm">누른 단추: {said || '없음'}</p>}
    </div>
  );
}

/* 이미지 만들기 자르기 단계처럼 도구 줄 없이 */
export const Basic = { render: () => <Demo initial={{ x: 60, y: 80, w: 220, h: 180 }} /> };

/* 변이 판 끝에 붙으면 손잡이가 판 밖으로 나온다 */
export const EdgeOfBoard = { render: () => <Demo initial={{ x: 0, y: 0, w: 340, h: 340 }} /> };

/* 도구 줄을 붙인 판. 단추는 ObjectBox와 같다 */
export const WithToolbar = {
  render: () => <Demo initial={{ x: 60, y: 60, w: 220, h: 160 }}
    actions={[{ id: 'erase', icon: 'eraser', label: '배경 지우기' }, { id: 'flip', icon: 'flip', label: '좌우 반전' }]} />,
};
