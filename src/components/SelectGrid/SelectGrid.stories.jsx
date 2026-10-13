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

**SelectTile과 가르는 법**: 판 위로 떠오르는 한 줄 띠에서 고르면 SelectTile(40·32 작은 칸), 시트를 열어 넓게 펼쳐 고르면 SelectGrid다.
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
