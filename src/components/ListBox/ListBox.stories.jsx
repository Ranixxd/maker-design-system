import ListBox, { ListBoxItem } from './ListBox';
import IconButton from '../IconButton/IconButton';

export default {
  title: 'Components/ListBox',
  component: ListBox,
  parameters: {
    docs: {
      description: {
        component: `목록 상자(2026-10-27, 덕꾸 앱 ListBox를 옮겼다).

흰 면에 \`border-default\` 1, 둥글기 \`radius-2xl\`, 안쪽 4. **어느 바탕 위에서나 쓴다.** 줄 사이에 선을 긋지 않는다.

### 줄 (ListBoxItem)

- 줄은 투명하고, **누르는 동안만** \`bg-pressed\`. 줄 둥글기는 \`radius-xl\`(상자 24 − 안쪽 4)
- 이름은 \`label-md\` 하나. 날짜처럼 딸린 것은 \`sub\`로 이름 아래(\`label-sm\` secondary, 이름과 4 띄운다)
- 끝의 [⋯]는 \`trailing\`. 줄 단추 밖에 따로 선다(단추 안에 단추를 넣을 수 없다)

### 묶음 위 레이블

\`heading-xs\`, 상자와 12 띄운다. 레이블은 쓰는 쪽이 둔다.

### MenuItem과 바꿔 쓰지 않는다

MenuItem은 팝오버·시트 안의 고르기 줄이고, 이것은 화면에 놓이는 목록이다.`,
      },
    },
  },
};

export const Default = {
  render: () => (
    <div style={{ width: 340 }}>
      <ListBox>
        {['봄 테마', '2026.10.27'].map((name) => (
          <ListBoxItem key={name} label={name} sub="10월 27일"
            trailing={<IconButton icon="MoreHorizontal" size="sm" variant="neutral-weak" aria-label="더보기" />} />
        ))}
      </ListBox>
    </div>
  ),
};

export const 레이블과함께 = {
  name: '묶음 위 레이블',
  render: () => (
    <div style={{ width: 340, display: 'grid', gap: 'var(--spacing-3)' }}>
      <h3 className="text-heading-xs" style={{ margin: 0 }}>보관한 테마</h3>
      <ListBox>
        <ListBoxItem label="봄 테마" sub="10월 27일" />
      </ListBox>
    </div>
  ),
};
