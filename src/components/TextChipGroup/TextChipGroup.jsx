import { Fragment } from 'react';
import styles from './TextChipGroup.module.css';

/* 글자형 칩 묶음(2026-11-22). 상자 없이 글자만 가운뎃점(·)으로 잇고 그중 하나를 고른다.
   덕꾸 앱 TextChipGroup과 같은 자리·같은 이름이다(앱 쪽 규칙은 앱 스토리북).

   - items: [{ value, label }]
   - value: 고른 값. 늘 하나가 골라져 있다
   - label: 묶음 이름. 화면에 글자로 서지 않으니 읽어 주는 이름으로 꼭 준다
   - inset: 줄 양 끝 여백. 기본 16(ChipGroup과 같다). 바로 위 칩 줄과 글자 시작이 맞는다 */
export default function TextChipGroup({
  items,
  value,
  onChange,
  inset = 'var(--spacing-4)',
  disabled = false,
  label,
  className,
  ...props
}) {
  return (
    <div role="group" aria-label={label} data-mds="text-chip-group"
      className={[styles.line, className].filter(Boolean).join(' ')}
      style={{ '--text-chip-inset': typeof inset === 'number' ? `${inset}px` : inset }}
      {...props}>
      {items.map((it, i) => {
        const on = value === it.value;
        return (
          <Fragment key={it.value}>
            {i > 0 && <span className={`text-label-sm ${styles.dot}`} aria-hidden="true">·</span>}
            <button type="button" aria-pressed={on} disabled={disabled}
              className={[styles.item, on && styles.on].filter(Boolean).join(' ')}
              onClick={() => onChange(it.value)}>
              <span className="text-label-sm">{it.label}</span>
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
