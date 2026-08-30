import { useState } from 'react';

export default {
  title: 'Tokens/Motion',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Standard 이징·듀레이션 토큰. ' +
          '요소의 이동 방향(진입·이탈·유지)과 크기에 따라 조합한다.',
      },
    },
  },
};

/* ─────────────────────────────────────────────
   공용 스타일
───────────────────────────────────────────── */
const S = {
  section: { marginBottom: 56 },
  heading: {
    fontSize: 13, fontWeight: 600,
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.06em', textTransform: 'uppercase',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14, color: 'var(--color-text-secondary)',
    lineHeight: 1.6, marginBottom: 20,
  },
  subheading: {
    fontSize: 14, fontWeight: 600,
    color: 'var(--color-text-default)',
    marginBottom: 12, marginTop: 32,
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: {
    textAlign: 'left', padding: '8px 16px 8px 0',
    fontWeight: 600, color: 'var(--color-text-secondary)',
    borderBottom: '1px solid var(--color-border-default)',
  },
  td: {
    padding: '12px 16px 12px 0',
    borderBottom: '1px solid var(--color-border-default)',
    verticalAlign: 'middle',
  },
  code: {
    fontFamily: 'monospace', fontSize: 12,
    background: 'var(--color-bg-secondary)',
    padding: '2px 6px', borderRadius: 4,
  },
  playBtn: {
    fontSize: 12, padding: '4px 10px',
    border: '1px solid var(--color-border-default)',
    borderRadius: 6, background: 'none',
    cursor: 'pointer', color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
  },
  groupLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--color-text-tertiary)',
    padding: '16px 0 4px',
  },
};

const badge = (good) => ({
  display: 'inline-block', padding: '2px 8px', borderRadius: 4,
  fontSize: 12, fontWeight: 700, marginBottom: 10,
  background: good ? '#dcfce7' : '#fee2e2',
  color: good ? '#166534' : '#991b1b',
});

/* ─────────────────────────────────────────────
   Easing
───────────────────────────────────────────── */
const EASINGS = [
  {
    token: '--motion-easing-standard',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    label: '표준',
    when: '화면 안에서 시작·종료. 상태 변화, 탭 전환, 토글 등.',
  },
  {
    token: '--motion-easing-standard-decelerate',
    value: 'cubic-bezier(0, 0, 0, 1)',
    label: '감속 — 진입',
    when: '화면 밖에서 진입하는 요소. 최고 속도로 시작해 부드럽게 착지.',
  },
  {
    token: '--motion-easing-standard-accelerate',
    value: 'cubic-bezier(0.3, 0, 1, 1)',
    label: '가속 — 이탈',
    when: '화면 밖으로 이탈하는 요소. 정지에서 시작해 최고 속도로 퇴장.',
  },
];

function EasingRow({ token, value, label, when }) {
  const [playing, setPlaying] = useState(false);
  const replay = () => {
    setPlaying(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setPlaying(true)));
  };
  return (
    <tr>
      <td style={S.td}><code style={S.code}>{token}</code></td>
      <td style={S.td}><strong>{label}</strong></td>
      <td style={{ ...S.td, maxWidth: 220 }}>
        <code style={{ ...S.code, wordBreak: 'break-all' }}>{value}</code>
      </td>
      <td style={S.td}>
        <div style={{ width: 160, position: 'relative', height: 36, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            left: playing ? 'calc(100% - 36px)' : 0,
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--color-bg-inverse)',
            transition: `left 0.5s ${value}`,
          }} />
        </div>
      </td>
      <td style={S.td}>{when}</td>
      <td style={S.td}>
        <button style={S.playBtn} onClick={replay}>재생</button>
      </td>
    </tr>
  );
}

export const Easing = {
  name: 'Easing',
  render: () => (
    <div style={S.section}>
      <p style={S.heading}>Easing</p>
      <p style={S.desc}>
        이징은 duration 안에서 값이 변하는 가속도 패턴이다.
        요소가 어느 방향으로 움직이는지에 따라 선택한다.
      </p>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}>토큰</th>
            <th style={S.th}>이름</th>
            <th style={S.th}>값</th>
            <th style={S.th}>미리보기</th>
            <th style={S.th}>사용 시점</th>
            <th style={S.th} />
          </tr>
        </thead>
        <tbody>
          {EASINGS.map((e) => <EasingRow key={e.token} {...e} />)}
        </tbody>
      </table>
    </div>
  ),
};

