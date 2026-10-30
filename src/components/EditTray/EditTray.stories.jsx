import { useState } from 'react';
import ChipGroup from '../ChipGroup/ChipGroup';
import ColorPalette from '../ColorPalette/ColorPalette';
import EditTray from './EditTray';

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
