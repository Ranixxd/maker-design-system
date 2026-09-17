import { useState } from 'react';
import SegmentedControl from './SegmentedControl';

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
한 자리에서 보는 것을 바꾸는 탭 묶음. 옅은 판 위에서 고른 칸만 흰 알약으로 떠오른다
(내 테마의 보관한 테마·최근 내보낸 테마, 말풍선 만들기의 늘어나는 곳·글자 자리).

**Chip과 가르기**
- 두셋이 한 줄을 꽉 채워 나눠 갖는다 → **SegmentedControl**
- 칸이 늘어날 수 있고, 넘치면 굴린다 → **Chip**

칸이 넷을 넘으면 글자가 눌린다. 그때는 Chip 줄이나 다른 길을 본다.

\`items\`는 \`[{ value, label, id? }]\`이고, 고른 값은 쓰는 쪽이 들고 \`value\`·\`onChange\`로 주고받는다.
        `,
      },
    },
  },
  argTypes: { items: { control: false }, value: { control: false } },
};

const Demo = ({ items, label }) => {
  const [v, setV] = useState(items[0].value);
  return <SegmentedControl items={items} value={v} onChange={setV} label={label} />;
};

export const Two = {
  name: '두 칸',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Demo label="내 테마 탭" items={[{ value: 'cloud', label: '보관한 테마' }, { value: 'local', label: '최근 내보낸 테마' }]} />
    </div>
  ),
};

export const Three = {
  name: '세 칸',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Demo label="보기" items={[{ value: 'a', label: '친구탭' }, { value: 'b', label: '채팅방' }, { value: 'c', label: '잠금화면' }]} />
    </div>
  ),
};