/* ─────────────────────────────────────────────
   Duration — M3 full set
───────────────────────────────────────────── */
const DURATION_GROUPS = [
  {
    group: 'Short',
    desc: '버튼·칩·아이콘 등 아주 작은 요소. 이탈 전환.',
    items: [
      { token: '--motion-duration-short-1', value: '50ms',  w: 16, h: 16 },
      { token: '--motion-duration-short-2', value: '100ms', w: 20, h: 20 },
      { token: '--motion-duration-short-3', value: '150ms', w: 28, h: 28 },
      { token: '--motion-duration-short-4', value: '200ms', w: 36, h: 36, alias: '(alias: --motion-duration-short)' },
    ],
  },
  {
    group: 'Medium',
    desc: '드롭다운·메뉴·스낵바·소형 카드 등.',
    items: [
      { token: '--motion-duration-medium-1', value: '250ms', w: 48, h: 40 },
      { token: '--motion-duration-medium-2', value: '300ms', w: 60, h: 44 },
      { token: '--motion-duration-medium-3', value: '350ms', w: 72, h: 48 },
      { token: '--motion-duration-medium-4', value: '400ms', w: 80, h: 52, alias: '(alias: --motion-duration-medium)' },
    ],
  },
  {
    group: 'Long',
    desc: '바텀시트·모달 등 큰 요소. 진입 전환.',
    items: [
      { token: '--motion-duration-long-1', value: '450ms', w: 90,  h: 56 },
      { token: '--motion-duration-long-2', value: '500ms', w: 100, h: 60, alias: '(alias: --motion-duration-long)' },
      { token: '--motion-duration-long-3', value: '550ms', w: 110, h: 64 },
      { token: '--motion-duration-long-4', value: '600ms', w: 120, h: 68 },
    ],
  },
  {
    group: 'Extra long',
    desc: '화면 전체를 덮는 전환. 온보딩·첫 진입 등.',
    items: [
      { token: '--motion-duration-extra-long-1', value: '700ms',  w: 130, h: 72 },
      { token: '--motion-duration-extra-long-2', value: '800ms',  w: 140, h: 76 },
      { token: '--motion-duration-extra-long-3', value: '900ms',  w: 150, h: 80 },
      { token: '--motion-duration-extra-long-4', value: '1000ms', w: 160, h: 84 },
    ],
  },
];

