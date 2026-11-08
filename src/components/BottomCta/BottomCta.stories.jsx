import Button from '../Button';
import BottomCta from './BottomCta';

export default {
  title: 'Components/BottomCta',
  component: BottomCta,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
하단 고정형 버튼(2026-11-03 사용자). 글 상세(유저 템플릿·공식 템플릿·배경화면 자랑) 바닥에 붙어 그 글로 할 일을 받는다.
세 상세가 저마다 단추 줄을 그려 좋아요 단추의 톤과 크기가 갈렸다. 이 한 벌로 묶는다.

| prop | 쓰는 법 |
|---|---|
| \`children\` | 주 단추. **\`Button primary\` 하나**. 남은 폭을 다 쓴다. 안 주면 좋아요 단추 하나만 제 크기로 왼쪽에 선다(그 글로 할 일이 좋아요뿐일 때) |
| \`like\` | 주면 주 단추 왼쪽에 좋아요 단추가 선다. \`{ pressed, onClick, ref, icon }\`. \`icon\`은 단추 안 그림(\`<img>\`)이고 안 주면 ❤️다. 그림은 높이 36px(단추 높이 안에서 가장 크게), 너비는 비율대로. 숫자는 넣지 않는다. 숫자는 글의 지표 줄(\`PostMeta\` \`stats\`)에 둔다 |
| \`position\` | \`fixed\` 페이지가 구르는 화면. \`sticky\` 제 칸이 구르는 화면에서 그 칸 맨 끝에 둔다 |
| \`width\`·\`gutter\` | 단추 줄이 맞출 본문 줄 너비와 좌우 여백(px). 단추 가장자리가 본문 가장자리와 같은 선에 선다. 기본 488·16(520px 글 줄에서 좌우 16을 뺀 폭) |

**좋아요 단추는 \`neutral\`이다.** 면 없이 하트 그림만 선다. 주 단추보다 눈에 띄면 안 된다. 이모지는 그림 크기(22px)로 키운다. 카톡테마 메이커·배경화면 메이커는 손그림 하트를 \`icon\`으로 넘긴다.

**줄**: 위로 옅은 그늘 한 줄(글이 단추 밑으로 사라지는 경계), 바탕 \`bg-default\`, 위아래 12px에 기기 아래 안전 영역을 더한다. 단추는 md(48)이다.

**감싸는 쪽이 지킬 것**
- \`fixed\`면 본문 아래에 단추 줄 높이(72px 남짓)만큼 여백을 둔다. 안 두면 마지막 글이 단추 밑에 깔린다
- 한 화면에 하나만 둔다
        `,
      },
    },
  },
};

export const Default = {
  name: '좋아요 + 주 단추',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ height: 160, position: 'relative', overflow: 'auto' }}>
      <div style={{ height: 240 }} />
      <BottomCta position="sticky" like={{ pressed: false, onClick: () => {} }}>
        <Button variant="primary">이 템플릿으로 테마 만들기</Button>
      </BottomCta>
    </div>
  ),
};

export const Liked = {
  name: '좋아요를 누른 뒤',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ height: 160, position: 'relative', overflow: 'auto' }}>
      <div style={{ height: 240 }} />
      <BottomCta position="sticky" like={{ pressed: true, onClick: () => {} }}>
        <Button variant="primary">이 템플릿으로 테마 만들기</Button>
      </BottomCta>
    </div>
  ),
};

export const LikeOnly = {
  name: '좋아요만',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ height: 160, position: 'relative', overflow: 'auto' }}>
      <div style={{ height: 240 }} />
      <BottomCta position="sticky" like={{ pressed: false, onClick: () => {} }} />
    </div>
  ),
};
