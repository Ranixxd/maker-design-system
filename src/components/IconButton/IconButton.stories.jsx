import IconButton from './IconButton';
import Button from '../Button/Button';

export default {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
아이콘만 있는 정사각형 버튼. 텍스트 없이 아이콘 하나로 액션을 나타낼 때 사용한다.

**사용 규칙**
- 반드시 \`aria-label\`을 지정한다 (스크린리더가 동작을 읽을 수 있도록).
- Button과 나란히 배치될 수 있어 높이를 동일하게 맞춘다 (sm=36px, md=48px).
- 항상 정사각형(aspect-ratio:1)을 유지한다.

| variant | 설명 |
|---|---|
| \`neutral\` | 배경 없음. Topbar·닫기 버튼 등 기본형 |
| \`secondary\` | bg-secondary 배경. 중간 강조 |
| \`primary\` | bg-inverse 배경. 가장 강한 강조 |

**모바일 hover 처리**
\`@media (hover: none)\` 환경(터치 디바이스)에서는 hover 오버레이가 표시되지 않는다.
        `,
      },
    },
  },
  argTypes: {
    icon: { control: 'text', description: '등록된 아이콘 이름 (Icon 컴포넌트 참고 — 목록에 없으면 렌더링되지 않는다)' },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'sm=36px / md=48px — Button 높이와 동일',
    },
    variant: {
      control: 'radio',
      options: ['neutral', 'secondary', 'primary'],
    },
  },
};

export const Default = {
  args: { icon: 'X', size: 'md', variant: 'neutral', 'aria-label': '닫기' },
};

export const AllVariants = {
  name: 'Variant 비교',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
      <IconButton icon="Palette" size="md" variant="neutral"   aria-label="neutral" />
      <IconButton icon="Palette" size="md" variant="secondary" aria-label="secondary" />
      <IconButton icon="Palette" size="md" variant="primary"   aria-label="primary" />
    </div>
  ),
};

export const AllSizes = {
  name: '사이즈 비교 (neutral)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
      <IconButton icon="X" size="sm" aria-label="닫기 sm" />
      <IconButton icon="X" size="md" aria-label="닫기 md" />
    </div>
  ),
};

export const WithButtonComparison = {
  name: 'Button과 높이 비교',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
      <Button variant="secondary" size="sm">취소</Button>
      <IconButton icon="X"    size="sm" aria-label="닫기 sm" variant="neutral" />
      <Button variant="primary" size="md">확인</Button>
      <IconButton icon="Plus" size="md" aria-label="추가 md" variant="neutral" />
    </div>
  ),
};

export const CommonUsages = {
  name: '자주 쓰는 아이콘들',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
      <IconButton icon="X"               size="md" aria-label="닫기" />
      <IconButton icon="Menu"            size="md" aria-label="메뉴" />
      <IconButton icon="Plus"            size="md" aria-label="추가" />
      <IconButton icon="ChevronLeft"     size="md" aria-label="뒤로" />
      <IconButton icon="ChevronRight"    size="md" aria-label="앞으로" />
      <IconButton icon="MoreHorizontal"  size="md" aria-label="더보기" />
    </div>
  ),
};
