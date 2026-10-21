import { useState } from 'react';
import ColorPickerPopup from './ColorPickerPopup';
import SelectTile from '../SelectTile/SelectTile';
import Button from '../Button/Button';

export default {
  title: 'Components/ColorPickerPopup',
  component: ColorPickerPopup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
\`ColorPicker\`를 띄우는 창. 여는 요소(\`trigger\`)를 넘기면 데스크톱은 그 옆 \`Popover\`, 폰(767px 이하)은 아래 \`LayerPopup\` 시트로 띄운다.

**규칙**
- **색 선택기를 띄우는 곳은 모두 이것을 쓴다**(2026-10-21 사용자). 곳마다 팝오버·시트를 따로 짜면 덮개·닫기 같은 규칙을 바꿀 때 한 곳씩 빠진다. \`ColorPalette\`의 직접 고르기도 이것이다
- 둘 다 body로 나가 편집 화면 같은 창 위에 뜬다. 팝오버 폭은 296px
- 시트는 다른 시트처럼 뒤를 어둡게 덮는다
- **[적용]하면 닫힌다.** \`ColorPicker\`가 감싼 창을 닫는다. 쓰는 쪽은 닫는 줄을 달지 않는다
- \`onOpen\`: 열릴 때 한 번(그 칸을 고른 칸으로 삼기 등)
- \`trigger\` 없이 \`open\`·\`onOpenChange\`로만 열 수도 있다(메뉴 항목에서 여는 곳). 그때는 화면 크기와 상관없이 \`LayerPopup\`이다
        `,
      },
    },
  },
};

export const Default = {
  name: '단추로 열기',
  render: () => {
    const [c, setC] = useState('#3a6fe0');
    return (
      <div style={{ paddingTop: 360 }}>
        <ColorPickerPopup title="배경색" value={c} onChange={setC}
          trigger={<SelectTile size="md" label="배경색 고르기" fill={c} />} />
      </div>
    );
  },
};

export const Controlled = {
  name: '밖에서 열기',
  render: () => {
    const [c, setC] = useState('#ff8fb8');
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>색 고르기</Button>
        <p className="text-body-sm">고른 값: {c}</p>
        <ColorPickerPopup title="말풍선 색" value={c} onChange={setC} open={open} onOpenChange={setOpen} />
      </>
    );
  },
};
