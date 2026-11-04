import PaletteStrip from './PaletteStrip';
import MediaCard from '../MediaCard';

export default {
  title: 'Components/PaletteStrip',
  component: PaletteStrip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
그림에 쓴 색을 같은 폭의 칸으로 나란히 늘어놓은 띠(2026-11-03 사용자). 그림 아래에 붙어 그 그림의 색 조합을 보인다.
아트 포스터 아래 색 견본처럼, 그림과 색 조합을 한 덩이로 읽게 하는 것이 목표다.

| prop | 쓰는 법 |
|---|---|
| \`colors\` | \`'#RRGGBB'\` 목록. 앞에서부터 왼쪽에 선다. 비면 아무것도 그리지 않는다 |
| \`size\` | \`sm\` 목록 카드 아래 얇은 띠(12px, 글자 없음). \`lg\` 글 페이지의 포스터 띠(128px) |
| \`codes\` | 칸마다 색 코드를 세로로 적는다(칸 왼쪽 아래에서 12px). 글자는 타이포 역할을 따르지 않는다: 도트 글꼴 갈무리14(\`Galmuri14\`) 15px, 굵기 400, 자간 0, 칸 밝기에 따라 불투명한 검정·흰색(2026-11-05 사용자). **글꼴 파일은 쓰는 쪽이 \`@font-face\`로 받는다**(카톡테마 메이커는 \`/fonts/Galmuri14-hex.woff2\`, 색 코드 글자만 잘라 1.4KB). 안 받으면 고정폭 글꼴로 선다. **\`lg\`에서만 쓴다** |
| \`onPick\` | \`codes\`와 함께 주면 칸이 단추가 되고, 누르면 그 칸의 코드(\`#RRGGBB\`, 대문자)를 넘긴다. 낭독기는 "#F2C230 복사"로 읽는다. **복사와 알림(토스트 "색상 코드가 복사됐어요.")은 쓰는 쪽이 한다** — 복사 방식은 브라우저마다 달라 서비스가 이미 가진 것을 쓴다 |
| \`label\` | 낭독기가 읽는 띠 이름. 기본 "사용한 색" |

**칸은 모두 같은 폭이다.** 색 하나가 넓으면 그 색이 주인공처럼 읽힌다.

**칸의 색은 사용자가 고른 그림 내용이다.** 토큰이 아니고 테마를 따라 바뀌지 않는다. 색 코드 글자도 칸 밝기를 보고 검정·흰색 중에서 고른다.

**감싸는 쪽이 지킬 것**
- 띠는 모서리도 테두리도 없다. 그림과 한 덩이로 보이도록 감싸는 쪽이 그림과 띠를 한 틀에 넣고 그 틀에 모서리·테두리를 준다
- 목록 카드에서는 \`MediaCard\`의 \`strip\`에 넘긴다. 카드가 그림 틀 아래 끝에 붙인다
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'lg'] },
  },
};

const 다섯 = ['#F2C230', '#F2921D', '#F24F13', '#8082A6', '#46334F'];

export const Small = {
  name: '목록 띠(sm)',
  args: { colors: 다섯, size: 'sm' },
  decorators: [(Story) => <div style={{ width: 180 }}><Story /></div>],
};

export const Poster = {
  name: '포스터 띠(lg, 색 코드)',
  args: { colors: 다섯, size: 'lg', codes: true, onPick: () => {} },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const OnCard = {
  name: '목록 카드 아래',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 180 }}>
      <MediaCard src="https://placehold.co/400x600/8082A6/fff?text=wallpaper" href="#" ratio="2 / 3"
        title="노을 안경" titleClass="text-label-sm" lines={1}
        strip={<PaletteStrip colors={다섯} />} />
    </div>
  ),
};
