import { useState } from 'react';
import ColorPicker from './ColorPicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
색 하나를 고르는 판. 위에서부터 hex 칸, 진하기·밝기 네모, 색상 막대.

**왜 만들었나 (2026-09-18)**
브라우저 기본 선택기(\`input type="color"\`)는 기기마다 모양이 다르다. 어떤 안드로이드는 고를 수 있는 색이 몇 개뿐이고,
hex를 칠 수 없다. 모든 기기에서 같은 선택기를 준다.

**규칙**
- **불투명도는 고르지 않는다.** 값은 늘 여섯 자리 hex(\`#rrggbb\`)다
- **[적용]을 누를 때만 onChange**(2026-10-21 사용자). 네모·막대·hex 칸은 판 안의 색만 바꾼다. 끄는 대로 뒤 화면을 다시 그리면 폰에서 버벅였다. [적용]은 끄지 않는다. 색이 그대로면 onChange 없이 창만 닫는다
- **적용하면 창이 닫힌다**(2026-10-21 사용자). 감싼 LayerPopup·Popover가 \`useOverlayClose\`로 닫는 법을 건네고, 선택기가 적용 뒤 부른다. 쓰는 쪽은 닫는 줄을 달지 않는다
- **hex 칸이 맨 위다**(2026-10-18 사용자). 바텀시트를 끌어내리려고 짚은 손가락이 네모에 닿아 색이 바뀌었다. 손으로 끌지 않는 hex 칸이 시트 머리와 네모 사이를 막아 준다
- **hex 칸**: 여섯 자리를 다 치면 판의 색이 바뀐다. 엔터는 [적용]과 같다. 세 자리는 칸을 벗어날 때 늘려 받고, 틀린 값은 지금 색으로 돌린다. \`#\`은 쳐도 되고 안 쳐도 된다
- **스포이드는 없다.** 웹은 화면 픽셀을 읽지 못해 페이지를 그림으로 다시 그려야 하는데, 폰에서 몇 초씩 걸렸다(2026-09-18 스펙아웃)

**어디에 띄우나**
- 데스크톱: 누른 단추 옆 Popover. 스크롤되는 목록 안이면 \`portal\`을 켠다. 패널 안쪽 여백은 쓰는 쪽이 준다
- 모바일: LayerPopup 시트. 다른 시트처럼 뒤를 어둡게 덮는다
        `,
      },
    },
  },
  argTypes: {
    value: { control: 'color' },
    label: { control: 'text' },
  },
};

export const Default = {
  name: '기본',
  render: (args) => {
    const [c, setC] = useState('#3a6fe0');
    return (
      <div style={{ width: 280 }}>
        <ColorPicker {...args} value={c} onChange={setC} />
        <p className="text-body-sm" style={{ marginTop: 12 }}>고른 값: {c}</p>
      </div>
    );
  },
};
