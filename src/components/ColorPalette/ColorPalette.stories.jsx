import { useState } from 'react';
import ColorPalette from './ColorPalette';
import ColorPicker from '../ColorPicker/ColorPicker';
import Popover from '../Popover/Popover';

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
- \`customTile\`을 주면 **맨 끝(오른쪽)에 무지개 타일**(색 직접 고르기)이 선다. 샘플 밖의 색이 고른 값이면 그 타일이 고른 상태가 되고 **무지개 대신 그 색을 보인다**
- 무지개 타일을 누르면 \`ColorPicker\`를 띄운다. 데스크톱은 타일 옆 \`Popover\`, 폰은 뒤를 어둡게 하지 않는 \`LayerPopup\` 시트(ColorPicker 문서 "어디에 띄우나").
  무엇으로 감쌀지는 쓰는 쪽이 \`customTile={(tile) => …}\`로 정한다. 브라우저 기본 선택기(\`input type="color"\`)는 쓰지 않는다
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
          customTile={(tile) => (
            <Popover portal side="top" trigger={tile} label="배경 색">
              <div style={{ width: 264, padding: 'var(--spacing-4)' }}><ColorPicker value={v} onChange={setV} label="배경 색" /></div>
            </Popover>
          )} />
      </div>
    );
  },
};
