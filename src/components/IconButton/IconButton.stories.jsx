import IconButton from './IconButton';
import Button from '../Button/Button';

export default {
  title: 'Components/IconButton',
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
- **나란히(또는 한 묶음으로 쌓여) 놓인 버튼은 따로 정한 것이 없으면 늘 같은 크기다** (2026-09-25). 자세한 규칙은 Button 문서 "나란히 놓인 버튼".
- 항상 정사각형(aspect-ratio:1)을 유지한다.
- **그림자를 넣지 않는다** (2026-09-25). 떠 있는 단추여도 쓰는 쪽이 \`box-shadow\`를 얹지 않는다. 배경에 묻히면 \`outline\`을 쓴다(면이 채워져 있다).

| variant | 설명 |
|---|---|
| \`neutral\` | 배경 없음. Topbar·닫기 버튼 등 기본형 |
| \`neutral-weak\` | 배경 없음, 아이콘이 한 톤 옅다(icon-secondary). 목록 줄의 지우기처럼 내용 곁의 보조 동작 |
| \`secondary\` | bg-secondary 배경. 중간 강조 |
| \`primary\` | bg-primary 배경. 가장 강한 강조 |
| \`outline\` | 흰 바탕에 얇은 테두리(border-default). **대체제다** |

**variant 고르기**
되도록 \`primary\`·\`secondary\`·\`neutral\` 안에서 고른다. \`outline\`은 neutral로는 버튼이라는 것이
안 읽히고, secondary를 쓰기에는 기본 기능일 때만 쓴다(편집기 항목 줄의 사진 올리기·색 고르기·편집).

**뒤로 가기 (2026-09-25)**
- 아이콘은 \`ArrowLeft\`다. \`ChevronLeft\`·\`ChevronRight\`는 더보기·펼치기로 읽혀서 뒤로 가기에 쓰지 않는다
- \`neutral\`이다. 제목 줄 안이든, 뒤로 가기 혼자 위 한 줄을 차지하든(상세·완료 화면) 줄이 따로 있어 배경에 묻히지 않는다
- 그림 위에 띄우지 않는다. 띄워 봤다가 첫 그림을 가려 줄로 되돌렸다

**로딩**
\`loading\`을 주면 아이콘 자리에 스피너가 돌고 누를 수 없다. 흐려지지 않는다. 못 쓰는 버튼(disabled)이 아니라 일이 도는 중이다.

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
      options: ['neutral', 'neutral-weak', 'secondary', 'primary', 'outline'],
    },
    loading: { control: 'boolean', description: '스피너를 돌리고 누르지 못하게 한다' },
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
      <IconButton icon="Palette" size="md" variant="neutral-weak" aria-label="neutral-weak" />
      <IconButton icon="Palette" size="md" variant="secondary" aria-label="secondary" />
      <IconButton icon="Palette" size="md" variant="primary"   aria-label="primary" />
      <IconButton icon="Palette" size="md" variant="outline"   aria-label="outline" />
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
      <IconButton icon="ArrowLeft"       size="md" aria-label="뒤로" />
      <IconButton icon="ChevronRight"    size="md" aria-label="앞으로" />
      <IconButton icon="MoreHorizontal"  size="md" aria-label="더보기" />
    </div>
  ),
};

export const Loading = {
  name: '로딩',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
      <IconButton icon="Trash2" size="sm" variant="neutral-weak" aria-label="삭제" />
      <IconButton icon="Trash2" size="sm" variant="neutral-weak" aria-label="삭제 중" loading />
      <IconButton icon="Trash2" size="md" variant="neutral" aria-label="삭제 중" loading />
      <IconButton icon="Trash2" size="md" variant="primary" aria-label="삭제 중" loading />
    </div>
  ),
};
