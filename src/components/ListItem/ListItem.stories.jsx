import ListItem from './ListItem';
import Icon from '../Icon/Icon';

export default {
  title: 'UI/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
리스트 항목 컴포넌트. 두 가지 variant를 제공한다.

**variant 선택 기준**
- \`normal\` — 사이드바 메뉴, 설정 항목처럼 **세로로 나열되는 목록**에 사용
- \`box\` — 이미지 불러오기 / 직접 만들기처럼 **사용자가 선택해야 하는 옵션 카드**에 사용

**trailing 규칙**
- \`"chevron"\` — 다음 화면으로 이동 시
- ReactNode — 뱃지, 스위치 등 커스텀 요소
- undefined — trailing 없이 left-content만 표시
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['normal', 'box'],
    },
    label: { control: 'text' },
    sub: { control: 'text', description: 'box variant에서 주로 사용하는 부가 설명' },
    trailing: { control: 'text', description: '"chevron" 또는 ReactNode' },
  },
};

export const NormalWithChevron = {
  name: 'Normal — chevron',
  args: {
    variant: 'normal',
    label: '테마 설정',
    trailing: 'chevron',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const NormalWithIcon = {
  name: 'Normal — 아이콘 + chevron',
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <ListItem
        {...args}
        icon={<Icon name="Palette" size="md" />}
        trailing="chevron"
      />
    </div>
  ),
  args: { variant: 'normal', label: '테마 설정' },
};

export const NormalList = {
  name: 'Normal — 사이드바 메뉴 예시',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { icon: 'Home', label: '홈' },
      { icon: 'Palette', label: '테마 편집' },
      { icon: 'Bell', label: '공지사항' },
      { icon: 'Info', label: '앱 정보' },
    ];
    return (
      <div style={{ maxWidth: 320, padding: 'var(--spacing-2) 0' }}>
        {items.map((item) => (
          <ListItem
            key={item.label}
            variant="normal"
            icon={<Icon name={item.icon} size="md" />}
            label={item.label}
            trailing="chevron"
            onClick={() => {}}
          />
        ))}
      </div>
    );
  },
};

export const Box = {
  name: 'Box — 기본',
  args: {
    variant: 'box',
    label: '이미지 불러오기',
    sub: '갤러리에서 이미지를 선택해요',
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <ListItem {...args} icon={<Icon name="Upload" size="md" />} onClick={() => {}} />
    </div>
  ),
};

export const BoxOptionGroup = {
  name: 'Box — 선택 옵션 그룹 예시',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 'var(--item-gap)' }}>
      <ListItem
        variant="box"
        icon={<Icon name="Upload" size="md" />}
        label="이미지 불러오기"
        sub="갤러리에서 이미지를 선택해요"
        onClick={() => {}}
      />
      <ListItem
        variant="box"
        icon={<Icon name="Pencil" size="md" />}
        label="이미지 직접 만들기"
        sub="캔버스에서 말풍선을 꾸며요"
        onClick={() => {}}
      />
    </div>
  ),
};
