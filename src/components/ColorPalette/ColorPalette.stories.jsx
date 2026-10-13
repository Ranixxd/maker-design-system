import { useState } from 'react';
import ColorPalette from './ColorPalette';
import SelectTile from '../SelectTile/SelectTile';

const COLORS = [
  { value: '#ffffff', label: '하양' },
  { value: '#1f1f1f', label: '검정' },
  { value: '#fde2ea', label: '분홍' },
  { value: '#ffe8d4', label: '주황' },
  { value: '#fff3c4', label: '노랑' },
  { value: '#e2f5dc', label: '초록' },
  { value: '#dcefff', label: '하늘' },
  { value: '#ebe3ff', label: '보라' },
];

export default {
  title: 'Components/ColorPalette',
  component: ColorPalette,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
컬러 팔레트. 선택 줄(\`SelectRow\`)에 색 타일(\`SelectTile\` \`fill\`)을 채운 것이다. **색을 고르는 줄은 이것을 쓴다.**

**규칙**
- \`colors\`는 샘플 색 \`[{ value, label }]\`. \`value\`가 그중 하나면 그 타일이 고른 상태다. \`null\`이면 아무것도 안 고른 상태(색 대신 사진을 쓸 때)
- \`picker\`를 주면 **맨 끝(오른쪽)에 무지개 타일**(색 직접 고르기)이 선다. 샘플 밖의 색이 고른 값이면 그 타일이 고른 상태가 되고 **무지개 대신 그 색을 보인다**
- 무지개 타일을 누르면 \`ColorPicker\`가 뜬다. 데스크톱은 타일 위로 펴는 \`Popover\`, 폰은 뒤를 어둡게 하지 않는 \`LayerPopup\` 시트(ColorPicker 문서 "어디에 띄우나").
  둘 다 body로 나가 편집 화면 같은 창 위에 뜬다. **팔레트가 띄운다**(2026-10-13). 그 전에는 쓰는 쪽이 \`customTile\`로 감쌌는데,
  화면 크기로 팝오버·시트를 가르는 같은 코드가 네 곳(편집 패널, 말풍선 컴포저, 배경화면, 냉장고)에 따로 있었다.
  \`picker\`는 \`true\` 또는 \`{ start, title }\`. \`start\`는 고른 색이 없을 때(\`null\`) 선택기가 열리는 값이다.
  브라우저 기본 선택기(\`input type="color"\`)는 쓰지 않는다
- \`customTile={(tile) => …}\`은 선택기를 쓰는 쪽이 직접 띄워야 할 때만 쓴다. 새로 쓰는 곳은 \`picker\`를 쓴다
- \`leading\`: 줄 맨 앞에 서 있고 넘어가지 않는 칸. 색이 아닌 선택지(투명 등)를 둔다. 투명은 \`SelectTile fill="transparent"\`
- \`align="center"\`: 남을 때 가운데로 모은다. 편집 화면 판 위로 떠오르는 띠처럼 도구 줄과 가운데를 맞출 때 쓴다(SelectRow와 같다)
- \`label\`은 낭독기가 읽는 이름 앞말이다. "배경"이면 "배경 분홍", "배경 색 직접 고르기"

**타일에 그림이 드는 줄**(말풍선 샘플의 색 갈아끼우기처럼 색 대신 그림 미리보기를 고르는 줄)은 이 팔레트가 아니라 \`SelectRow\` + \`SelectTile\`로 짓고,
끝에 같은 직접 고르기 타일(\`fill="rainbow"\`, 고른 색이 있으면 \`fill={그 색}\`)을 둔다.
        `,
      },
    },
  },
};

export const Default = {
  name: '기본',
  render: () => {
    const [v, setV] = useState('#dcefff');
    return (
      <div style={{ width: 375 }}>
        <ColorPalette colors={COLORS} value={v} onChange={setV} label="배경" />
      </div>
    );
  },
};

export const Custom = {
  name: '색 직접 고르기',
  render: () => {
    const [v, setV] = useState('#7c5cff');
    return (
      <div style={{ width: 480 }}>
        <ColorPalette colors={COLORS} value={v} onChange={setV} label="배경"
          picker={{ start: '#ffffff' }} />
      </div>
    );
  },
};

export const Leading = {
  name: '투명 칸을 앞에 세우기',
  render: () => {
    const [v, setV] = useState(null);
    return (
      <div style={{ width: 375 }}>
        <ColorPalette colors={COLORS} value={v} onChange={setV} label="바탕" picker={{ start: '#ffffff' }}
          leading={<SelectTile label="바탕 투명" fill="transparent" selected={v === null} onClick={() => setV(null)} />} />
      </div>
    );
  },
};
