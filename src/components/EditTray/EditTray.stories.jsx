import { useState } from 'react';
import ChipGroup from '../ChipGroup/ChipGroup';
import ColorPalette from '../ColorPalette/ColorPalette';
import EditTray, { EditTrayBody } from './EditTray';
import Slider from '../Slider/Slider';

const TABS = [{ value: 'color', label: '색상' }, { value: 'shape', label: '형태' }];
const COLORS = [{ value: '#ffffff', label: '하양' }, { value: '#1f1f1f', label: '검정' }, { value: '#dcefff', label: '하늘' }];

export default {
  title: 'Components/EditTray',
  component: EditTray,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
편집 화면 아래 자리의 속. \`EditFrame\`의 \`footer\`에 넣고 칩 줄과 본문을 차례로 담는다.

**규칙**
- 칩 줄과 본문 사이는 24(\`spacing-6\`)다. 편집기마다 간격을 따로 정하지 않는다.
- \`EditFrame\`의 좌우 20을 되돌린다. 칩 묶음·선택 줄은 제 양 끝 여백 16을 가져 화면 끝까지 닿는다. 넘기지 않는 줄은 쓰는 쪽이 좌우 16을 준다.
- 칩 줄 없이 슬라이더 하나만 놓는 아래 자리에는 쓰지 않는다.

**본문 높이(\`EditTrayBody\`)**
- 칩 줄 밑 본문은 \`EditTrayBody\`에 \`value\`(고른 칩)와 \`panes\`(\`{ 칩 값: 속 }\`)로 넘긴다.
- \`height="auto"\`(기본): 고른 속만 그린다. 높이는 속을 따르고, \`EditFrame\`이 재어 부드럽게 옮긴다. 판은 남은 자리만큼 커지고 작아진다. 보통은 이것을 쓴다.
- \`height="max"\`: 속을 모두 한 칸에 겹쳐 두고 가장 큰 높이에 고정한다. 칩을 바꿔도 아래 자리와 판이 움직이지 않는다. 안 고른 속은 보이지도 눌리지도 않고 자리만 차지한다(\`visibility: hidden\` + \`inert\`). 속은 늘 그려져 있어 안의 상태가 남는다.
- \`max\`는 칩 사이를 자주 오가 리플로우가 손을 방해할 때 쓴다. 판에서 개체를 고르면 칩이 저절로 넘어가는 편집기처럼, 끌던 판이 밀리면 안 되는 자리다.
- \`max\`이면 가장 긴 속만큼 판이 늘 작아진다. 속 사이 높이 차가 크면 짧은 칩에서 빈자리가 크게 남으니, 그때는 \`auto\`를 두고 칩이 저절로 넘어가지 않게 하는 쪽을 먼저 본다.
        `,
      },
    },
  },
};

export const Default = {
  render: () => {
    const [tab, setTab] = useState('color');
    const [color, setColor] = useState('#ffffff');
    return (
      <div style={{ padding: '0 var(--spacing-5)' }}>
        <EditTray>
          <ChipGroup items={TABS} value={tab} onChange={setTab} label="꾸밀 곳" />
          <ColorPalette label="배경" colors={COLORS} value={color} onChange={setColor} />
        </EditTray>
      </div>
    );
  },
};

/* 칩마다 속 높이가 다를 때. 위 칸을 바꿔 auto와 max를 견준다 */
const HEIGHT_TABS = [{ value: 'color', label: '색상' }, { value: 'size', label: '크기' }];
function HeightDemo({ height }) {
  const [tab, setTab] = useState('color');
  const [color, setColor] = useState('#ffffff');
  const [a, setA] = useState(40);
  const [b, setB] = useState(60);
  const [c, setC] = useState(20);
  return (
    <div style={{ padding: '0 var(--spacing-5)', border: '1px dashed var(--color-border-default)' }}>
      <EditTray>
        <ChipGroup items={HEIGHT_TABS} value={tab} onChange={setTab} label="꾸밀 곳" />
        <EditTrayBody value={tab} height={height} panes={{
          color: <ColorPalette label="배경" colors={COLORS} value={color} onChange={setColor} />,
          size: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', padding: '0 var(--spacing-4)' }}>
              <Slider label="가로" value={a} min={0} max={100} onChange={setA} />
              <Slider label="세로" value={b} min={0} max={100} onChange={setB} />
              <Slider label="기울기" value={c} min={0} max={100} onChange={setC} />
            </div>
          ),
        }} />
      </EditTray>
    </div>
  );
}

export const BodyAuto = {
  name: '본문 높이 auto (기본)',
  render: () => <HeightDemo height="auto" />,
};

export const BodyMax = {
  name: '본문 높이 max (칩을 바꿔도 높이 그대로)',
  render: () => <HeightDemo height="max" />,
};
