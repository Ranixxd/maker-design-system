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
- **높이는 늘 가장 긴 속에 맞춘다.** 속을 모두 한 칸에 겹쳐 두어, 칩을 바꿔도 아래 자리와 판이 움직이지 않는다. 안 고른 속은 보이지도 눌리지도 않고 자리만 차지한다(\`visibility: hidden\` + \`inert\`). 속은 늘 그려져 있어 안의 상태가 남는다.
- **높이 상한은 216이다.** 속이 그보다 길면 그 속 안에서 세로로 넘긴다. 아래 자리가 커지면 판(미리보기)이 그만큼 작아지므로, 판이 너무 작아지지 않게 막는다.
- 짧은 칩에서는 아래에 빈자리가 남는다. 판이 흔들리지 않는 쪽을 고른 것이다.
- 편집 화면은 크기를 끌어 바꿀 수 없다. 끌어서 높이를 바꾸는 바텀시트(\`LayerPopup\` sheet)와 다른 점이라, 높이는 이 부품이 정한다.
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

/* 칩마다 속 높이가 다를 때. 높이는 가장 긴 속(상한 216)에 맞고, 칩을 바꿔도 그대로다. 「여럿」은 상한을 넘어 속 안에서 넘긴다 */
const HEIGHT_TABS = [{ value: 'color', label: '색상' }, { value: 'size', label: '크기' }, { value: 'many', label: '여럿' }];
const SLIDERS = ['가로', '세로', '기울기', '흐림', '밝기', '간격', '두께'];
function Sliders({ names }) {
  const [v, setV] = useState({});
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', padding: '0 var(--spacing-4)' }}>
      {names.map((n) => <Slider key={n} label={n} value={v[n] ?? 50} min={0} max={100} onChange={(x) => setV((o) => ({ ...o, [n]: x }))} />)}
    </div>
  );
}

export const Body = {
  name: '본문 높이 (가장 긴 속, 상한 216)',
  render: () => {
    const [tab, setTab] = useState('color');
    const [color, setColor] = useState('#ffffff');
    return (
      <div style={{ padding: '0 var(--spacing-5)', border: '1px dashed var(--color-border-default)' }}>
        <EditTray>
          <ChipGroup items={HEIGHT_TABS} value={tab} onChange={setTab} label="꾸밀 곳" />
          <EditTrayBody value={tab} panes={{
            color: <ColorPalette label="배경" colors={COLORS} value={color} onChange={setColor} />,
            size: <Sliders names={SLIDERS.slice(0, 3)} />,
            many: <Sliders names={SLIDERS} />,
          }} />
        </EditTray>
      </div>
    );
  },
};
