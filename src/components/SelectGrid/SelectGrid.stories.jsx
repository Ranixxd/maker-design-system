import { useState } from 'react';
import { SelectGrid, SelectGridItem } from './SelectGrid';

const FACES = ['(｡•̀ᴗ-)✧', '(づ｡◕‿‿◕｡)づ', 'ʕ•ᴥ•ʔ', '(ง •̀_•́)ง', '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '٩(◕‿◕｡)۶'];

export default {
  title: 'Components/SelectGrid',
  component: SelectGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
고르기 격자. **시트 본문을 채우는 큰 칸**에서 여럿 중 하나를 고른다. 고르면 시트를 닫는 자리다(냉장고 표정 고르기, 2026-10-13).

**규칙**
- \`SelectGrid\` 안에 \`SelectGridItem\`을 둔다. 한 줄 칸 수는 \`columns\`(기본 3), 칸 사이 12
- 칸은 회색 면(\`bg-tertiary\`), 반경 md. 글자는 \`text-label-lg\` 가운데, 칸 높이 64
- 그림 미리보기를 담으면 \`ratio\`(폭 / 높이)로 칸 비율을 정한다
- 고른 칸은 \`border-primary\` 2. SelectTile과 같다
- 둘레 여백은 담는 쪽이 준다. 시트 본문(\`global-padding\`)이 좌우를 준다
- 분류가 있으면 시트 \`toolbar\`에 Chip 줄을 두고 격자를 갈아 끼운다
- **여러 개 고르기**: 고른 차례가 뜻이 있으면 \`order\`(1부터)를 준다. 칸 오른쪽 위에 primary 면 번호 동그라미가 선다. 하나를 풀면 뒤 번호가 하나씩 당겨진다(차례는 쓰는 쪽이 셈한다). 낭독기 이름에 "n번째"가 붙는다

**SelectTile과 가르는 법**: 판 위로 떠오르는 한 줄 띠에서 고르면 SelectTile(40·32 작은 칸), 시트를 열어 넓게 펼쳐 고르면 SelectGrid다.

**편집 화면 아래 자리에 둘 때**: 고를 것이 많아 한 줄 띠로 넘기기 버거우면 시트 대신 아래 자리 칩의 속(`EditTrayBody` panes)에 격자를 둘 수 있다. 아래 자리 본문은 상한(176)이 있어 격자는 그 안에서 세로로 넘긴다. 좌우 여백 16(`spacing-4`)은 쓰는 쪽이 준다(`EditTray` 규칙). 고르면 판에 바로 붙고, 닫을 시트가 없다. 폰 폭에서는 한 줄 5칸이 알맞다
        `,
      },
    },
  },
};

export const Default = {
  name: '글자 칸',
  render: () => {
    const [v, setV] = useState(FACES[0]);
    return (
      <div style={{ width: 343 }}>
        <SelectGrid label="표정">
          {FACES.map((f) => (
            <SelectGridItem key={f} label={'표정 ' + f} selected={v === f} onClick={() => setV(f)}>{f}</SelectGridItem>
          ))}
        </SelectGrid>
      </div>
    );
  },
};

export const Ordered = {
  name: '여러 개 고르기(차례 번호)',
  render: () => {
    const [picked, setPicked] = useState([FACES[2], FACES[0]]);
    const toggle = (f) => setPicked((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));
    return (
      <div style={{ width: 343 }}>
        <SelectGrid label="표정">
          {FACES.map((f) => {
            const i = picked.indexOf(f);
            return (
              <SelectGridItem key={f} label={'표정 ' + f} selected={i >= 0} order={i >= 0 ? i + 1 : undefined}
                onClick={() => toggle(f)}>{f}</SelectGridItem>
            );
          })}
        </SelectGrid>
      </div>
    );
  },
};