function DurationRow({ token, value, alias, w, h }) {
  const [visible, setVisible] = useState(true);
  const replay = () => {
    setVisible(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };
  return (
    <tr>
      <td style={S.td}>
        <code style={S.code}>{token}</code>
        {alias && <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{alias}</div>}
      </td>
      <td style={S.td}>{value}</td>
      <td style={S.td}>
        <div style={{
          width: w, height: h, borderRadius: 6,
          background: 'var(--color-bg-inverse)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.85)',
          transition: `opacity ${value} cubic-bezier(0.2,0,0,1), transform ${value} cubic-bezier(0.2,0,0,1)`,
        }} />
      </td>
      <td style={S.td}>
        <button style={S.playBtn} onClick={replay}>재생</button>
      </td>
    </tr>
  );
}

export const Duration = {
  name: 'Duration',
  render: () => (
    <div style={S.section}>
      <p style={S.heading}>Duration</p>
      <p style={S.desc}>
        요소가 차지하는 화면 영역에 비례해 duration을 선택한다.
        이탈 전환은 진입보다 한 단계 짧은 그룹을 사용한다.
      </p>
      {DURATION_GROUPS.map((g) => (
        <div key={g.group} style={{ marginBottom: 32 }}>
          <p style={S.groupLabel}>{g.group}</p>
          <p style={{ ...S.desc, marginBottom: 8 }}>{g.desc}</p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>토큰</th>
                <th style={S.th}>값</th>
                <th style={S.th}>미리보기 (요소 크기 비례)</th>
                <th style={S.th} />
              </tr>
            </thead>
            <tbody>
              {g.items.map((d) => <DurationRow key={d.token} {...d} />)}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  ),
};

/* ─────────────────────────────────────────────
   Guide — 조합 가이드
───────────────────────────────────────────── */

/* 진입·이탈 가이드 (구체적 토큰 포함) */
const COMBO_GUIDE = [
  {
    scenario: '화면 진입',
    easing: 'standard-decelerate',
    small: 'medium-2 (300ms)',
    medium: 'medium-4 (400ms)',
    large: 'long-2 (500ms)',
    example: '바텀시트·모달 열기',
    note: '부드럽게 착지. 새 콘텐츠에 집중할 수 있게 duration을 길게.',
  },
  {
    scenario: '화면 이탈',
    easing: 'standard-accelerate',
    small: 'short-4 (200ms)',
    medium: 'medium-2 (300ms)',
    large: 'medium-4 (400ms)',
    example: '바텀시트·모달 닫기',
    note: '이탈은 진입보다 한 단계 짧게. 사용자 다음 액션을 방해하지 않는다.',
  },
  {
    scenario: '화면 내 전환',
    easing: 'standard',
    small: 'short-3~4 (150~200ms)',
    medium: 'medium-2 (300ms)',
    large: 'medium-4 (400ms)',
    example: '상태 토글, 탭 전환, 확장·축소',
    note: '요소가 화면 안에 머무르며 상태만 바뀌는 경우.',
  },
];

function SlideDemo({ enterEasing, enterDuration, exitEasing, exitDuration, label }) {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        height: 80,
        background: 'var(--color-bg-secondary)',
        borderRadius: 10,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 10,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'var(--color-bg-inverse)',
          borderRadius: 10,
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          transition: visible
            ? `transform ${enterDuration} ${enterEasing}`
            : `transform ${exitDuration} ${exitEasing}`,
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{label}</span>
        <button style={S.playBtn} onClick={() => setVisible((v) => !v)}>
          {visible ? '닫기' : '열기'}
        </button>
      </div>
    </div>
  );
}

function SizeDemo({ items, isGood }) {
  const [visible, setVisible] = useState(false);
  const replay = () => {
    setVisible(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={badge(isGood)}>{isGood ? 'Do' : "Don't"}</div>
      <div style={{
        display: 'flex', gap: 12, alignItems: 'flex-end',
        padding: '16px', height: 100,
        background: 'var(--color-bg-secondary)',
        borderRadius: 10, marginBottom: 10, boxSizing: 'border-box',
      }}>
        {items.map((item) => (
          <div key={item.id} style={{
            width: item.w, height: item.h, flexShrink: 0,
            background: 'var(--color-bg-inverse)',
            borderRadius: 6,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity ${item.duration} cubic-bezier(0.2,0,0,1), transform ${item.duration} cubic-bezier(0.2,0,0,1)`,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {items.map((item) => (
            <div key={item.id}>{item.label} → {item.duration}</div>
          ))}
        </div>
        <button style={S.playBtn} onClick={replay}>재생</button>
      </div>
    </div>
  );
}

export const Guide = {
  name: '조합 가이드',
  render: () => (
    <div>
      {/* 권장 조합 */}
      <div style={S.section}>
        <p style={S.heading}>권장 조합</p>
        <p style={S.desc}>
          상황·요소 크기별 이징·듀레이션 기본 조합. 진입은 길게, 이탈은 한 단계 짧게.
        </p>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>상황</th>
              <th style={S.th}>이징</th>
              <th style={S.th}>Small</th>
              <th style={S.th}>Medium</th>
              <th style={S.th}>Large</th>
              <th style={S.th}>예시</th>
              <th style={S.th}>이유</th>
            </tr>
          </thead>
          <tbody>
            {COMBO_GUIDE.map((p) => (
              <tr key={p.scenario}>
                <td style={S.td}><strong>{p.scenario}</strong></td>
                <td style={S.td}>
                  <code style={S.code}>--motion-easing-{p.easing}</code>
                </td>
                <td style={S.td}><code style={S.code}>{p.small}</code></td>
                <td style={S.td}><code style={S.code}>{p.medium}</code></td>
                <td style={S.td}><code style={S.code}>{p.large}</code></td>
                <td style={S.td}>{p.example}</td>
                <td style={{ ...S.td, color: 'var(--color-text-secondary)', fontSize: 13 }}>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 핵심 규칙 */}
      <div style={S.section}>
        <p style={S.heading}>핵심 규칙</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16, marginBottom: 32,
        }}>
          {[
            { title: '진입 > 이탈', body: '이탈 duration은 진입보다 한 단계 짧게. 빠르게 비켜줘야 사용자 다음 액션을 방해하지 않는다.' },
            { title: '크기 ∝ duration', body: '요소가 클수록 duration이 길어야 자연스럽다. 작은 버튼에 500ms를 쓰면 둔하게 느껴진다.' },
            { title: '방향 ∝ 이징', body: '진입→감속(decelerate), 이탈→가속(accelerate), 화면 내→표준(standard). 이징을 섞으면 어색하다.' },
          ].map((r) => (
            <div key={r.title} style={{
              padding: 16, borderRadius: 12,
              background: 'var(--color-bg-secondary)',
            }}>
              <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{r.title}</p>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Do/Don't */}
      <div style={S.section}>
        <p style={S.heading}>Do / Don't</p>

        <p style={S.subheading}>진입에는 감속(decelerate), 이탈에는 가속(accelerate)</p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={badge(true)}>Do</div>
            <SlideDemo
              enterEasing="cubic-bezier(0, 0, 0, 1)"
              enterDuration="400ms"
              exitEasing="cubic-bezier(0.3, 0, 1, 1)"
              exitDuration="200ms"
              label="진입 decelerate 400ms / 이탈 accelerate 200ms"
            />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={badge(false)}>Don't</div>
            <SlideDemo
              enterEasing="cubic-bezier(0.3, 0, 1, 1)"
              enterDuration="400ms"
              exitEasing="cubic-bezier(0, 0, 0, 1)"
              exitDuration="400ms"
              label="진입 accelerate / 이탈 decelerate — 뚝 멈추고 주저앉는 느낌"
            />
          </div>
        </div>

        <p style={S.subheading}>요소 크기에 비례해 duration을 늘린다</p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <SizeDemo
            isGood={true}
            items={[
              { id: 'sm', w: 32, h: 32, duration: '200ms', label: '작은 버튼 → short-4 (200ms)' },
              { id: 'lg', w: 100, h: 64, duration: '500ms', label: '큰 모달 → long-2 (500ms)' },
            ]}
          />
          <SizeDemo
            isGood={false}
            items={[
              { id: 'sm', w: 32, h: 32, duration: '500ms', label: '작은 버튼 → 500ms (둔하게 느껴짐)' },
              { id: 'lg', w: 100, h: 64, duration: '200ms', label: '큰 모달 → 200ms (갑작스럽게 느껴짐)' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};
