import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/* 라이브러리로 빌드한다.

   원본 JSX를 그대로 내보내면 쓰는 쪽이 못 읽는다 — Vite는 node_modules 안의
   JSX를 변환해주지 않기 때문이다. 그래서 여기서 미리 변환해 dist로 내보낸다.

   react와 lucide-react는 번들에 넣지 않는다(external). 넣으면 쓰는 쪽 앱에
   리액트가 두 벌 올라가서 훅이 깨진다.

   package.json의 prepare가 이 빌드를 부른다. npm이 깃 주소로 설치할 때
   prepare를 돌려주기 때문에, npm 배포 없이 github:에서 바로 설치해도
   dist가 만들어진다. */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      formats: ['es'],
      fileName: () => 'mds.js',
      /* 정하지 않으면 CSS는 꾸러미 이름을 따라간다.
         package.json의 exports가 가리키는 이름과 어긋나므로 맞춰 둔다 */
      cssFileName: 'mds',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
    },
    /* 조각내지 않고 한 장으로 모은다 — 쓰는 쪽이 styles 한 번만 부르면 되게 */
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
