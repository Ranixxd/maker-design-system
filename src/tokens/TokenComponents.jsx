export function ColorSwatch({ token, label, border }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          background: `var(${token})`,
          borderRadius: 8,
          border: border ? '1px solid var(--color-border-default)' : undefined,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <code style={{ fontSize: 12, color: 'var(--color-text-default)' }}>{token}</code>
        {label && <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{label}</span>}
      </div>
    </div>
  );
}

export function SpaceBar({ token, value }) {
  return (
    <tr>
      <td style={{ padding: '6px 0' }}>
        <code style={{ fontSize: 12 }}>{token}</code>
      </td>
      <td style={{ padding: '6px 12px' }}>
        <div
          style={{
            height: 12,
            width: value,
            background: 'var(--color-bg-inverse)',
            borderRadius: 2,
          }}
        />
      </td>
      <td style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '6px 0' }}>{value}</td>
    </tr>
  );
}

export function TypeRow({ token, size, weight, lh, sample }) {
  return (
    <tr>
      <td style={{ padding: '8px 0' }}>
        <code style={{ fontSize: 12 }}>{token}</code>
      </td>
      <td style={{ padding: '8px 12px', fontSize: size, fontWeight: weight, lineHeight: lh }}>
        {sample ?? '가나다 ABC 123'}
      </td>
      <td style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '8px 0' }}>
        {size} / {weight} / lh {lh}
      </td>
    </tr>
  );
}

const tableHead = {
  borderBottom: '1px solid var(--color-border-default)',
  fontSize: 12,
  color: 'var(--color-text-secondary)',
};
const th = { padding: '8px 0', textAlign: 'left' };
const td = { padding: '8px 0', fontSize: 12 };

export function TypographyTable() {
  const rows = [
    { token: '.text-heading-lg', size: '28px', weight: '600', lh: '1' },
    { token: '.text-heading-md', size: '24px', weight: '600', lh: '1' },
    { token: '.text-heading-sm', size: '20px', weight: '600', lh: '1' },
    { token: '.text-body-lg',    size: '17px', weight: '400', lh: '1.5' },
    { token: '.text-body-md',    size: '15px', weight: '400', lh: '1.5' },
    { token: '.text-body-sm',    size: '13px', weight: '400', lh: '1.5' },
    { token: '.text-label-lg',   size: '17px', weight: '500', lh: '1' },
    { token: '.text-label-md',   size: '15px', weight: '500', lh: '1' },
    { token: '.text-label-sm',   size: '13px', weight: '500', lh: '1' },
    { token: '.text-label-xs',   size: '11px', weight: '500', lh: '1' },
  ];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={tableHead}>
          <th style={th}>Token (class)</th>
          <th style={th}>Sample</th>
          <th style={th}>Size / Weight / LH</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <TypeRow key={r.token} {...r} />
        ))}
      </tbody>
    </table>
  );
}

export function SpacingTable() {
  const rows = [
    { token: '--spacing-1',  value: '4px' },
    { token: '--spacing-2',  value: '8px' },
    { token: '--spacing-3',  value: '12px' },
    { token: '--spacing-4',  value: '16px' },
    { token: '--spacing-5',  value: '20px' },
    { token: '--spacing-6',  value: '24px' },
    { token: '--spacing-8',  value: '32px' },
    { token: '--spacing-10', value: '40px' },
    { token: '--spacing-12', value: '48px' },
    { token: '--spacing-16', value: '64px' },
  ];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={tableHead}>
          <th style={th}>Token</th>
          <th style={th}>Visual</th>
          <th style={th}>Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <SpaceBar key={r.token} {...r} />
        ))}
      </tbody>
    </table>
  );
}

