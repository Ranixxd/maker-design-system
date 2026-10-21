import PostMeta from './PostMeta';
import IconButton from '../IconButton/IconButton';

export default {
  title: 'Components/PostMeta',
  component: PostMeta,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
글 상세의 메타 묶음(2026-10-22). 남이 올린 글(템플릿, 배경화면 등) 상세에서 그림 아래에 선다. 앞으로 생기는 글 상세도 이것을 쓴다.

**차례는 늘 같다**
1. 묶음 1: 제목 / 내용 / 게시 시간. 각각 없을 수 있고, 셋 다 없으면 묶음째 없다
2. 묶음 2: 사진 | 닉네임 | 최애 명찰, 그 아래 SNS. **늘 선다**
3. 묶음 3: 지표(좋아요·이어 만들기 등). 없으면 묶음째 없다
4. 맨 아래 [⋯]: 있으면 혼자 한 줄, 오른쪽 끝

**규칙**
- 묶음 사이는 20px, 묶음 안 줄 사이는 모두 8px. 선은 긋지 않는다. 여백만으로 가른다
- 제목 \`text-heading-sm\`. 내용과 게시 시간은 같은 글자 \`text-body-md\` secondary(내용은 줄바꿈 그대로)
- 작성자 줄 \`text-body-sm\`. 닉네임·SNS는 default, 나머지는 secondary. 최애는 \`Badge\`
- 지표는 작성자 줄과 같은 \`text-body-sm\` secondary. 숫자도 굵게 쓰지 않는다(쓰는 쪽도 \`<b>\`를 넣지 않는다)
- \`avatar\`가 \`undefined\`면 사진 자리를 두지 않는다(사진을 보이지 않는 기간·서비스). 빈 글자면 \`avatarFallback\` 그림
- 지표·SNS·[⋯]는 쓰는 쪽이 그려 넘긴다. 지표는 서비스마다 다르고, SNS 링크 규칙과 [⋯] 메뉴는 서비스에 있다
- [⋯]는 \`IconButton size="sm"\`(neutral)과 \`Popover align="end"\`를 쓴다
- 제 주소 페이지의 주인공 제목이면 \`titleAs="h1"\`
- 너비는 감싸는 쪽이 정한다
        `,
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

const 더보기 = <IconButton icon="MoreHorizontal" size="sm" aria-label="더보기" />;
const 지표 = <><span>❤️ 12</span><span>·</span><span>📥 3명이 이어 만들었어요</span></>;

export const Full = {
  name: '다 있을 때(템플릿)',
  args: {
    title: '봄날의 산책길',
    body: '벚꽃 색으로 말풍선을 맞췄어요.\n친구탭도 같이 바꿨어요.',
    time: '3일 전',
    stats: 지표,
    name: '최유저5501459',
    avatar: '',
    favorite: '명재현',
    sns: '인스타그램 : @account ↗',
    more: 더보기,
  },
};

export const TitleOnly = {
  name: '제목과 작성자만(배경화면)',
  args: { title: '별', name: '최유저5501459', favorite: '명재현', more: 더보기 },
};

export const AuthorOnly = {
  name: '작성자만',
  args: { name: '이유저2714624', more: 더보기 },
};
