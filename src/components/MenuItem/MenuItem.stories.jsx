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

레이블은 label이다 — 읽는 글이 아니라 누르는 것의 이름이고, 한 줄로 끝나므로
행간도 single이 맞다. \`md\`는 \`text-label-md\`(15px), 서랍용 \`lg\`는
\`text-label-lg\`(17px)를 쓴다.

### 앞 아이콘은 달지 않는다 (2026-10-27)

덕꾸 앱과 같게 글자만 둔다. 고를 것이 그림이면(말풍선 썸네일, 배경 비율 상자) 그 그림만 \`leading\`에 둔다.

### 여백과 눌림 (md)

md 줄은 좌우 여백도 눌림·hover 면도 없다. 글자가 패널의 본문 여백 선(Popover 좌우 20)에 그대로 선다.
줄마다 밖으로 빼거나 들이지 않는다. 위아래 12, 줄 높이는 적어도 48.
서랍의 lg 줄은 예전처럼 4px 물러난 둥근 면이 hover·눌림 때 어두워진다.

### 이름에 딸린 것 (sub)

날짜처럼 이름에 딸린 것은 끝(trailing)이 아니라 \`sub\`로 이름 아래에 둔다(\`text-label-sm\` secondary).

### 링크 줄 (href)

다른 페이지로 가는 줄은 \`href\`를 준다. 단추가 아니라 링크(a)로 그려져 새 탭으로 열기·주소 복사가 된다.
모양은 단추 줄과 같다. 서랍 메뉴처럼 목적지가 여럿인 곳에 쓴다.

### subtle은 언제 쓰나

**자주 찾지 않는 줄을 한 무리로 낮출 때** 쓴다(이용약관, 개인정보처리방침, 로그아웃). 글자만 옅어진다.

### critical은 언제 쓰나

**DB의 데이터가 지워질 만큼 파괴적인 일에만 쓴다.** 되돌릴 수 있거나 화면
안에서만 끝나는 일(초기화, 로그아웃, 닫기)에는 쓰지 않는다. 아무 데나 붉히면
정작 지우는 자리에서 붉은색이 눈에 안 들어온다.

critical은 **글자만** 붉다. 배경까지 붉히면 정작 누를 때의 무게가 닳는다.

`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['normal', 'critical'] },
  },
  decorators: [
    (Story) => (
      /* 실제로 놓이는 자리를 흉내낸다 — 패널 안이라야 폭과 여백이 제대로 보인다 */
      <div style={{
        minWidth: 180, padding: '4px 20px', borderRadius: 12,
        background: 'var(--color-bg-default)',
        boxShadow: 'var(--shadow-overlay)',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = { args: { label: '로그아웃' } };
/* 날짜처럼 이름에 딸린 것은 이름 아래에 */
export const Sub = { name: '이름 아래 날짜', args: { label: '봄 테마', sub: '10월 27일' } };

/* DB에서 지워지는 일이라 critical이 맞는 자리다 */
export const Critical = { args: { label: '계정 지우기', variant: 'critical' } };

export const Disabled = { args: { label: '내려받기', disabled: true } };

/* 고를 것이 그림이면 그 그림만 앞에 둔다. 아이콘은 두지 않는다 */
export const 그림 = {
  name: '고를 것이 그림일 때',
  render: () => (
    <>
      <MenuItem label="정사각형" trailing="1:1"
        leading={<span style={{ width: 20, height: 20, border: '1.5px solid var(--color-border-strong)', borderRadius: 2 }} />} />
      <MenuItem label="와이드" trailing="16:9"
        leading={<span style={{ width: 28, height: 16, border: '1.5px solid var(--color-border-strong)', borderRadius: 2 }} />} />
    </>
  ),
};
export const Sizes = {
  name: '크기',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: 260 }}>
      <div>
        <p className="text-label-xs" style={{ margin: '0 0 4px', color: 'var(--color-text-secondary)' }}>
          md — 곁에 붙어 뜬 팝오버 안
        </p>
        <MenuItem label="배경화면 초기화" />
      </div>
      <div>
        <p className="text-label-xs" style={{ margin: '0 0 4px', color: 'var(--color-text-secondary)' }}>
          lg — 화면을 덮는 서랍 안
        </p>
        <MenuItem label="카톡테마 만들기" size="lg" />
      </div>
    </div>
  ),
};
