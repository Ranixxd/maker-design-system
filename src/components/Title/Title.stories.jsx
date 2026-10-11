import Title from './Title';

export default {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
제목 한 줄. 페이지 맨 위, 창 머리, 본문 중간 구역 어디에나 선다.
자리가 아니라 역할로 부르는 이름이라 Header·Top이 아니라 Title이다.

**size**
| 값 | 글자 | 쓰는 곳 |
|---|---|---|
| \`lg\` | text-heading-md 24px | 페이지 머리 (템플릿 페이지 등) |
| \`md\` | text-heading-sm 20px | 본문 큰 제목 |
| \`sm\` | text-heading-xs 15px | 창 머리(LayerPopup, 2026-09-18 md에서 내림), 본문 안 작은 제목 (말풍선 만들기 1단계 등) |

**조합**
- \`icon\`: 제목 글자 바로 옆 아이콘 단추(neutral-weak). 도움말(?)처럼 제목에 딸린 것. lg·md 제목은 48px(아이콘 24px), sm 제목은 36px(아이콘 20px)
  도움말 내용은 누르면 LayerPopup으로 연다. icon은 단추 속성만 받아 Popover를 달 수 없다. 옆에 단추를 따로 세우면 제목 줄 높이가 48px로 커져 같은 머리끼리 자리가 어긋난다(2026-09-24, 카톡테마 메이커 템플릿·냉장고 페이지 머리)
- \`action\`: 제목 바로 옆 글자 단추(secondary sm). 제목과 한 묶음인 동작(말풍선 복붙)
- \`description\`: 제목 아래 설명 한 줄(text-body-sm, text-secondary). 페이지 머리의 설명도 이것을 쓴다. 따로 15px로 그리지 않는다(2026-09-24)

icon과 action은 모양부터 달라 위계가 갈린다. 더 중요한 기능을 action에 둔다.

**Title에 넣지 않는 것**
페이지 머리 오른쪽 끝에 서는 단추(템플릿 페이지 [올리기] 등)는 제목과 묶이지 않는 별도 요소다. Title 밖에서 쓰는 쪽이 배치한다.

**가운데 정렬 (align="center")**
제목 글자는 늘 정중앙이다. 아이콘은 글자 오른쪽에 매달리고 자리를 차지하지 않는다.
아이콘이 있고 없고에 따라 제목 위치가 흔들리지 않게 하려는 것이다. LayerPopup 머리가 이 정렬을 쓴다.
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    align: { control: 'radio', options: ['start', 'center'] },
    children: { control: 'text' },
    description: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
};

export const Default = { name: '기본', args: { children: '말풍선 만들기', size: 'md' } };

export const Sizes = {
  name: '크기',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Title size="lg">템플릿</Title>
      <Title size="md">말풍선 만들기</Title>
      <Title size="sm">1단계</Title>
    </div>
  ),
};

export const WithIcon = {
  name: '아이콘',
  args: { children: '말풍선 만들기', icon: { icon: 'CircleHelp', 'aria-label': '말풍선 만들기 QnA' } },
};

export const WithAction = {
  name: '단추',
  args: { children: '1단계', size: 'sm', action: { label: '말풍선 복붙💬', onClick: () => {} } },
};

export const WithDescription = {
  name: '설명',
  args: { children: '템플릿', size: 'lg', description: '다른 사람이 만든 테마를 가져와 고쳐 써요.' },
};

export const Center = {
  name: '가운데 정렬',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Title align="center">테마 보관</Title>
      <Title align="center" icon={{ icon: 'CircleHelp', 'aria-label': '도움말' }}>말풍선 만들기</Title>
    </div>
  ),
};
