// src/tokens/*.css에서 앱(React Native)이 쓸 토큰을 뽑아 src/tokens/native.js로 쓴다.
// 앱은 CSS 변수를 못 읽어서 값을 풀어 담는다. 원본은 늘 CSS다. native.js를 손으로 고치지 않는다.
//
// 담는 것: 시멘틱 색(bg·text·border·icon), 간격, 반경, 타이포 역할 열한 개.
// 팔레트(--color-gray-* 등)는 담지 않는다. 쓰는 쪽에서 팔레트를 못 부르게 하려는 것이다.
// bg-hover도 뺀다. 앱에는 hover가 없다(눌림은 bg-pressed).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokensDir = join(root, 'src', 'tokens');
const read = (f) => readFileSync(join(tokensDir, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

const vars = {};
for (const f of ['colors.css', 'spacing.css', 'radius.css', 'typography.css']) {
  for (const m of read(f).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
}

function resolve(name, seen = new Set()) {
  if (seen.has(name)) throw new Error('토큰이 서로를 부른다: ' + name);
  seen.add(name);
  const v = vars[name];
  if (v === undefined) throw new Error('없는 토큰: ' + name);
  const ref = v.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], seen) : v;
}

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const px = (v) => {
  const n = parseFloat(v);
  if (!/px$/.test(v) || Number.isNaN(n)) throw new Error('px가 아니다: ' + v);
  return n;
};

const color = {};
for (const name of Object.keys(vars)) {
  const m = name.match(/^--color-((bg|text|border|icon)-[\w-]+)$/);
  if (m && m[1] !== 'bg-hover') color[camel(m[1])] = resolve(name);
}

const spacing = {};
for (const name of Object.keys(vars)) {
  const m = name.match(/^--spacing-(\d+)$/);
  if (m) spacing[m[1]] = px(resolve(name));
}

const layout = {};
for (const name of ['--global-padding-t', '--global-padding-b', '--global-padding-l', '--global-padding-r',
  '--section-gap', '--component-gap', '--item-gap']) {
  layout[camel(name.slice(2))] = px(resolve(name));
}

const radius = {};
for (const name of Object.keys(vars)) {
  const m = name.match(/^--radius-([\w-]+)$/);
  if (m) radius[camel(m[1])] = px(resolve(name));
}

// 타이포 역할은 클래스(.text-heading-md 등)로 정의돼 있어 규칙을 읽는다.
// 앱의 lineHeight는 배수가 아니라 px라서 곱해 담는다. label(줄 간격 1)은 담지 않는다:
// 글자 크기와 같은 줄 높이는 안드로이드에서 한글 아래가 잘릴 수 있어 앱 기본값에 맡긴다.
const typography = {};
const typoCss = read('typography.css');
for (const m of typoCss.matchAll(/\.text-([\w-]+)\s*\{([^}]*)\}/g)) {
  const prop = (p) => {
    const r = m[2].match(new RegExp(p + '\\s*:\\s*var\\((--[\\w-]+)\\)'));
    if (!r) throw new Error(`.text-${m[1]}에 ${p}가 없다`);
    return resolve(r[1]);
  };
  const fontSize = px(prop('font-size'));
  const lh = parseFloat(prop('line-height'));
  const style = { fontSize, fontWeight: prop('font-weight') };
  if (lh !== 1) style.lineHeight = Math.round(fontSize * lh);
  typography[camel(m[1])] = style;
}

const body = [
  '// 이 파일은 scripts/native-tokens.js가 src/tokens/*.css에서 만든다. 손으로 고치지 않는다.',
  '// 앱(React Native)용이다. 웹은 CSS 변수와 .text-* 클래스를 쓴다.',
  '',
  `export const color = ${JSON.stringify(color, null, 2)};`,
  '',
  `export const spacing = ${JSON.stringify(spacing, null, 2)};`,
  '',
  `export const layout = ${JSON.stringify(layout, null, 2)};`,
  '',
  `export const radius = ${JSON.stringify(radius, null, 2)};`,
  '',
  `export const typography = ${JSON.stringify(typography, null, 2)};`,
  '',
].join('\n');

writeFileSync(join(tokensDir, 'native.js'), body);

// 타입 선언. 앱은 TypeScript라 이것이 없으면 값을 any로 본다.
const typeOf = (v) => (typeof v === 'object'
  ? '{ ' + Object.entries(v).map(([a, b]) => `readonly ${a}: ${JSON.stringify(b)}`).join('; ') + ' }'
  : JSON.stringify(v));
const decl = (name, obj) => [
  `export declare const ${name}: {`,
  ...Object.entries(obj).map(([k, v]) => `  readonly ${JSON.stringify(k)}: ${typeOf(v)};`),
  '};',
  '',
].join('\n');
writeFileSync(join(tokensDir, 'native.d.ts'), [
  '// scripts/native-tokens.js가 만든다. 손으로 고치지 않는다.',
  decl('color', color), decl('spacing', spacing), decl('layout', layout),
  decl('radius', radius), decl('typography', typography),
].join('\n'));
console.log(`native.js: 색 ${Object.keys(color).length}, 간격 ${Object.keys(spacing).length}, 반경 ${Object.keys(radius).length}, 타이포 ${Object.keys(typography).length}`);
