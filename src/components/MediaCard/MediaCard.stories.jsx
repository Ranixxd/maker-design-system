import MediaCard from './MediaCard';

export default {
  title: 'Components/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
그림 한 장이 주인공인 목록 카드. 배경화면 목록, 공식·유저 템플릿 목록이 이 한 벌을 나눠 쓴다.

**테두리도 그림자도 없다.** 그림이 배경에서 붕 뜨지 않아야 하고, 목록에서 눈에 들어와야 하는 것은
테두리가 아니라 그림이다. 모서리만 \`radius-xl\`로 둥글린다.

| prop | 쓰는 법 |
|---|---|
| \`ratio\` | 그림 비율. 배경화면 \`2 / 3\`, 테마 목록 \`4 / 5\`. 목록의 인상을 정하는 값이라 쓰는 쪽이 정한다 |
| \`lines\` | 제목을 몇 줄까지 보일지. \`1\`이면 한 줄 말줄임 |
| \`badge\` | 그림 왼쪽 위에 얹는 표(오늘 올라왔어요 점 등) |
| \`meta\` | 제목 아래 줄(좋아요·이어 만든 수, 작성자 등) |
| \`href\` | 카드가 가리키는 페이지 주소. **꼭 준다.** 카드는 늘 링크(a)다. 크롤러가 목록에서 그 페이지로 따라간다 |
| \`onOpen\` | 그냥 누를 때 페이지를 새로 열지 않고 같은 화면에서 연다(목록 위 상세 등). 새 탭 열기(Ctrl·⌘·Shift·Alt, 가운데 단추)와 꾹 눌러 주소 복사는 링크대로 간다. 없으면 주소로 간다 |

**단추 카드는 없다**(2026-10-23 사용자). 전에는 \`onClick\`만 주면 단추였다. 쓰는 곳이 모두 제 주소를 가진 링크가 되어 걷었다.
제 주소가 없는 것을 카드로 늘어놓을 일이 생기면, 단추로 되살리기 전에 그것에 주소를 줄 수 있는지부터 본다.
쓰는 쪽이 \`onClickCapture\`로 클릭을 가로채던 것도 \`onOpen\`으로 옮긴다.

**감싸는 쪽이 지킬 것**
격자는 쓰는 쪽이 만든다. \`grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))\`에
\`align-items: start\`를 준다. 빼면 한 줄뿐일 때 카드가 남은 높이까지 늘어나 빈 자리가 눌린다.
        `,
      },
    },
  },
  argTypes: {
    ratio: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 3 } },
  },
};

const 그림 = 'https://placehold.co/400x500/f5f5f5/999?text=theme';

export const Default = {
  name: '기본',
  args: { src: 그림, title: '곰인형이 되.', ratio: '4 / 5', lines: 2, href: '#' },
  decorators: [(Story) => <div style={{ width: 180 }}><Story /></div>],
};

export const WithMeta = {
  name: '지표가 붙은 것',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 180 }}>
      <MediaCard
        src={그림}
        href="#"
        title="여기가 헤네시스인지 카톡인지"
        ratio="4 / 5"
        meta={<span className="text-label-sm">❤️ 12 · 📥 34</span>}
      />
    </div>
  ),
};

export const Grid = {
  name: '목록',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      alignItems: 'start', gap: 'var(--spacing-4)' }}>
      {['곰인형이 되.', '여기가 헤네시스인지 카톡인지', '난 수련회 안 가'].map((t) => (
        <MediaCard key={t} src={그림} href="#" title={t} ratio="4 / 5"
          meta={<span className="text-label-sm">❤️ 3 · 📥 8</span>} />
      ))}
    </div>
  ),
};
