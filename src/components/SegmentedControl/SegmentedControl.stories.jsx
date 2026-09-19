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

**크기**: 기본은 \`md\`. 작은 제목 바로 옆에 붙는 전환은 \`size="sm"\`을 쓴다. 작은 제목 한 줄과 키가 거의 같다.
md를 그 자리에 두면 제목보다 탭이 커 보인다(2026-09-19, 배경화면 메이커의 배경 색상·이미지).

**너비**: 기본은 \`fixed\`로, 받은 너비를 칸들이 똑같이 나눠 갖는다(카톡테마 메이커).
\`width="auto"\`는 칸마다 글자만큼만 차지하고 묶음도 그만큼만 선다(배경화면 메이커).

\`items\`는 \`[{ value, label, id? }]\`이고, 고른 값은 쓰는 쪽이 들고 \`value\`·\`onChange\`로 주고받는다.
        `,
      },
    },
  },
  argTypes: { items: { control: false }, value: { control: false } },
};

const Demo = ({ items, label, size, width }) => {
  const [v, setV] = useState(items[0].value);
  return <SegmentedControl items={items} value={v} onChange={setV} label={label} size={size} width={width} />;
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

export const Auto = {
  name: '글자만큼 (width="auto")',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360, display: 'flex', justifyContent: 'center' }}>
      <Demo width="auto" label="화면 전환" items={[{ value: 'make', label: '만들기' }, { value: 'showcase', label: '자랑' }]} />
    </div>
  ),
};

export const Small = {
  name: '작은 크기 (sm)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="text-label-sm">배경</span>
      <Demo size="sm" width="auto" label="배경 종류" items={[{ value: 'color', label: '색상' }, { value: 'image', label: '이미지' }]} />
    </div>
  ),
};
