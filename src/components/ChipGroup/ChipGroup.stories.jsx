import { useState } from 'react';
import ChipGroup from './ChipGroup';

const KINDS = [
  { value: 'all', label: '전체' },
  { value: 'white', label: '하양' },
  { value: 'black', label: '검정' },
  { value: 'pink', label: '분홍' },
  { value: 'blue', label: '파랑' },
];
const SNS = [
  { value: 'blog', label: '블로그' },
  { value: 'postype', label: '포스타입' },
  { value: 'x', label: 'X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'threads', label: 'Threads' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'discord', label: 'Discord' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'pixiv', label: 'pixiv' },
];

export default {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
칩 묶음(2026-10-14). \`Chip\` 여럿을 한 줄로 담고 **그중 하나를 고르는** 그릇이다. 칩 하나의 모양은 Chip 문서에 있다.

**언제 쓰나**
- 칸 수가 **늘어날 수 있는** 고르기. 두세 칸으로 고정된 전환은 \`SegmentedControl\`이다
- 그림·색 타일을 고르는 줄은 \`SelectRow\`(\`ColorPalette\`)다. 글자로 고르면 이것이다
- 여러 개를 함께 고르는 자리는 아직 없다. 생기면 그때 정한다(이 부품은 늘 하나 이하다)

**규칙**
- 칩 사이 4(\`spacing-1\`). 넘치면 **가로로 넘긴다.** 줄을 바꾸지 않는다
- 줄 양 끝 여백은 \`inset\`, 기본 16. 감싸는 쪽이 좌우 여백을 또 주지 않는다. 카드처럼 이미 여백이 있는 안쪽이면 \`inset={0}\`
- 끝 여백은 빈 칸으로 둔다. 아이폰은 넘기는 칸의 오른쪽 padding을 스크롤 거리에 넣지 않아 마지막 칸이 잘린다(SelectRow와 같다)

**\`allowEmpty\`: 고르지 않는 것도 답일 때**
- 켜면 고른 칩을 다시 누를 때 풀린다(\`onChange(null)\`). 끄면 늘 하나가 골라진 전환이다
- 프로필 SNS 종류가 처음이다(2026-10-14 사용자). 안 고르면 SNS가 없고, 그 아래 계정명·주소 칸도 숨는다.
  호기심에 한 번 눌러 본 사람이 되돌릴 길이 없었다
- 풀린 상태에 딸린 칸이 있으면 쓰는 쪽이 숨긴다. 이름 없이 "아무것도 안 눌림"으로만 보이니 무엇이 꺼졌는지가 화면에서 읽혀야 한다
        `,
      },
    },
  },
};

export const Default = {
  name: '기본(늘 하나)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('all');
    return <ChipGroup label="색" items={KINDS} value={v} onChange={setV} />;
  },
};

export const AllowEmpty = {
  name: '풀 수 있음(allowEmpty)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState(null);
    return (
      <div>
        <ChipGroup label="SNS" items={SNS} value={v} onChange={setV} allowEmpty />
        <p className="text-body-sm" style={{ padding: '0 var(--spacing-4)', color: 'var(--color-text-secondary)' }}>
          {v ? `고른 것: ${v}` : '안 고름'}
        </p>
      </div>
    );
  },
};

export const NoInset = {
  name: '카드 안(inset 0)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('x');
    return (
      <div style={{ padding: 'var(--spacing-6)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-2xl)' }}>
        <ChipGroup label="SNS" items={SNS} value={v} onChange={setV} allowEmpty inset={0} />
      </div>
    );
  },
};
