import { ToastProvider, useToast } from './Toast';
import Button from '../Button/Button';

export default {
  title: 'UI/Toast',
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
짧은 피드백 메시지를 화면 하단에 일시적으로 표시한다.

**사용 규칙**
- \`useToast()\` 훅으로 \`show(message, duration?)\` 함수를 얻어 호출한다.
- 기본 노출 시간: 2100ms. 두 번째 인자로 조정 가능.
- 여러 토스트가 동시에 쌓이면 아래부터 순서대로 표시된다.
- \`ToastProvider\`가 앱 최상단에 있어야 한다.
        `,
      },
    },
  },
};

const Demo = ({ message = '저장됐어요', duration }) => {
  const show = useToast();
  return (
    <Button onClick={() => show(message, duration)}>
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
  render: () => <Demo message="링크가 클립보드에 복사됐어요" />,
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
