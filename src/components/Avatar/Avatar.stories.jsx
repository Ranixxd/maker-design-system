import Avatar from './Avatar';

const EMPTY = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
     <rect width="120" height="120" fill="#e1e2e4"/>
     <circle cx="60" cy="47" r="23" fill="#fff"/>
     <ellipse cx="60" cy="130" rx="48" ry="50" fill="#fff"/>
   </svg>`
);
const PHOTO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
     <rect width="120" height="120" fill="#ffe08a"/>
     <circle cx="60" cy="52" r="26" fill="#8b5e00"/>
   </svg>`
);

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
프로필 사진 동그라미(2026-10-12 사용자). 유저 템플릿 상세와 배경 자랑 상세의 작성자 줄(사진, 이름, 최애)에 선다.

- 사진이 없거나 못 불러오면 \`fallback\`(쓰는 쪽의 기본 그림)을 띄운다. 기본 그림은 쓰는 쪽이 가진다
- 모서리는 \`radius-full\`, 그림이 들어가는 곳이라 가장자리는 \`border-subtle\` 한 줄
- 목록 카드에는 두지 않는다. 사진·최애는 상세에서 본다

**size**
- \`sm\` (24px): 작성자 줄의 이름 옆
- \`md\` (40px): 이름을 두 줄로 쌓는 자리
- \`lg\` (64px): 내 사진. 내 프로필 줄(목록)과 내 프로필 화면(상세)이 같은 크기를 쓴다

앱(덕꾸)은 같은 이름·크기로 \`components/Avatar.tsx\`를 따로 둔다.
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export const Empty = { name: '기본 그림', args: { size: 'sm', fallback: EMPTY } };
export const Photo = { name: '사진', args: { size: 'sm', src: PHOTO, fallback: EMPTY } };
export const Sizes = {
  name: '크기',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar size="sm" fallback={EMPTY} />
      <Avatar size="md" fallback={EMPTY} />
      <Avatar size="lg" fallback={EMPTY} />
    </div>
  ),
};
