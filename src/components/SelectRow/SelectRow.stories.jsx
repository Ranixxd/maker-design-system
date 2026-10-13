import { useState } from 'react';
import SelectRow from './SelectRow';
import SelectTile from '../SelectTile/SelectTile';
import Icon from '../Icon/Icon';

const COLORS = ['#ffffff', '#1f1f1f', '#fde2ea', '#ffe8d4', '#fff3c4', '#e2f5dc', '#dcefff', '#ebe3ff', '#ffd6d6', '#d6fff4', '#f3d6ff', '#fff'];

export default {
  title: 'Components/SelectRow',
  component: SelectRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
선택 줄. 선택 타일(\`SelectTile\`) 여럿을 한 줄로 담는 그릇이다. 무엇을 고르는 줄인지는 상관없다(색, 그림, 말풍선 모양 등).
색만 고르는 줄은 이 그릇에 색 타일을 채운 \`ColorPalette\`를 쓴다.

**규칙**
- 넘치면 **가로로 넘긴다.** 줄을 바꾸지 않는다. 가운데 정렬로 두면 넘칠 때 앞쪽 칸이 잘려 스크롤로도 안 닿는다(2026-10-12 말풍선 편집에서 실제로 그랬다)
- \`leading\`을 주면 그 칸은 맨 앞에 서 있고 나머지만 넘어간다(프로필 사진의 [사진] 칸)
- 칸 사이 8. 줄 양 끝 여백 16. **감싸는 쪽이 좌우 여백을 또 주지 않는다.** 편집 화면 아래 자리처럼 좌우 여백이 있는 곳에서는 줄이 끝까지 닿게 여백을 되돌려 준다
- 칸 위끝을 맞춘다. 이름이 붙은 칸과 안 붙은 칸이 섞여도 네모 칸끼리 한 줄에 선다
- **정렬은 왼쪽부터가 기본이다.** \`align="center"\`면 남을 때 가운데로 모으고 넘치면 왼쪽부터 넘긴다(2026-10-12 사용자).
  칸 수가 적어 한 줄에 다 드는 편집 화면 띠(말풍선 색)에 쓴다. 칸이 많아 늘 넘치는 목록은 왼쪽부터 둔다
- 편집 화면에서 판 위로 떠오르는 띠 안에 둘 때는 띠가 위아래 8을 준다(EditFrame "판 위로 떠오르는 띠")
- **줄을 담는 띠를 \`pointer-events: none\`으로 숨겼다 \`auto\`로 여는 식으로 쓰지 않는다.** 아이폰(WebKit)이 그 줄을 스크롤 영역으로 다시 잡지 않아 탭은 되고 밀기만 안 된다(2026-10-12 말풍선 색 띠). 숨길 때는 \`hidden\`·\`display\`로 숨긴다
- **끝 여백은 padding으로 주지 않는다.** 아이폰(WebKit)은 넘기는 칸의 padding-right를 스크롤 거리에 안 넣어, 조금만 넘칠 때 마지막 칸이 잘린 채 안 밀린다(2026-10-12). 부품은 빈 칸(\`::after\`)으로 준다
        `,
      },
    },
  },
};

export const Default = {
  name: '넘치면 가로로',
  render: () => {
    const [on, setOn] = useState(0);
    return (
      <div style={{ width: 320, border: '1px dashed var(--color-border-default)', padding: 'var(--spacing-2) 0' }}>
        <SelectRow label="색">
          {COLORS.map((c, i) => (
            <SelectTile key={i} label={'색 ' + (i + 1)} selected={on === i} fill={c} onClick={() => setOn(i)} />
          ))}
        </SelectRow>
      </div>
    );
  },
};

export const Leading = {
  name: '맨 앞 칸 세우기',
  render: () => (
    <div style={{ width: 320, border: '1px dashed var(--color-border-default)', padding: 'var(--spacing-2) 0' }}>
      <SelectRow label="사진" leading={<SelectTile label="사진 올리기"><Icon name="ImagePlus" size={20} /></SelectTile>}>
        {COLORS.map((c, i) => <SelectTile key={i} label={'색 ' + (i + 1)} fill={c} />)}
      </SelectRow>
    </div>
  ),
};

export const Center = {
  name: '가운데 모으기',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
      {[480, 320].map((w) => (
        <div key={w} style={{ width: w, border: '1px dashed var(--color-border-default)', padding: 'var(--spacing-2) 0' }}>
          <SelectRow label="색" align="center">
            {COLORS.slice(0, 9).map((c, i) => <SelectTile key={i} label={'색 ' + (i + 1)} selected={i === 0} fill={c} />)}
          </SelectRow>
        </div>
      ))}
    </div>
  ),
};
