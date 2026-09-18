import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorPicker.module.css';

/* 여섯 자리 hex만 받는다. 세 자리(#abc)는 늘려서 받는다. 불투명도(여덟 자리)는 받지 않는다 */
function toHex6(v) {
  const s = String(v || '').trim().replace(/^#/, '').toLowerCase();
  if (/^[0-9a-f]{6}$/.test(s)) return '#' + s;
  if (/^[0-9a-f]{3}$/.test(s)) return '#' + s.split('').map((c) => c + c).join('');
  return null;
}

/* 색 하나를 고르는 판. 진하기·밝기 네모와 색상 막대, hex 칸.

   ── 불투명도가 없다 ──
   카톡테마 메이커의 테마 색은 불투명이다. 막대가 있으면 투명하게 골랐는데
   결과에는 안 나오는 일이 생긴다(2026-09-18 사용자).

   ── 스포이드는 없다 ──
   웹은 화면 픽셀을 읽을 수 없어 페이지를 그림으로 다시 그려야 하는데, 폰에서 몇 초씩 걸렸다.
   데스크톱 크롬의 EyeDropper만으로는 기기마다 같은 경험이 안 된다. 스펙아웃(2026-09-18 사용자)

   ── 끄는 대로 onChange ──
   확인 단추를 두지 않는다. 브라우저 기본 선택기도 끄는 동안 값이 바뀐다 */
export default function ColorPicker({
  value,
  onChange,
  label = '색상',
  className,
}) {
  const hex = toHex6(value) || '#000000';
  /* hex 칸은 치는 동안의 글자를 따로 든다. 덜 친 값(3A7)으로 색을 바꾸지 않는다 */
  const [draft, setDraft] = useState(hex.slice(1).toUpperCase());
  const [editing, setEditing] = useState(false);
  useEffect(() => { if (!editing) setDraft(hex.slice(1).toUpperCase()); }, [hex, editing]);

  const onDraft = (e) => {
    const t = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6).toUpperCase();
    setDraft(t);
    if (t.length === 6) onChange?.('#' + t.toLowerCase());
  };
  /* 칸을 벗어날 때 세 자리는 늘려 받고, 틀린 값은 지금 색으로 돌린다 */
  const onBlur = () => {
    setEditing(false);
    const v = toHex6(draft);
    if (v && v !== hex) onChange?.(v);
    setDraft((v || hex).slice(1).toUpperCase());
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <HexColorPicker className={styles.picker} color={hex} onChange={(c) => onChange?.(c.toLowerCase())} aria-label={label} />
      <div className={styles.row}>
        <label className={styles.hex}>
          <span className={`text-body-md ${styles.hash}`} aria-hidden="true">#</span>
          <input
            className={`text-body-md ${styles.hexInput}`}
            value={draft}
            onChange={onDraft}
            onFocus={(e) => { setEditing(true); e.target.select(); }}
            onBlur={onBlur}
            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
            aria-label={`${label} hex 코드`}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={6}
          />
        </label>
      </div>
    </div>
  );
}
