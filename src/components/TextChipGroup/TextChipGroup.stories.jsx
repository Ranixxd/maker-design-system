import { useState } from 'react';
import TextChipGroup from './TextChipGroup';
import ChipGroup from '../ChipGroup/ChipGroup';
import EditTray from '../EditTray/EditTray';

const TONES = [
  { value: 'plain', label: '진지함' },
  { value: 'game', label: '두근두근' },
];
const KINDS = [
  { value: 'all', label: '전체' },
  { value: 'shape', label: '도형' },
  { value: 'nature', label: '자연' },
  { value: 'letter', label: '글자' },
];
const TABS = [
  { value: 'pattern', label: '패턴' },
  { value: 'color', label: '색상' },
  { value: 'size', label: '크기' },
];

export default {
  title: 'Components/TextChipGroup',
  component: TextChipGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
글자형 칩 묶음(2026-11-22). 상자 없이 **글자만 가운뎃점(·)으로 잇고** 그중 하나를 고른다. 칩 줄(\`ChipGroup\`) 바로 밑에서 그 칩 안의 갈래를 고르는 자리에 선다.

**언제 쓰나**
- **결과의 결이 갈리는 종류**를 고를 때 쓴다. 고르면 아래 본문에 나오는 것 자체가 달라진다(패턴 종류, 자막의 말투)
- 고른 요소에 **딸려 오는 꾸밈**(말꼬리 방향, 글자 색)은 이것이 아니라 색 띠(\`SelectRow\`·\`ColorPalette\`)다. 종류를 색으로 가르지 않고, 꾸밈을 글자로 가르지 않는다
- 한 줄에 다 서는 갈래만 담는다. 넘기지도 줄을 바꾸지도 않는다. 갈래가 늘어 넘칠 것 같으면 이 부품이 맞는지부터 다시 본다

**모양**
- 글자 \`text-label-sm\`. 고른 것은 \`text-default\`, 안 고른 것과 가운뎃점은 \`text-tertiary\`. 상자·밑줄 없이 글자 색만으로 가른다
- **굵기는 고르든 안 고르든 같다.** 고를 때마다 폭이 바뀌면 옆 글자가 밀린다
- 누르는 높이는 칩과 같은 32. 글자와 가운뎃점 사이는 8(\`spacing-2\`)
- 마우스를 올리면 안 고른 글자가 \`text-secondary\`로 한 단계 오른다. 고른 것과 헷갈리지 않게 \`text-default\`까지 올리지 않는다

**놓는 자리**
- 줄 양 끝 여백은 \`inset\`, 기본 16(\`ChipGroup\`과 같다). 바로 위 칩 줄과 글자 시작이 맞는다
- \`EditTray\` 안에서는 칩 줄과 본문 사이 24가 이 줄 위아래 12(\`spacing-3\`)씩으로 나뉜다. 부품이 맞추므로 쓰는 쪽이 여백을 더 주지 않는다
- 늘 하나가 골라져 있다. 처음 값은 쓰는 쪽이 준다

**읽어 주기**
- 묶음 이름 \`label\`을 꼭 준다(\`role="group"\`의 이름). 화면에는 글자로 서지 않는다
- 갈래마다 단추이고 고른 것은 \`aria-pressed\`다. 가운뎃점은 읽지 않는다
        `,
      },
    },
  },
};

export const Default = {
  name: '기본',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('plain');
    return <TextChipGroup label="말투" items={TONES} value={v} onChange={setV} />;
  },
};

export const InTray = {
  name: '칩 줄 밑(EditTray)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [tab, setTab] = useState('pattern');
    const [kind, setKind] = useState('all');
    return (
      <div style={{ padding: '0 var(--spacing-5)', border: '1px dashed var(--color-border-default)' }}>
        <EditTray>
          <ChipGroup label="꾸밀 곳" items={TABS} value={tab} onChange={setTab} />
          {tab === 'pattern' && <TextChipGroup label="패턴 종류" items={KINDS} value={kind} onChange={setKind} />}
          <p className="text-body-sm" style={{ margin: 0, padding: '0 var(--spacing-4)', color: 'var(--color-text-secondary)' }}>
            {tab === 'pattern' ? `${KINDS.find((k) => k.value === kind).label} 패턴 목록` : '본문'}
          </p>
        </EditTray>
      </div>
    );
  },
};
