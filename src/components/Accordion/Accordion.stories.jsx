import { useState } from 'react';
import Accordion from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
제목을 누르면 아래 내용이 열리는 칸. **글이 길어 한 번에 다 보여주면 훑기 어려운 자리**에 선다
(자주 묻는 질문, 가이드의 긴 설명).

**여러 칸을 늘어놓을 때**는 그냥 이어 붙인다. 칸마다 아래 선이 있어 붙이면 목록이 된다.
묶는 요소는 쓰는 쪽이 만들고, 맨 위 칸의 윗선이 필요하면 그 요소가 긋는다.
여러 칸이 동시에 열려도 된다 — 하나만 열리게 하려면 \`open\`을 밖에서 쥔다.

**내용은 닫혀 있어도 DOM에 남는다.** \`hidden\`으로 감출 뿐이라 검색 엔진이 읽는다.
자주 묻는 질문처럼 그 글이 검색에 걸려야 하는 자리가 있어서 그렇게 정했다(2026-09-22).

**여는 표시는 +다.** 열리면 세로줄이 사라져 -가 된다. 화살표를 돌리는 것보다
지금 상태가 무엇인지 한눈에 갈린다.

**크기는 둘이다.** 기본 \`md\`는 질문이 몇 개뿐이고 본문으로 읽히는 자리에 쓴다.
\`sm\`은 페이지 맨 아래 푸터처럼 질문이 많이 쌓이는 곳이나 본문 곁의 보조 안내에 쓴다(2026-11-26).
제목은 text-label-sm, 내용은 text-body-sm, 위아래 여백은 spacing-3, +는 16px로 줄어든다.
한 목록 안에서는 크기를 섞지 않는다.

**쓰지 않는 곳**: 눌러서 다른 화면으로 가는 것. 그건 ListItem이나 링크다.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
};

export const Default = {
  name: '기본',
  args: { title: '테마는 몇 개까지 저장할 수 있나요', children: '계정 하나에 3개까지 저장할 수 있어요.' },
};

export const Opened = {
  name: '열린 것',
  args: { title: '로그인을 꼭 해야 하나요', defaultOpen: true, children: '아니요. 만들고 내보내는 기능은 로그인 없이 쓸 수 있어요.' },
};

export const List = {
  name: '이어 붙인 목록',
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Accordion title="사이트 이용은 무료인가요">네, 무료예요.</Accordion>
      <Accordion title="만든 테마를 공유해도 되나요">네, 공유와 유료 판매 모두 가능해요.</Accordion>
      <Accordion title="테마는 몇 개까지 저장할 수 있나요">계정 하나에 3개까지 저장할 수 있어요.</Accordion>
    </div>
  ),
};

export const Small = {
  name: '작은 크기(sm)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Accordion size="sm" title="사이트 이용은 무료인가요">네, 무료예요.</Accordion>
      <Accordion size="sm" title="만든 테마를 공유해도 되나요">네, 공유와 유료 판매 모두 가능해요.</Accordion>
      <Accordion size="sm" title="테마는 몇 개까지 저장할 수 있나요" defaultOpen>계정 하나에 3개까지 저장할 수 있어요.</Accordion>
      <Accordion size="sm" title="아이폰은 어떻게 적용하나요">완료 화면에 나오는 순서대로 따라 하면 돼요.</Accordion>
      <Accordion size="sm" title="다운로드 창이 안 떠요">휴대폰의 파일 앱에서 받은 파일을 살펴봐주세요.</Accordion>
    </div>
  ),
};

export const OnlyOne = {
  name: '하나만 열기',
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(0);
    const items = ['아이폰은 어떻게 적용하나요', '갤럭시는 어떻게 적용하나요', '파일이 안 보여요'];
    return (
      <div>
        {items.map((t, i) => (
          <Accordion key={t} title={t} open={open === i} onToggle={(next) => setOpen(next ? i : -1)}>
            {t}에 대한 답이 여기 들어간다.
          </Accordion>
        ))}
      </div>
    );
  },
};
