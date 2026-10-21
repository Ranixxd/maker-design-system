import { useState } from 'react';
import ColorPalette from './ColorPalette';
import SelectTile from '../SelectTile/SelectTile';

/* 스토리용 사진: 분홍 바탕에 하늘색 동그라미 */
const PHOTO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#fde2ea"/><circle cx="20" cy="20" r="11" fill="#7cc4f5"/></svg>');

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
- \`photo\`: 색 대신 사진을 바탕으로 깔 수 있는 줄(프로필 사진 배경, 음식 짤 바탕)은 **맨 앞에 사진 칸을 고정한다**(2026-10-21). 이때 투명 칸은 두지 않는다.
  \`{ src, selected, loading, label, menu: [{ icon, label, onClick }] }\`. 칸 안은 불러오는 중이면 도는 표시, \`src\`가 있으면 썸네일, 없으면 \`ImagePlus\`다.
  누르면 칸 위로 메뉴(\`Popover\` + \`MenuItem\`)가 펴지고, 고르면 메뉴를 닫은 뒤 그 항목의 \`onClick\`을 부른다.
  **메뉴 항목·차례·아이콘과 할 일은 쓰는 쪽이 넘긴다.** 덕꾸 앱의 같은 메뉴와 차례·아이콘을 같게 둔다(지금은 내 사진 \`Image\` / 만들던 배경화면 \`Wallpaper\` / 배경 만들기에서 만들기 \`Brush\`).
  팔레트는 칸 모양·메뉴 여닫기·불러오는 중·썸네일만 맡는다. 사진을 쓰는 동안은 \`value\`를 \`null\`로 두어 색 타일이 고른 상태가 되지 않게 한다. \`photo\`가 있으면 \`leading\`은 무시한다
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

export const Photo = {
  name: '사진 칸 + 메뉴',
  render: () => {
    const [v, setV] = useState('#ffffff');
    const [src, setSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const use = () => setSrc(PHOTO);
    const load = () => { setLoading(true); setTimeout(() => { setLoading(false); use(); }, 1500); };
    return (
      <div style={{ width: 375 }}>
        <ColorPalette colors={COLORS} value={src ? null : v} label="바탕" picker={{ start: '#ffffff' }}
          onChange={(c) => { setV(c); setSrc(null); }}
          photo={{
            src, loading, selected: !!src,
            menu: [
              { icon: 'Image', label: '내 사진', onClick: use },
              { icon: 'Wallpaper', label: '만들던 배경화면', onClick: load },
              { icon: 'Brush', label: '배경 만들기에서 만들기', onClick: () => {} },
            ],
          }} />
      </div>
    );
  },
};
