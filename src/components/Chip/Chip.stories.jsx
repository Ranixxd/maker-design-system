import { useState } from 'react';
import Chip from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
알약 모양의 작은 고르개. **여럿 중 하나를 걸러 보는 자리**에 선다
(이모지 분류, 말풍선 색, 좋아하는 색, 편집 패널 구역).

**Chip과 SegmentedControl 가르기**
- 칸이 늘어날 수 있고, 넘치면 가로로 굴린다 → **Chip**
- 두셋이 한 줄을 꽉 채워 나눠 갖는다 → **SegmentedControl**
- 먼저 볼 것은 칸 수가 아니라 **무엇을 바꾸나**다(2026-10-12 사용자). 같은 종류의 글을 분류로 걸러 보면
  칸이 둘이어도 Chip(업데이트 소식의 기능·약관), 같은 자리에서 다른 화면·모드로 바꾸면 SegmentedControl(만들기|자랑)

**쓰지 않는 곳**: 눌러서 이동만 하는 것. 그건 링크나 Button이다. Chip은 고른 상태가 남는다.

**지우기 붙은 칩**(\`onRemove\`, 2026-10-13): \`[레이어 2 ×]\`처럼 칩 안 오른쪽에 ×가 선다. 더하고 빼는 칩 줄(배경 만들기 레이어)에 쓴다.
×는 칩 글자색을 따르고(고른 칩이면 흰색) 누름 영역은 24다. \`removeLabel\`에 무엇을 지우는지 적는다.
칩 모서리에 ×를 걸치면(CornerButton) 옆 칩과 붙어 잘못 누르기 쉬웠다(사용자). 칩에는 CornerButton을 쓰지 않는다

**여러 개를 늘어놓을 때**는 부모가 \`display:flex; gap: var(--spacing-1)\`로 줄을 만들고,
넘치면 \`overflow-x:auto\`로 굴린다. Chip 자신은 줄바꿈하지 않는다.
2026-09-21에 8px에서 4px로 줄였다. 칩은 테두리가 있어 8px면 한 줄이 아니라 낱개로 흩어져 보인다.

**모양**: 평소에는 \`border-default\` 테두리에 글자만 있고, 고르면 \`bg-primary\`로 채워지고 글자가 \`text-onprimary\`가 된다(2026-10-06 사용자).
09-29~10-06에는 테두리 없이 글자만, 고르면 옅은 회색(\`bg-tertiary\`)이었는데 고른 것이 티가 안 났다.
        `,
      },
    },
  },
  argTypes: { selected: { control: 'boolean' }, children: { control: 'text' } },
};

export const Default = { name: '기본', args: { children: '표정' } };
export const Selected = { name: '고른 것', args: { children: '표정', selected: true } };

export const Row = {
  name: '한 줄에 여럿',
  parameters: { controls: { disable: true } },
  render: () => {
    const [cur, setCur] = useState('all');
    const items = [['all', '전체'], ['white', '하양'], ['black', '검정'], ['pink', '분홍'], ['blue', '파랑']];
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-1)', overflowX: 'auto' }}>
        {items.map(([id, label]) => (
          <Chip key={id} selected={cur === id} onClick={() => setCur(id)}>{label}</Chip>
        ))}
      </div>
    );
  },
};

export const WithLeading = {
  name: '앞에 그림',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-1)' }}>
      <Chip leading="🩷" selected>분홍</Chip>
      <Chip leading="💛">노랑</Chip>
    </div>
  ),
};

export const Removable = {
  name: '지우기 붙은 칩',
  parameters: { controls: { disable: true } },
  render: () => {
    const [n, setN] = useState(3);
    const [cur, setCur] = useState(1);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-1)' }}>
        {Array.from({ length: n }, (_, i) => (
          <Chip key={i} selected={cur === i} onClick={() => setCur(i)}
            onRemove={i > 0 && cur === i ? () => { setN(n - 1); setCur(i - 1); } : undefined}
            removeLabel={'레이어 ' + (i + 1) + ' 지우기'}>{'레이어 ' + (i + 1)}</Chip>
        ))}
      </div>
    );
  },
};
