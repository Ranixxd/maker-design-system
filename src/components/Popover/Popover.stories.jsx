import Popover from './Popover';
import MenuItem from '../MenuItem/MenuItem';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        /* 여러 줄 그대로 쓴다 — 마크다운은 빈 줄로 문단을 나누므로
           템플릿 리터럴의 진짜 줄바꿈이 그대로 맞는다 */
        component: `누른 것 옆에 붙어 뜨는 작은 패널. 바깥을 누르거나 Esc를 치면 닫히고,
닫힐 때 포커스가 트리거로 돌아온다.

화면을 덮고 집중을 가져가야 하면 LayerPopup을 쓴다. Popover는 잠깐 고르고 마는 일에 쓴다.

ARIA의 menu role을 붙이지 않는다 — 그것은 화살표 키 이동까지가 약속인데, 하지 않으면서
이름만 붙이면 화면 낭독기를 쓰는 사람이 되지 않는 조작을 안내받는다.

### side·align은 희망이지 확정이 아니다

연 뒤에 실제로 재서, 화면 밖으로 나가면 스스로 밀어 넣고 위아래를 뒤집는다. 부르는 쪽이
트리거가 화면 어디에 있는지까지 계산해서 넘길 수는 없다 — 같은 헤더라도 화면이 좁아지면
트리거가 끝에 붙기 때문이다.

### 안에 무엇을 담나

MenuItem만 담는 자리가 아니다. 아래 "계정 메뉴"처럼 글과 버튼을 섞어도 된다.

**성격이 다른 기능을 나눌 때는 Divider를 섞어 쓸 수 있다.** "지금 누구인지"를 적어둔
줄과 "누르면 무슨 일이 일어나는" 줄처럼, 종류가 다른 것이 한 패널에 있을 때 선 하나로
갈라 준다.

**다만 줄이 적으면 굳이 나누지 않는다.** 두세 줄뿐인 패널에 선을 그으면 나뉜 무리가
줄보다 많아 보인다. 배경화면 메이커의 계정 메뉴가 그래서 선을 걷어냈다(2026-09-06) —
닉네임과 로그아웃 둘뿐이라 선이 없어도 종류가 다른 것이 읽힌다.

같은 종류의 줄 사이에도 두지 않는다. 나눌 것이 없는데 선을 그으면 무리가 몇 개인지
세게 만든다.`,
      },
    },
  },
  argTypes: {
    side:  { control: 'radio', options: ['bottom', 'top'] },
    align: { control: 'radio', options: ['start', 'end'] },
  },
};

export const Default = {
  args: { side: 'bottom', align: 'end' },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
      <Popover
        {...args}
        label="더보기"
        trigger={<IconButton icon="MoreHorizontal" aria-label="더보기" />}
      >
        {/* 둘뿐이라 아이콘을 달지 않는다. 초기화는 화면 안에서 끝나는 일이라
            critical도 아니다 — 둘 다 MenuItem 문서의 규칙 */}
        {(close) => (
          <>
            <MenuItem label="이름 바꾸기" onClick={close} />
            <MenuItem label="초기화" onClick={close} />
          </>
        )}
      </Popover>
    </div>
  ),
};

/* 메뉴만 담는 자리가 아니다 — 글과 버튼을 섞어도 된다 */
export const 계정메뉴 = {
  name: '계정 메뉴 (섞어 쓰기)',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 80 }}>
      <Popover
        label="내 계정"
        align="end"
        trigger={<IconButton icon="User" aria-label="내 계정" />}
      >
        {(close) => (
          /* 배경화면 메이커의 UserMenu와 같은 짜임 — 글자 시작점이 두 줄에서
             어긋나지 않는지 여기서 본다. 메뉴 줄에 아이콘을 달면 그만큼 밀린다 */
          <div style={{ minWidth: 176 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginInline: 4, paddingInline: 12 }}>
              <span className="text-label-md" style={{ flex: 1, color: 'var(--color-text-secondary)' }}>바다코끼리</span>
              <IconButton icon="Pencil" size="sm" aria-label="닉네임 바꾸기" onClick={close} />
            </div>
            <MenuItem label="로그아웃" onClick={close} />
          </div>
        )}
      </Popover>
    </div>
  ),
};

export const 위로펴기 = {
  name: '위로 펴기 (하단 바)',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', paddingBlockStart: 160, paddingBlockEnd: 16 }}>
      <Popover side="top" align="end" label="더보기" trigger={<Button variant="neutral">더보기</Button>}>
        {(close) => <MenuItem label="배경화면 초기화" onClick={close} />}
      </Popover>
    </div>
  ),
};

/* 화면 밖으로 나가는 자리를 일부러 만든다 — 트리거가 왼쪽 끝인데 align='end'면
   패널이 왼쪽 밖으로 흘러 잘린다. 실제로 좁은 화면의 헤더에서 그렇게 잘렸다.
   Popover가 열린 뒤 재서 밀어 넣는지 여기서 본다 */
export const 화면밖보정 = {
  name: '화면 밖으로 나갈 때 (자동 보정)',
  parameters: { docs: { description: { story: 'align은 희망이지 확정이 아니다. 트리거가 화면 끝에 붙어 있으면 패널이 밖으로 나가는데, 연 뒤에 재서 8px 안쪽으로 밀어 넣는다. 세로로 넘칠 때는 밀지 않고 뒤집는다 — 밀면 트리거를 가려 무엇을 눌러 열었는지 잃는다.' } } },
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 0' }}>
      <Popover label="왼쪽 끝" align="end" trigger={<IconButton icon="User" size="sm" aria-label="왼쪽 끝" />}>
        {(close) => <MenuItem label="왼쪽 끝인데 align=end" onClick={close} />}
      </Popover>
      <Popover label="오른쪽 끝" align="start" trigger={<IconButton icon="User" size="sm" aria-label="오른쪽 끝" />}>
        {(close) => <MenuItem label="오른쪽 끝인데 align=start" onClick={close} />}
      </Popover>
    </div>
  ),
};
