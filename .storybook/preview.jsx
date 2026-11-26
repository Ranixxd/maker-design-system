import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'todo' },
    /* 파일 이름 순이면 UX 규칙(UxRules)이 UX 라이팅 위로 간다. 말투가 먼저, 동작 규칙이 그 아래다.
       나머지는 지금처럼 파일을 찾은 순서대로 둔다. */
    options: {
      storySort: { order: ['Foundations', ['UX 라이팅', 'UX 규칙']] },
    },
  },
};

export default preview;
