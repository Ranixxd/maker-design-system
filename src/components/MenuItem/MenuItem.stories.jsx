import MenuItem from './MenuItem';

export default {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        /* 여러 줄 그대로 쓴다 — 마크다운은 빈 줄로 문단을 나누므로
           템플릿 리터럴의 진짜 줄바꿈이 그대로 맞는다 */
        component: `Popover 안에 들어가는 짧은 줄.

ListItem과 겹쳐 보이지만 자리가 다르다 — ListItem은 화면을 채우는 목록의 한 줄이라
부제를 달고 여백이 넉넉하고, MenuItem은 이미 열려 있는 작은 패널 안이라 낮고 좁다.
목록용을 팝오버에 쓰면 팝오버가 의도보다 커진다.

레이블은 \`text-label-1\`이다. 읽는 글이 아니라 누르는 것의 이름이고, 한 줄로
끝나므로 행간도 single이 맞다.

### 아이콘은 언제 다나

**한 무리에 기능이 넷 이상 모일 때만 단다.** 그때는 글자만으로 훑기 어려워
아이콘이 서로를 가려내는 표가 된다.

**셋 이하의 단순한 무리에는 달지 않아도 된다.** 오히려 글자가 아이콘 폭만큼
밀려, 같은 패널 안의 다른 줄과 왼쪽이 어긋난다.

### critical은 언제 쓰나

**DB의 데이터가 지워질 만큼 파괴적인 일에만 쓴다.** 되돌릴 수 있거나 화면
안에서만 끝나는 일(초기화, 로그아웃, 닫기)에는 쓰지 않는다. 아무 데나 붉히면
정작 지우는 자리에서 붉은색이 눈에 안 들어온다.

critical은 **글자와 아이콘만** 붉다. hover 배경은 일반과 같다 — 손이 지나가다
얹히는 것만으로 경고가 켜지면 정작 누를 때의 무게가 닳는다.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['normal', 'critical'] },
    icon: { control: 'text' },
  },
  decorators: [
    (Story) => (
      /* 실제로 놓이는 자리를 흉내낸다 — 패널 안이라야 폭과 여백이 제대로 보인다 */
      <div style={{
        minWidth: 180, padding: 4, borderRadius: 12,
        background: 'var(--color-bg-default)',
        boxShadow: 'var(--shadow-overlay)',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = { args: { label: '로그아웃' } };
export const 아이콘 = { name: '아이콘', args: { label: '내려받기', icon: 'Download' } };

/* DB에서 지워지는 일이라 critical이 맞는 자리다 */
export const Critical = { args: { label: '계정 지우기', icon: 'Trash2', variant: 'critical' } };

export const Disabled = { args: { label: '내려받기', icon: 'Download', disabled: true } };

/* 넷이 모였으니 아이콘을 단다 — 글자만으로는 훑기 어려운 개수다 */
export const 넷이상 = {
  name: '넷 이상 — 아이콘을 단다',
  render: () => (
    <>
      <MenuItem label="이름 바꾸기" icon="Pencil" />
      <MenuItem label="내려받기" icon="Download" />
      <MenuItem label="복제하기" icon="Plus" />
      <MenuItem label="계정 지우기" icon="Trash2" variant="critical" />
    </>
  ),
};

/* 둘뿐이라 아이콘이 필요 없다. 달면 글자가 밀려 위아래가 어긋나기만 한다 */
export const 셋이하 = {
  name: '셋 이하 — 아이콘 없이',
  render: () => (
    <>
      <MenuItem label="이름 바꾸기" />
      <MenuItem label="로그아웃" />
    </>
  ),
};
