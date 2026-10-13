import { useState } from 'react';
import SelectTile, { tileFillClass } from './SelectTile';

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
선택 타일. 편집 화면 아래 자리에서 **여럿 중 하나를 고르는 네모 칸**이다. 색은 칸 자체를 칠하고, 그 밖에는 아이콘이나 그림 미리보기를 담는다.

**작은 단위로 만들어 조합한다**(2026-10-11 사용자, 덕꾸 앱에서 먼저 만들고 2026-10-12 웹으로 옮겼다).
타일(칸) → 줄(그릇, \`SelectRow\`) → 팔레트(색 타일을 채운 줄, \`ColorPalette\`).

**규칙**
- 크기는 둘. \`md\`(칸 40), \`sm\`(칸 32)
- 고른 칸은 \`border-primary\` 2. accent(보라)나 채움으로 가르지 않는다(EditFrame "판 위로 떠오르는 띠"와 같다)
- 누르는 영역은 보이는 칸 그대로다
- \`showLabel\`이면 칸 아래에 이름이 선다. 글자까지 눌린다
- 누를 때마다 판에 하나씩 붙는 줄(파츠 넣기)도 같은 타일을 쓰되 고른 상태를 켜지 않는다

**담는 것**
- \`fill\`(색): 칸 자체를 그 색으로 칠한다. **칸 안에 동그란 색 견본을 두지 않는다**(2026-10-13 사용자).
  칸 둘레 선 안에 견본을 또 두면 상자가 겹겹이 보였고, 그림이 꽉 찬 옆 칸 사이에서 작은 동그라미만 다른 종류로 보였다. 10-12~10-13에는 \`ColorDot\`·\`RainbowDot\`이 있었다
- 색 직접 고르기: \`fill="rainbow"\`로 칸을 무지개로 채운다. **직접 고른 색이 있으면 \`fill={그 색}\`으로 바꾼다**
- 투명: \`fill="transparent"\`로 칸을 체크무늬로 채운다(2026-10-13). 바탕 고르기처럼 "아무 색도 안 깐다"를 고를 때. 색 줄(ColorPalette)에서는 \`leading\` 칸으로 맨 앞에 세운다
- 그림 미리보기: \`<img className={tileFillClass}>\`. 칸 안에 다 보이게 담는다(contain)
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
  name: '색',
  args: { label: '하늘', selected: false, size: 'md', fill: '#dcefff' },
};

export const Rainbow = {
  name: '색 직접 고르기',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <SelectTile label="색 직접 고르기" fill="rainbow" />
      <SelectTile label="색 직접 고르기" selected fill="rainbow" />
      <SelectTile label="색 직접 고르기" selected fill="#7c5cff" />
      <SelectTile label="색 직접 고르기" size="sm" fill="rainbow" />
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
      <SelectTile label="하양" showLabel selected fill="#ffffff" />
      <SelectTile label="검정" showLabel fill="#1f1f1f" />
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
        <SelectTile size="sm" label="색 직접 고르기" fill="rainbow" selected={on === 3} onClick={() => setOn(3)} />
      </div>
    );
  },
};

export const Transparent = {
  name: '투명',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <SelectTile label="바탕 투명" fill="transparent" />
      <SelectTile label="바탕 투명" fill="transparent" selected />
      <SelectTile label="바탕 투명" size="sm" fill="transparent" />
    </div>
  ),
};
