import DocPage, { DocSection } from './DocPage';
import Accordion from '../Accordion/Accordion';
import SearchField from '../SearchField/SearchField';

export default {
  title: 'Components/DocPage',
  component: DocPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
글을 읽는 페이지의 틀. 제목 하나, 그 아래 도구 줄, 섹션들이 쌓이는 모양이다
(자주 묻는 질문, 의견 보내기, 방침, 약관).

**이 틀이 간격을 정한다.** 쓰는 쪽은 \`margin\`을 적지 않는다. 제목 아래 20px,
도구 줄 아래 48px, 섹션 사이 48px, 섹션 제목 아래 8px이다. 페이지마다 손으로 적으면
장마다 값이 어긋난다. 2026-09-22 자주 묻는 질문을 옮기며 제목 아래 여백이 통째로
빠진 채 나갔던 일이 있어 틀로 묶었다.

**헤더는 밖에서 넘긴다**(\`header\`). 서비스마다 헤더가 다르고, 부품이 앱의 헤더를
부르면 거꾸로 매달린다.

**본문 글의 모양은 이 틀이 정하지 않는다.** 문단·목록·표는 쓰는 쪽 CSS가 맡는다.
이 틀은 쌓는 자리와 간격만 본다.

**본문을 통째로 받는 경우**(법적 문서처럼 글을 손대면 안 되는 페이지)는 `DocSection` 하나에
그대로 넣어도 된다. 그때는 조항 사이 간격을 쓰는 쪽 CSS가 맡는다. 틀이 지키는 것은
**제목과 본문 사이**이고, 그 값이 장마다 같으면 된다(2026-09-22 약관·방침).
        `,
      },
    },
  },
};

const 헤더 = <div style={{ height: 48, borderBottom: '1px solid var(--color-border-subtle)' }} />;

export const Default = {
  name: '기본',
  render: () => (
    <DocPage header={헤더} title="자주 묻는 질문" tools={<SearchField placeholder="궁금한 것을 찾아보세요" aria-label="질문 찾기" />}>
      <DocSection title="테마 다운·적용">
        <Accordion title="테마를 만들었는데 내 폰에 적용하는 방법을 모르겠어요">테마 내보내기를 누르고 적용할 폰을 고른다.</Accordion>
        <Accordion title="테마를 내보냈는데 다운로드창이 안 떠요">앱 안 브라우저에서 막힐 수 있다.</Accordion>
      </DocSection>
      <DocSection title="로그인·저장·탈퇴">
        <Accordion title="로그인을 꼭 해야 하나요">아니요. 만들고 내보내는 기능은 로그인 없이 쓸 수 있다.</Accordion>
      </DocSection>
    </DocPage>
  ),
};

export const NoTools = {
  name: '도구 줄 없이',
  render: () => (
    <DocPage header={헤더} title="이용약관">
      <DocSection>
        <p>도구 줄과 섹션 제목은 없어도 된다. 글만 있는 페이지는 이 모양이다.</p>
      </DocSection>
    </DocPage>
  ),
};
