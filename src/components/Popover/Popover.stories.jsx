import Popover from './Popover';
import MenuItem from '../MenuItem/MenuItem';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          '누른 것 옆에 붙어 뜨는 작은 패널. 바깥을 누르거나 Esc를 치면 닫히고, 닫힐 때 포커스가 트리거로 돌아간다.\n\n' +
          '화면을 덮고 집중을 가져가야 하면 LayerPopup을 쓴다. Popover는 잠깐 고르고 마는 일에 쓴다.\n\n' +
          '`role="menu"`를 붙이지 않는다 — ARIA의 menu는 화살표 키 이동까지가 약속인데, 그것을 하지 않으면서 ' +
          '이름만 붙이면 화면 낭독기를 쓰는 사람이 되지 않는 조작을 안내받는다.',
      },
    },
  },
  argTypes: {
    side:  { control: 'radio', options: ['bottom', 'top'] },
    align: { control: 'radio', options: ['start', 'end'] },
  },
};

/* children에 함수를 주면 close를 받는다 — 항목을 고르면 스스로 닫히게 한다 */
export const Default = {
  args: { side: 'bottom', align: 'end' },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
      <Popover
        {...args}
        label="더보기"
        trigger={<IconButton icon="MoreHorizontal" aria-label="더보기" />}
      >
        {(close) => (
          <>
            <MenuItem label="이름 바꾸기" icon="Pencil" onClick={close} />
            <MenuItem label="지우기" icon="Trash2" variant="critical" onClick={close} />
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
        trigger={<IconButton icon="User" size="sm" aria-label="내 계정" />}
      >
        {(close) => (
          <div style={{ minWidth: 180 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px' }}>
              <span className="text-label-3" style={{ flex: 1 }}>바다코끼리</span>
              <IconButton icon="Pencil" size="sm" aria-label="닉네임 바꾸기" onClick={close} />
            </div>
            <Divider />
            <MenuItem label="로그아웃" icon="LogOut" onClick={close} />
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
