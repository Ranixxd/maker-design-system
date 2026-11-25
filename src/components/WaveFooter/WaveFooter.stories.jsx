import WaveFooter from './WaveFooter';
import Disclosure from '../Disclosure';

export default {
  title: 'Components/WaveFooter',
  component: WaveFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
페이지 맨 아래에 서는 읽을 글 칸. 위 경계가 큰 물결이고 뮤트 바탕(bg-tertiary)이 페이지 끝까지 깔린다.
**페이지의 할 일을 다 본 뒤 더 알고 싶은 사람이 읽는 긴 글**(소개, 쓰는 법, 자주 묻는 질문)을 둔다.
페이지마다 맨 아래 하나만 둔다.

**부품은 틀과 글 모양만 맡는다.** 글은 \`children\`으로 바로 넣는다.
소제목은 \`h2\`(또는 \`h3\`)에 \`text-heading-xs\` 클래스, 문단은 \`p\`, 목록은 \`ul\`, 링크는 \`a\`다.
글 사이는 spacing-3, 소제목 위는 spacing-5를 더 띄운다. 글은 text-body-md·text-secondary, 소제목은 text-default다.
글 사이의 링크는 밑줄 없이 text-link 색으로만 드러낸다. 글은 굵게를 쓰지 않는다.

**글 아래 맨 끝에 서는 것**(링크 줄 등)은 \`bottom\`에 넣는다. 글과 spacing-8 떨어진다.

**물결과 바탕은 페이지 가로 끝까지 편다.** 부품은 가운데 정렬된 본문 틀 안에 둔다.
기준 폭은 body다. 안에서 스크롤되는 틀 속에 둘 때는 그 틀에 \`container-type: inline-size\`를 준다.

**쓰지 않는 곳**: 페이지 중간의 영역 나눔(Divider나 면으로 가른다), 버튼이나 할 일이 있는 칸.
        `,
      },
    },
  },
};

const Page = ({ children }) => (
  <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 var(--spacing-4)' }}>
    <div className="text-body-md" style={{ padding: 'var(--spacing-10) 0', color: 'var(--color-text-default)' }}>페이지 본문</div>
    {children}
  </div>
);

const Bottom = () => (
  <div className="text-label-xs" style={{ display: 'flex', gap: 'var(--spacing-4)', color: 'var(--color-text-tertiary)' }}>
    <span>링크 하나</span><span>링크 둘</span><span>링크 셋</span>
  </div>
);

export const Default = {
  name: '기본',
  render: () => (
    <Page>
      <WaveFooter bottom={<Bottom />}>
        <h2 className="text-heading-xs">이 페이지는 무엇을 하나요</h2>
        <p>여기에 페이지를 소개하는 글이 들어간다. 글은 본문 폭에 서고, 물결과 바탕만 페이지 끝까지 펴진다.</p>
        <h2 className="text-heading-xs">이렇게 써요</h2>
        <ul>
          <li>목록은 왼쪽을 spacing-5 들이고 줄 사이를 spacing-1 띄운다.</li>
          <li>글 사이의 <a href="#">링크</a>는 밑줄 없이 링크 색으로만 드러난다.</li>
        </ul>
        <p>문단끼리는 spacing-3 떨어진다.</p>
      </WaveFooter>
    </Page>
  ),
};

export const WithDisclosure = {
  name: '자주 묻는 질문을 넣은 것',
  render: () => (
    <Page>
      <WaveFooter bottom={<Bottom />}>
        <h2 className="text-heading-xs">자주 묻는 질문</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
          <Disclosure title="첫 번째 질문">첫 번째 답이 들어간다.</Disclosure>
          <Disclosure title="두 번째 질문">두 번째 답이 들어간다.</Disclosure>
          <Disclosure title="세 번째 질문">세 번째 답이 들어간다.</Disclosure>
        </div>
      </WaveFooter>
    </Page>
  ),
};
