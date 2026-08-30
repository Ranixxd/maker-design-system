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
    { token: '.text-heading-1', size: '28px', weight: '600', lh: '1' },
    { token: '.text-heading-2', size: '24px', weight: '600', lh: '1' },
    { token: '.text-heading-3', size: '20px', weight: '600', lh: '1' },
    { token: '.text-body-1',    size: '17px', weight: '400', lh: '1.5' },
    { token: '.text-body-2',    size: '15px', weight: '400', lh: '1.5' },
    { token: '.text-body-3',    size: '13px', weight: '400', lh: '1.5' },
    { token: '.text-label-1',   size: '15px', weight: '500', lh: '1' },
    { token: '.text-label-2',   size: '13px', weight: '500', lh: '1' },
    { token: '.text-label-3',   size: '11px', weight: '500', lh: '1' },
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

export function BgDescTable() {
  return <DescTable rows={[
    { token: 'bg-default',          desc: '기본 페이지 배경' },
    { token: 'bg-secondary',        desc: '카드·패널 배경' },
    { token: 'bg-tertiary',         desc: '입력 필드·구분 영역 배경' },
    { token: 'bg-hover',            desc: '호버 상태 오버레이' },
    { token: 'bg-pressed',          desc: '프레스 상태' },
    { token: 'bg-accent',           desc: '강조 배경 (sky-500)' },
    { token: 'bg-overlay',          desc: '딤 레이어' },
    { token: 'bg-inverse',          desc: '인버스 컴포넌트 배경 (프라이머리 버튼 등)' },
    { token: 'bg-critical',         desc: '크리티컬 배경 (red-600)' },
    { token: 'bg-critical-subtle',  desc: '크리티컬 보조 배경 (red-150)' },
  ]} />;
}

export function TextDescTable() {
  return <DescTable rows={[
    { token: 'text-default',     desc: '기본 본문' },
    { token: 'text-secondary',   desc: '보조 텍스트' },
    { token: 'text-tertiary',    desc: '비활성·플레이스홀더' },
    { token: 'text-accent',      desc: '강조 텍스트 (sky 계열)' },
    { token: 'text-onaccent',    desc: 'bg-accent 위 텍스트' },
    { token: 'text-oninverse',   desc: 'bg-inverse 위 텍스트' },
    { token: 'text-link',        desc: '하이퍼링크' },
    { token: 'text-critical',    desc: '크리티컬 텍스트 (red-600)' },
    { token: 'text-oncritical',  desc: 'bg-critical 위 텍스트' },
  ]} />;
}

export function IconDescTable() {
  return <DescTable rows={[
    { token: 'icon-default',    desc: '기본 아이콘' },
    { token: 'icon-secondary',  desc: '보조 아이콘' },
    { token: 'icon-accent',     desc: '강조 아이콘 (sky 계열)' },
    { token: 'icon-onaccent',   desc: 'bg-accent 위 아이콘' },
    { token: 'icon-oninverse',  desc: 'bg-inverse 위 아이콘' },
    { token: 'icon-critical',   desc: '크리티컬 아이콘 (red-600)' },
  ]} />;
}

export function RadiusTable() {
  return <DescTable col2="Value" rows={[
    { token: '--radius-xs',   desc: '4px' },
    { token: '--radius-sm',   desc: '8px' },
    { token: '--radius-md',   desc: '12px' },
    { token: '--radius-lg',   desc: '16px' },
    { token: '--radius-xl',   desc: '20px' },
    { token: '--radius-full', desc: '9999px' },
  ]} />;
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
