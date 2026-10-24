import LinkBanner, { linkBannerClip } from './LinkBanner';

export default {
  title: 'Components/LinkBanner',
  component: LinkBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
화면 안에서 다른 곳으로 보내는 한 줄 띠(2026-10-19). 회색 면(\`bg-tertiary\`)에 \`text-label-xs\` 기본색 글, 오른쪽 끝에 \`>\`.

**쓰는 곳**
- 출처로 보낼 때: 템플릿 상세의 "○○님의 ○○ 테마를 활용했어요"

**규칙**
- \`href\`가 있으면 링크, \`onClick\`만 있으면 단추다. 띠 전체를 누른다.
- 둘 다 없으면 갈 곳이 없는 띠다. \`>\`를 그리지 않는다. 원작 글이 지워져 이름만 남았을 때처럼, 같은 자리에 같은 모양으로 알리기만 할 때 쓴다.
- 한 줄 가득 선다. 위아래 간격은 쓰는 쪽이 정한다. 부품은 바깥 여백(margin)을 갖지 않아 쓰는 쪽 margin이 CSS 순서와 상관없이 그대로 선다.
- 글은 한 줄이다. 넘칠 수 있는 조각만 \`linkBannerClip\`으로 감싼다. 그 조각만 말줄임되고, 감싸지 않은 앞뒤 글(이름, "테마를 활용했어요")은 잘리지 않는다.
- 아무것도 감싸지 않은 긴 글은 말줄임 없이 잘린다. 길어질 수 있는 글이면 반드시 한 조각을 감싼다.
- 강조할 자리가 아니라서 강조색을 쓰지 않는다.
        `,
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

export const Link = {
  name: '링크',
  args: { href: '#', children: '배경 만들기를 자세히 알고 싶다면?' },
};

export const Clip = {
  name: '한 조각만 말줄임',
  render: () => (
    <LinkBanner onClick={() => {}}>
      도토리님의 <span className={linkBannerClip}>봄날의 산책길에서 만난 작은 고양이와 벚꽃</span> 테마를 활용했어요
    </LinkBanner>
  ),
};

export const Static = {
  name: '갈 곳이 없을 때',
  args: { children: '도토리님의 테마를 활용했어요' },
};
