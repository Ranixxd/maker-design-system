import MenuItem from './MenuItem';

export default {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        component:
          'Popover 안에 들어가는 짧은 줄.\n\n' +
          'ListItem과 겹쳐 보이지만 자리가 다르다 — ListItem은 화면을 채우는 목록의 한 줄이라 ' +
          '부제를 달고 여백이 넉넉하고, MenuItem은 이미 열려 있는 작은 패널 안이라 낮고 좁다. ' +
          '목록용을 팝오버에 쓰면 팝오버가 의도보다 커진다.\n\n' +
          '되돌리기 어려운 줄(지우기·로그아웃)은 `variant="critical"`.',
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
        minWidth: 180, padding: 4, borderRadius: 8,
        background: 'var(--color-bg-default)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-overlay)',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = { args: { label: '로그아웃' } };
export const 아이콘 = { name: '아이콘', args: { label: '로그아웃', icon: 'LogOut' } };
export const Critical = { args: { label: '지우기', icon: 'Trash2', variant: 'critical' } };
export const Disabled = { args: { label: '지우기', icon: 'Trash2', disabled: true } };

export const 여러줄 = {
  name: '여러 줄',
  render: () => (
    <>
      <MenuItem label="이름 바꾸기" icon="Pencil" />
      <MenuItem label="내려받기" icon="Download" />
      <MenuItem label="지우기" icon="Trash2" variant="critical" />
    </>
  ),
};
