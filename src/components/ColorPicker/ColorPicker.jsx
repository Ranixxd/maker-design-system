import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Button from '../Button/index.js';
import styles from './ColorPicker.module.css';

/* 여섯 자리 hex만 받는다. 세 자리(#abc)는 늘려서 받는다. 불투명도(여덟 자리)는 받지 않는다 */
function toHex6(v) {
  const s = String(v || '').trim().replace(/^#/, '').toLowerCase();
  if (/^[0-9a-f]{6}$/.test(s)) return '#' + s;
  if (/^[0-9a-f]{3}$/.test(s)) return '#' + s.split('').map((c) => c + c).join('');
  return null;
}

/* 색 하나를 고르는 판. 위에서부터 hex 칸과 [적용], 진하기·밝기 네모와 색상 막대.

   ── hex 칸이 맨 위다(2026-10-18 사용자) ──
   바텀시트에 띄우면 시트를 끌어내리려고 짚은 손가락이 바로 아래 네모에 닿아 색이 바뀌었다.
   손으로 끌지 않는 hex 칸을 시트 머리와 네모 사이에 두면 그 사이를 막아 준다. 전에는 맨 아래였다.

   ── 불투명도가 없다 ──
   카톡테마 메이커의 테마 색은 불투명이다. 막대가 있으면 투명하게 골랐는데
   결과에는 안 나오는 일이 생긴다(2026-09-18 사용자).

   ── 스포이드는 없다 ──
   웹은 화면 픽셀을 읽을 수 없어 페이지를 그림으로 다시 그려야 하는데, 폰에서 몇 초씩 걸렸다.
   데스크톱 크롬의 EyeDropper만으로는 기기마다 같은 경험이 안 된다. 스펙아웃(2026-09-18 사용자)

   ── [적용]을 누를 때만 onChange(2026-10-21 사용자) ──
   네모·막대·hex 칸은 판 안의 색(pick)만 바꾼다. 끄는 대로 뒤 화면을 다시 그리면 폰에서 버벅였다.
   전에는 끄는 대로 onChange였다 */
export default function ColorPicker({
  value,
  onChange,
  label = '색상',
  className,
}) {
  const hex = toHex6(value) || '#000000';
  /* 판 안에서 고르는 중인 색. 바깥 값이 바뀌면 따라간다 */
  const [pick, setPick] = useState(hex);
  useEffect(() => { setPick(hex); }, [hex]);
  /* hex 칸은 치는 동안의 글자를 따로 든다. 덜 친 값(3A7)으로 색을 바꾸지 않는다 */
  const [draft, setDraft] = useState(hex.slice(1).toUpperCase());
  const [editing, setEditing] = useState(false);
  useEffect(() => { if (!editing) setDraft(pick.slice(1).toUpperCase()); }, [pick, editing]);

  const onDraft = (e) => {
    const t = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6).toUpperCase();
    setDraft(t);
    if (t.length === 6) setPick('#' + t.toLowerCase());
  };
  /* 칸을 벗어날 때 세 자리는 늘려 받고, 틀린 값은 고르던 색으로 돌린다 */
  const settle = () => {
    const v = toHex6(draft) || pick;
    setEditing(false);
    setPick(v);
    setDraft(v.slice(1).toUpperCase());
    return v;
  };
  const apply = (v) => { if (v !== hex) onChange?.(v); };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.row}>
        <label className={styles.hex}>
          <span className={`text-body-md ${styles.hash}`} aria-hidden="true">#</span>
          <input
            className={`text-body-md ${styles.hexInput}`}
            value={draft}
            onChange={onDraft}
            onFocus={(e) => { setEditing(true); e.target.select(); }}
            onBlur={settle}
            onKeyDown={(e) => { if (e.key === 'Enter') { apply(settle()); e.currentTarget.blur(); } }}
            aria-label={`${label} hex 코드`}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={6}
          />
        </label>
        <Button variant="secondary" size="md" disabled={pick === hex} onClick={() => apply(pick)}>적용</Button>
      </div>
      <HexColorPicker className={styles.picker} color={pick} onChange={(c) => setPick(c.toLowerCase())} aria-label={label} />
    </div>
  );
}
