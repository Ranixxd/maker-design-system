import Disclosure from './Disclosure';

export default {
  title: 'Components/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
글자 하나를 누르면 아래로 짧은 안내가 펼쳐지는 작은 토글. 앞의 ▸가 열리면 90도 돌아 ▾가 된다.
켜고 끄는 설정은 Switch다. 이것은 글을 펼칠 뿐이다.

**언제 쓰나**: 본문 곁에 붙는 보조 안내, 그리고 페이지 맨 아래 푸터처럼 질문이 많이 쌓이는 곳(2026-11-26).
**Accordion과 다른 점**: Accordion은 칸마다 선과 넓은 여백이 있는 본문 크기의 목록이고,
이것은 선 없이 글자 한 줄 크기로 선다. 질문이 몇 개뿐이고 그 자체가 읽을거리면 Accordion,
많이 쌓이거나 곁다리 안내면 이것을 쓴다. 한 목록 안에서 둘을 섞지 않는다.

**여러 개를 늘어놓을 때**는 감싸는 요소가 사이를 spacing-4로 띄운다.

**내용은 닫혀 있어도 DOM에 남는다.** details 안에 두어 검색 엔진이 읽는다.
안의 문단은 사이가 spacing-3으로 벌어진다.

**쓰지 않는 곳**: 눌러서 다른 화면으로 가는 것(링크), 켜고 끄는 것(Switch).
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
};

export const Default = {
  name: '기본',
  args: { title: '다운로드 창이 안 떠요', children: '휴대폰의 파일 앱에서 받은 파일을 살펴봐주세요.' },
};

export const Opened = {
  name: '열린 것',
  args: {
    title: '다운로드 창이 안 떠요',
    defaultOpen: true,
    children: (
      <>
        <p>휴대폰의 파일 앱에서 받은 파일을 살펴봐주세요.</p>
        <p>다른 앱 안에서 사이트를 열었다면 다운로드 창이 뜨지 않을 수 있어요. 크롬이나 사파리에서 열어주세요.</p>
      </>
    ),
  },
};

export const List = {
  name: '늘어놓은 목록',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
      <Disclosure title="사이트 이용은 무료인가요">네, 무료예요.</Disclosure>
      <Disclosure title="만든 테마를 공유해도 되나요">네, 공유와 유료 판매 모두 가능해요.</Disclosure>
      <Disclosure title="테마는 몇 개까지 저장할 수 있나요">계정 하나에 3개까지 저장할 수 있어요.</Disclosure>
      <Disclosure title="아이폰은 어떻게 적용하나요">완료 화면에 나오는 순서대로 따라 하면 돼요.</Disclosure>
    </div>
  ),
};
