import Icon from '../Icon/Icon';
import styles from './Chip.module.css';

/* 알약 모양의 작은 고르개. 여럿 중 하나를 걸러 보는 자리에 선다
   (이모지 분류, 말풍선 색, 좋아하는 색, 편집 패널 구역).

   선택 상태가 있다(selected). 눌러서 이동만 하는 것에는 쓰지 않는다 —
   그건 링크나 Button이다. 여러 개가 한 줄에 서므로 줄바꿈하지 않고,
   넘치면 부모가 가로로 굴린다 */
export default function Chip({
  children,
  selected = false,
  leading,              // 글자 앞 작은 그림(이모지 등)
  onRemove,             // 주면 칩 안 오른쪽에 ×가 선다(2026-10-13). 칩을 지우는 일만 한다
  removeLabel,          // × 낭독기 이름(예: "레이어 2 지우기")
  className,
  ...props
}) {
  const chip = (
    <button
      type="button"
      className={[styles.chip, selected && styles.on, onRemove && styles.withRemove, onRemove ? null : className].filter(Boolean).join(' ')}
      aria-pressed={selected}
      {...props}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      <span className={`text-label-sm ${styles.label}`}>{children}</span>
    </button>
  );
  if (!onRemove) return chip;
  /* 단추 안에 단추를 둘 수 없어 칩과 ×를 한 상자에 나란히 담고 ×를 칩 안쪽 오른쪽에 얹는다 */
  return (
    <span className={[styles.removable, selected && styles.removableOn, className].filter(Boolean).join(' ')}>
      {chip}
      <button type="button" className={styles.remove} aria-label={removeLabel} onClick={onRemove}>
        <Icon name="X" size="sm" className={styles.removeIcon} />
      </button>
    </span>
  );
}
