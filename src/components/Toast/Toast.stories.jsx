import { ToastProvider, useToast } from './Toast';
import Button from '../Button/Button';

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
짧은 피드백 메시지를 **화면 한가운데**에 일시적으로 표시한다.

**사용 규칙**
- \`useToast()\` 훅으로 \`show(message, options?)\` 함수를 얻어 호출한다.
- 기본 노출 시간: 2100ms. \`show(message, 3000)\`처럼 숫자로도, \`show(message, { duration: 3000 })\`으로도 준다.
- 여러 토스트가 동시에 쌓이면 위에서 아래로 순서대로 표시된다.
- \`ToastProvider\`가 앱 최상단에 있어야 한다.

**겹침은 항상 맨 위다.** \`--z-toast\`(3000)를 쓴다. 모달·시트·서랍 위에 뜬다 —
알림이 가려지면 알림이 아니다. 쓰는 쪽에서 이 값을 다시 정하지 않는다.

**긴 글은 줄을 바꾼다.** 한국어 안내는 한 문장이 길어지는 일이 잦아 \`nowrap\`으로
묶지 않는다. 최대 340px, 좁은 화면에서는 양옆 여백을 뺀 만큼까지 늘어난다.
메시지 안의 \`\\n\`도 그대로 줄이 된다(\`pre-line\`).

**\`arrow\`는 다음에 할 일이 화면 아래쪽에 있을 때만 쓴다.** 글 아래에 갈매기 표시가
붙어 아래로 흘러간다. "여기 다 됐다"가 아니라 "이제 저기를 보라"는 자리다.
장식이 아니므로 그 뜻이 없으면 붙이지 않는다.

**2026-09-24에 세 가지를 더했다.** 카톡테마 메이커가 같은 일을 하는 알림을 두 벌
따로 들고 있었다(가운데 한 줄, 아래 한 줄). 그 두 벌을 이 부품 하나로 모으면서
거기에만 있던 성질을 여기로 옮겼다 — 여러 줄, 화살표, 간격 토큰. 쓰는 쪽에 남겨
두면 부품을 쓰는 뜻이 없어진다.
        `,
      },
    },
  },
};

const Demo = ({ message = '저장됐어요', ...options }) => {
  const show = useToast();
  return (
    <Button onClick={() => show(message, options)}>
      토스트 띄우기
    </Button>
  );
};

export const Default = {
  name: '기본',
  render: () => <Demo message="저장됐어요" />,
};

export const LongMessage = {
  name: '긴 메시지',
  render: () => <Demo message="보관한 테마는 더보기 > 내 테마에서 확인할 수 있어요." />,
};

export const MultiLine = {
  name: '줄바꿈',
  parameters: {
    docs: { description: { story: '메시지 안의 `\\n`이 그대로 줄이 된다. 문장을 끊어 읽히고 싶을 때만 쓴다.' } },
  },
  render: () => <Demo message={'테마를 가져오지 못했어요.\n다시 시도해주세요.'} />,
};

export const WithArrow = {
  name: '화살표',
  parameters: {
    docs: { description: { story: '다음에 할 일이 화면 아래쪽에 있을 때만 붙인다. 장식이 아니다.' } },
  },
  render: () => <Demo message="늘어나는 곳과 글자 자리를 정해주세요." arrow />,
};

export const Multiple = {
  name: '여러 개 연속',
  parameters: { controls: { disable: true } },
  render: () => {
    const MultiDemo = () => {
      const show = useToast();
      return (
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button onClick={() => show('첫 번째')}>첫 번째</Button>
          <Button variant="secondary" onClick={() => show('두 번째')}>두 번째</Button>
          <Button variant="neutral" onClick={() => show('세 번째')}>세 번째</Button>
        </div>
      );
    };
    return <MultiDemo />;
  },
};
