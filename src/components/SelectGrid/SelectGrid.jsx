import styles from './SelectGrid.module.css';

/* 고르기 격자(2026-10-13, 냉장고 표정 고르기 시트에서 옮겼다). 시트 안에서 여럿 중 하나를 골라 바로 닫는 칸들이다.
   칸은 회색 면(bg-tertiary)이고 글자(표정·특수문자)나 그림 미리보기를 담는다.
   한 줄 띠에서 고르는 작은 칸은 SelectTile이다. 이것은 시트 본문을 채우는 큰 칸이다.
   고를 것이 많은 편집 화면은 아래 자리 칩의 속(EditTrayBody)에도 둔다. 본문 상한 안에서 넘긴다

   - columns: 한 줄 칸 수. 기본 3
   - 칸은 SelectGridItem. selected면 primary 2 테두리, label은 낭독기 이름 */
export function SelectGrid({ columns = 3, label, className, children, ...props }) {
  return (
    <div role="group" aria-label={label} className={[styles.grid, className].filter(Boolean).join(' ')}
      style={{ '--select-grid-columns': columns }} {...props}>
      {children}
    </div>
  );
}

/* ratio를 주면 그 비율(폭 / 높이)의 칸이 되고, 없으면 글자 한 줄 높이(64)다.
   order: 여러 개를 고르는 격자에서 고른 차례(1부터). 주면 칸 오른쪽 위에 번호 동그라미가 선다 */
export function SelectGridItem({ selected = false, label, ratio, order, className, style, children, ...props }) {
  return (
    <button type="button" aria-pressed={selected} aria-label={order ? `${label}, ${order}번째` : label}
      className={['text-label-lg', styles.item, ratio && styles.ratio, className].filter(Boolean).join(' ')}
      style={ratio ? { aspectRatio: String(ratio), ...style } : style} {...props}>
      {children}
      {!!order && <span className={`text-label-sm ${styles.order}`} aria-hidden="true">{order}</span>}
    </button>
  );
}
