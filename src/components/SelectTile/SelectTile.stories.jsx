import { useState } from 'react';
import SelectTile, { ColorDot, RainbowDot, tileFillClass } from './SelectTile';

const BUBBLE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><ellipse cx="40" cy="38" rx="34" ry="26" fill="#bfe6ff" stroke="#6cb6e8" stroke-width="4"/></svg>`
);

export default {
  title: 'Components/SelectTile',
  component: SelectTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
선택 타일. 편집 화면 아래 자리에서 **여럿 중 하나를 고르는 네모 칸**이다. 안에는 무엇이든 담는다(색 견본, 아이콘, 그림 미리보기).

**작은 단위로 만들어 조합한다**(2026-10-11 사용자, 덕꾸 앱에서 먼저 만들고 2026-10-12 웹으로 옮겼다).
타일(칸) → 줄(그릇, \`SelectRow\`) → 팔레트(색 타일을 채운 줄, \`ColorPalette\`).

**규칙**
- 크기는 둘. \`md\`(칸 40), \`sm\`(칸 32). 견본은 md 30, sm 24
- 고른 칸은 \`border-primary\` 2. accent(보라)나 채움으로 가르지 않는다(EditFrame "판 위로 떠오르는 띠"와 같다)
- 누르는 영역은 보이는 칸 그대로다
- \`showLabel\`이면 칸 아래에 이름이 선다. 글자까지 눌린다
- 누를 때마다 판에 하나씩 붙는 줄(파츠 넣기)도 같은 타일을 쓰되 고른 상태를 켜지 않는다

**담는 것**
- \`ColorDot\`: 동그란 색 견본. 둘레 선은 그림 위에 얹는 \`border-overlay\`라 하양 견본도 바탕과 갈린다
- \`RainbowDot\`: 색 직접 고르기. 색상환을 크게 흐린 동그라미. **직접 고른 색이 있으면 무지개 대신 그 색의 \`ColorDot\`을 보인다**
- 그림 미리보기: \`<img className={tileFillClass}>\`. 칸 안에 다 보이게 담는다(contain)
- \`fill\`(색): 칸 자체를 그 색으로 칠한다. **사용자가 정하는 색 목록**(배경 만들기의 배경색·패턴색처럼 더하고 빼는 색)에 쓴다.
  칸 둘레 선 안에 동그란 견본을 또 두면 상자가 겹겹이 보였다(2026-10-13 사용자). 정해 둔 색 중 고르는 팔레트(\`ColorPalette\`)는 \`ColorDot\` 그대로다
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'] },
    selected: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
};

export const Color = {
  name: '색 견본',
  args: { label: '하늘', selected: false, size: 'md' },
  render: (args) => <SelectTile {...args}><ColorDot value="#dcefff" size={args.size} /></SelectTile>,
};

export const Rainbow = {
  name: '색 직접 고르기',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <SelectTile label="색 직접 고르기"><RainbowDot /></SelectTile>
      <SelectTile label="색 직접 고르기" selected><ColorDot value="#7c5cff" /></SelectTile>
      <SelectTile label="색 직접 고르기" size="sm"><RainbowDot size="sm" /></SelectTile>
    </div>
  ),
};

export const Picture = {
  name: '그림 미리보기',
  render: () => {
    const [on, setOn] = useState(0);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {[0, 1, 2].map((i) => (
          <SelectTile key={i} label={'말풍선 ' + (i + 1)} selected={on === i} onClick={() => setOn(i)}>
            <img className={tileFillClass} src={BUBBLE} alt="" />
          </SelectTile>
        ))}
      </div>
    );
  },
};

export const Labeled = {
  name: '이름 붙이기',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <SelectTile label="하양" showLabel selected><ColorDot value="#ffffff" /></SelectTile>
      <SelectTile label="검정" showLabel><ColorDot value="#1f1f1f" /></SelectTile>
    </div>
  ),
};

export const Filled = {
  name: '칸을 색으로 채우기',
  render: () => {
    const [on, setOn] = useState(0);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {['#8cd0e6', '#ffffff', '#ebe3ff'].map((c, i) => (
          <SelectTile key={c} size="sm" label={'패턴색 ' + (i + 1)} fill={c} selected={on === i} onClick={() => setOn(i)} />
        ))}
      </div>
    );
  },
};
