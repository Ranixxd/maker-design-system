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

**쓰지 않는 곳**: 눌러서 이동만 하는 것. 그건 링크나 Button이다. Chip은 고른 상태가 남는다.

**여러 개를 늘어놓을 때**는 부모가 \`display:flex; gap: var(--spacing-1)\`로 줄을 만들고,
넘치면 \`overflow-x:auto\`로 굴린다. Chip 자신은 줄바꿈하지 않는다.
2026-09-21에 8px에서 4px로 줄였다. 칩은 테두리가 있어 8px면 한 줄이 아니라 낱개로 흩어져 보인다.
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