function DescTable({ rows, col1 = 'Token', col2 = '용도' }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={tableHead}>
          <th style={th}>{col1}</th>
          <th style={th}>{col2}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.token}>
            <td style={{ ...td, width: '40%' }}><code style={{ fontSize: 12 }}>{r.token}</code></td>
            <td style={{ ...td, color: 'var(--color-text-secondary)' }}>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* 색 하나를 판단하려면 세 가지를 한눈에 봐야 한다 — 어떤 색인지(미리보기),
   무엇을 참조하는지(팔레트), 어디에 쓰는지(용도). 예전에는 표와 미리보기가
   따로 떨어져 있어 눈이 위아래를 오갔다. 한 줄에 모은다.

   palette는 colors.css의 실제 참조를 그대로 적는다 — 바꾸면 여기도 함께 고친다 */
function SemanticColorTable({ rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={tableHead}>
          <th style={th}>미리보기</th>
          <th style={th}>Token</th>
          <th style={th}>참조 팔레트</th>
          <th style={th}>용도</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.token}>
            <td style={{ ...td, width: 56 }}>
              <div style={{
                width: 40, height: 40,
                background: `var(--color-${r.token})`,
                borderRadius: 8,
                /* 흰색·투명에 가까운 것은 테두리가 없으면 어디까지가 색인지 안 보인다 */
                border: r.border ? '1px solid var(--color-border-default)' : undefined,
              }} />
            </td>
            <td style={{ ...td, whiteSpace: 'nowrap' }}>
              <code style={{ fontSize: 12 }}>--color-{r.token}</code>
            </td>
            <td style={{ ...td, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
              <code style={{ fontSize: 12 }}>{r.palette}</code>
            </td>
            <td style={{ ...td, color: 'var(--color-text-secondary)' }}>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function BgColorTable() {
  return <SemanticColorTable rows={[
    { token: 'bg-default',         palette: 'white',            desc: '기본 페이지 배경', border: true },
    { token: 'bg-secondary',       palette: 'gray-50',          desc: '카드·패널 배경', border: true },
    { token: 'bg-tertiary',        palette: 'gray-100',         desc: '입력칸·구분 영역 배경', border: true },
    { token: 'bg-hover',           palette: 'black-alpha-04',   desc: '호버 오버레이', border: true },
    { token: 'bg-pressed',         palette: 'black-alpha-08',   desc: '눌림 오버레이', border: true },
    { token: 'bg-accent',          palette: 'sky-500',          desc: '강조 배경' },
    { token: 'bg-accent-subtle',   palette: 'sky-100',          desc: '강조 보조 배경', border: true },
    { token: 'bg-overlay',         palette: 'black-alpha-60',   desc: '딤 레이어' },
    { token: 'bg-overlay-blur',    palette: 'rgba(255,255,255,.88)', desc: '흰 블러 딤 (--blur-overlay와 함께)', border: true },
    { token: 'bg-inverse',         palette: 'gray-900',         desc: '인버스 배경 (프라이머리 버튼 등)' },
    { token: 'bg-critical',        palette: 'red-600',          desc: '크리티컬 배경' },
    { token: 'bg-critical-subtle', palette: 'red-150',          desc: '크리티컬 보조 배경', border: true },
  ]} />;
}

export function TextColorTable() {
  return <SemanticColorTable rows={[
    { token: 'text-default',    palette: 'gray-800', desc: '기본 본문' },
    { token: 'text-secondary',  palette: 'gray-500', desc: '보조 텍스트' },
    { token: 'text-tertiary',   palette: 'gray-300', desc: '비활성·플레이스홀더' },
    { token: 'text-accent',     palette: 'sky-600',  desc: '강조 텍스트' },
    { token: 'text-onaccent',   palette: 'white',    desc: 'bg-accent 위 텍스트', border: true },
    { token: 'text-oninverse',  palette: 'white',    desc: 'bg-inverse 위 텍스트', border: true },
    { token: 'text-link',       palette: 'sky-700',  desc: '하이퍼링크' },
    { token: 'text-critical',   palette: 'red-600',  desc: '크리티컬 텍스트' },
    { token: 'text-oncritical', palette: 'white',    desc: 'bg-critical 위 텍스트', border: true },
  ]} />;
}

export function BorderColorTable() {
  return <SemanticColorTable rows={[
    { token: 'border-default', palette: 'gray-200', desc: '기본 구분선·테두리', border: true },
    { token: 'border-strong',  palette: 'gray-400', desc: '눈에 띄어야 하는 테두리 (같은 회색 계열)', border: true },
    { token: 'border-accent',  palette: 'sky-600',  desc: '선택·활성 상태의 테두리, 강조 안내선' },
  ]} />;
}

export function IconColorTable() {
  return <SemanticColorTable rows={[
    { token: 'icon-default',   palette: 'gray-900', desc: '기본 아이콘' },
    { token: 'icon-secondary', palette: 'gray-500', desc: '보조 아이콘' },
    { token: 'icon-accent',    palette: 'sky-500',  desc: '강조 아이콘' },
    { token: 'icon-onaccent',  palette: 'white',    desc: 'bg-accent 위 아이콘', border: true },
    { token: 'icon-oninverse', palette: 'white',    desc: 'bg-inverse 위 아이콘', border: true },
    { token: 'icon-critical',  palette: 'red-600',  desc: '크리티컬 아이콘' },
  ]} />;
}

/* 값만 적힌 표로는 12px과 16px의 차이가 손에 안 잡힌다 — 고를 때 눈으로
   대보라고 같은 크기의 상자에 실제 반경을 입혀 나란히 놓는다 */
export function RadiusTable() {
  const rows = [
    { token: '--radius-xs',   value: '4px',    use: '태그, 작은 배지' },
    { token: '--radius-sm',   value: '8px',    use: '입력칸, 메뉴 줄, 작은 버튼' },
    { token: '--radius-md',   value: '12px',   use: '버튼, 카드, 팝오버' },
    { token: '--radius-lg',   value: '16px',   use: '큰 카드, 시트' },
    { token: '--radius-xl',   value: '20px',   use: '모달, 바텀시트' },
    { token: '--radius-full', value: '9999px', use: '알약 버튼, 아바타, 토글' },
  ];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={tableHead}>
          <th style={th}>Token</th>
          <th style={th}>Sample</th>
          <th style={th}>Value</th>
          <th style={th}>어디에 쓰나</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.token}>
            <td style={{ ...td, whiteSpace: 'nowrap' }}><code style={{ fontSize: 12 }}>{r.token}</code></td>
            <td style={{ ...td, padding: '8px 12px' }}>
              <div style={{
                width: 56, height: 40,
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: `var(${r.token})`,
              }} />
            </td>
            <td style={{ ...td, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{r.value}</td>
            <td style={{ ...td, color: 'var(--color-text-secondary)' }}>{r.use}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ShadowTable() {
  return <DescTable rows={[
    { token: '--shadow-sm',      desc: '카드, 소형 팝오버' },
    { token: '--shadow-md',      desc: '드롭다운, 툴팁' },
    { token: '--shadow-lg',      desc: '고정 헤더, 사이드바' },
    { token: '--shadow-overlay', desc: '모달, 바텀 시트' },
  ]} />;
}

export function SemanticSpacingTable() {
  const rows = [
    { token: '--global-padding-t', value: '16px', desc: '페이지 상단 패딩' },
    { token: '--global-padding-b', value: '24px', desc: '페이지 하단 패딩' },
    { token: '--global-padding-l', value: '20px', desc: '페이지 좌측 패딩' },
    { token: '--global-padding-r', value: '20px', desc: '페이지 우측 패딩' },
    { token: '--section-gap',      value: '32px', desc: '섹션 간 간격' },
    { token: '--component-gap',    value: '16px', desc: '컴포넌트 간 간격' },
    { token: '--item-gap',         value: '8px',  desc: '리스트 아이템 간 간격' },
  ];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={tableHead}>
          <th style={th}>Token</th>
          <th style={{ ...th, padding: '8px 12px' }}>Value</th>
          <th style={th}>용도</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.token}>
            <td style={td}><code style={{ fontSize: 12 }}>{r.token}</code></td>
            <td style={{ ...td, padding: '8px 12px', color: 'var(--color-text-secondary)' }}>{r.value}</td>
            <td style={td}>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
