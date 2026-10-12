import { forwardRef } from 'react';
import styles from './SelectTile.module.css';

/* 선택 타일(2026-10-12, 덕꾸 앱의 SelectTile을 웹으로 옮겼다). 편집 화면 아래 자리에서 여럿 중 하나를 고르는 네모 칸이다.
   안에는 무엇이든 담는다(색 견본, 아이콘, 사진·그림 미리보기).

   타일을 조합해 쓰는 두 축 중 칸 쪽이다. 담는 그릇은 SelectRow, 색 타일을 채운 줄은 ColorPalette다.

   forwardRef: Popover의 trigger로 쓴다(색 직접 고르기 타일을 누르면 선택기가 뜬다) */
const SelectTile = forwardRef(function SelectTile({
  selected = false,
  size = 'md',          // 'md'(칸 40) | 'sm'(칸 32)
  label,                // 낭독기 이름. showLabel이면 칸 아래 글자로도 선다
  showLabel = false,
  fill,                 // 색(#hex). 주면 칸 자체를 그 색으로 칠한다. 칸 안에 견본을 따로 두지 않는다(2026-10-13)
  className,
  children,
  ...props              // onClick 등은 단추에 붙는다
}, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[styles.tile, showLabel && styles.labeled, className].filter(Boolean).join(' ')}
      aria-pressed={selected}
      aria-label={showLabel ? undefined : label}
      {...props}
    >
      <span className={[styles.box, styles[size], fill && styles.filled, selected && styles.on].filter(Boolean).join(' ')}
        style={fill ? { background: fill } : undefined}>{children}</span>
      {showLabel && <span className={`text-label-xs ${styles.label}`}>{label}</span>}
    </button>
  );
});

export default SelectTile;

/* 칸을 채우는 그림(사진·그림 미리보기)에 준다. 그림이 칸 안에 다 보인다 */
export const tileFillClass = styles.fill;

/* 동그란 색 견본. 둘레 선은 그림 위에 얹는 border-overlay(하양 견본도 바탕과 갈린다) */
export function ColorDot({ value, size = 'md' }) {
  return <span className={`${styles.dot} ${styles['dot-' + size]}`} style={{ background: value }} />;
}

/* 무지개 견본(색 직접 고르기). 가운데를 도는 색상환을 크게 흐려 색이 부드럽게 섞인 동그라미다.
   앱은 그림으로 굽고(dukku scripts/rainbow-chip.mjs), 웹은 같은 색 마디를 CSS로 그린다 */
export function RainbowDot({ size = 'md' }) {
  return <span className={`${styles.dot} ${styles['dot-' + size]} ${styles.rainbow}`} />;
}
