import remarkGfm from 'remark-gfm';

/* MDX는 기본이 CommonMark라 표 문법이 없다. remark-gfm을 붙이지 않으면
   | a | b | 로 쓴 표가 통째로 한 문단으로 뭉개져 나온다 — 오류가 아니라
   그냥 조용히 못생기게 렌더되기 때문에 놓치기 쉽다. */
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
};
export default config;
