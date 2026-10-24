import ImageViewer from './ImageViewer';
import Button from '../Button/Button';

export default {
  title: 'Components/ImageViewer',
  component: ImageViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
그림 한 장을 화면 위에 띄워 **꾹 눌러 저장하게 하는 스크림**(2026-10-24 사용자, web에서 올림). 배경화면 저장 창, 짤 저장 창, 짤줍보드 짤 상세가 쓴다.

**스크림 그 자체다.** 제 주소가 있는 페이지(냉장고 그림, 배경 자랑 글)는 이것을 쓰지 않고 제 레이아웃으로 그린다.

**세 칸이다**
- **상단 기능바**: 오른쪽 닫기, 왼쪽은 있으면 보조 기능(\`lead\`, ⋯ 메뉴 등)
- **바디**: 기능바와 푸터를 뺀 **남은 높이를 다 쓴다**. 속은 이 차례로 정해져 있다: **저장 안내 > 그림(지표는 그림 안) > 내용**
- **푸터**: 단추 줄(\`footer\`). 화면 아래로 내려가 붙는다. 단추는 바디 너비(480px까지)로 선다

**안쪽 여백은 세 칸이 같다**(2026-10-24 사용자). 위아래 12px(\`--spacing-3\`), 좌우 16px(\`--spacing-4\`). 푸터 아래에는 홈 막대 자리(safe-area)를 더한다.

**바디 속**
- 그림은 바디의 남은 높이·너비(480px까지)에서 나머지 줄을 뺀 자리에 **원본 비율**로 들어간다. 키우지는 않는다
- 저장 안내와 내용은 푸터 단추처럼 **묶음 너비(480px까지)를 다 쓴다**
- 간격: 줄 사이는 **16(\`--spacing-4\`) 하나**다(2026-10-25 사용자). 안내–그림, 그림–내용이 같다. 전에는 20·16·8로 제각각이라 줄마다 붙고 떨어진 정도가 달라 보였다
- **지표는 그림 바닥 그늘 위에 흰 글로 선다**(2026-10-25 사용자, 덕꾸 앱 짤 상세와 같다). 그늘은 키 96, 바닥이 가장 진하고 위로 옅어진다. 색은 \`bg-overlay\`이고 진하기는 그 2/3까지다(그대로는 그림을 너무 가린다). 글은 \`text-label-md\` \`text-oninverse\`, 좌우·아래 16. 그림 밖 한 줄로 두면 그림·내용·지표 세 줄이 쌓여 무엇이 무엇에 딸린 숫자인지 흐려진다
- 그림이 없으면(지워진 짤) 지표는 그림 자리에 한 줄(\`text-body-sm\` \`text-secondary\`)로 서고, 내용이 그 아래 온다
- 색: 안내 \`text-secondary\`, 내용은 한 단 진한 \`text-default\`
- 묶음 전체가 바디 가운데에 선다

**왜 흰 블러인가**
검정 딤 위의 단추는 잘 안 보인다. 짤줍보드도 같은 딤이다.

**꾹 눌러 저장**
\`<a download>\`로 받으면 폰에서는 파일이 '내 파일'로 들어가 사진첩에 없다. 꾹 눌러 저장하면 사진첩으로 바로 들어간다.
그래서 저장 안내(\`hint\`)를 그림 **위**에 둔다. 보고 나서 알면 한 번 더 찾아 올라와야 한다.

| prop | 쓰는 법 |
|---|---|
| \`label\` | 창 이름(낭독기) |
| \`onClose\` | 닫기·빈 곳 누르기·Esc·(쓰는 쪽이 이으면) 뒤로 가기 |
| \`lead\` | 기능바 왼쪽 |
| \`hint\` | 저장 안내. \`null\`이면 안 둔다 |
| \`src\` / \`alt\` | 그림. 없으면 그림 없이 내용만 선다(지워진 그림) |
| \`imageClassName\` | 그림의 테두리·반경·바탕(배경화면처럼 틀이 있는 그림). 크기는 건드리지 않는다 |
| \`caption\` | 그림 아래 내용 한 줄(짤 제목 등) |
| \`meta\` | 그림 바닥 그늘 위 지표 한 줄(👀 · ♥, 회차 · ♥ 등). 그림이 없으면 그림 자리에 선다 |
| \`footer\` | 푸터 단추 줄 |
| \`children\` | 내용 아래 덧붙는 것(떠 있는 스티커 등). 그림 크기 셈에도 사이 간격에도 넣지 않는다 |
| \`escBlocked\` | 위에 다른 창이 떠 있는 동안 \`true\`. Esc는 그 창 몫이다 |

**감싸는 쪽이 지킬 것**
- 바디 속을 직접 그리지 않는다. 그림·내용·지표는 prop으로 넘긴다. 바디 속 간격도 쓰는 쪽에서 덧칠하지 않는다
- 덮개는 \`--z-modal-scrim\`이다. 위에 띄우는 신고 창은 DOM에서 이것보다 뒤에 둔다
        `,
      },
    },
  },
};

/* 견본 그림(세로로 긴 배경화면, 정사각 짤) */
const 그림 = (w, h, fill) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="${fill}"/></svg>`);

export const SaveWithFooter = {
  name: '저장 창(푸터 단추)',
  render: () => (
    <div style={{ height: '100vh' }}>
      <ImageViewer label="배경화면 저장" onClose={() => {}} src={그림(1440, 3120, '#cdeffd')} alt="만들어진 배경화면" /* @token-ok 견본 그림 색 */
        footer={<Button variant="secondary" size="md">자랑하기</Button>} />
    </div>
  ),
};

export const WithCaption = {
  name: '내용·지표(짤 상세)',
  render: () => (
    <div style={{ height: '100vh' }}>
      <ImageViewer label="짤 보기" onClose={() => {}} src={그림(600, 600, '#ffe2ec')} alt="" /* @token-ok 견본 그림 색 */
        caption="한석원 염력" meta="👀 30 · ♥ 15" />
    </div>
  ),
};

export const DeletedImage = {
  name: '그림 없이(지워진 짤)',
  render: () => (
    <div style={{ height: '100vh' }}>
      <ImageViewer label="명예의 짤" onClose={() => {}} hint={null} caption="삭제된 짤이에요." meta="10월 3일 회차 · ♥ 15" />
    </div>
  ),
};
