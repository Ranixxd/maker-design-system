import Icon from '../Icon/Icon';
import styles from './CornerButton.module.css';

/* 모서리 단추(2026-10-13). 칸·칩 오른쪽 위에 걸쳐 앉는 작은 원 단추다(지우기 ×, 편집 연필, 뒤집기 ⇅).
   흰 바탕·옅은 테두리·진한 표시. 덕꾸 앱의 같은 단추와 값이 같다(20, 8 걸침).

   감싸는 칸이 position: relative여야 한다. 단추는 그 칸의 오른쪽 위에서 8씩 바깥으로 나간다.
   칸이 가로로 넘기는 줄 안에 있으면 줄이 위아래로 8을 비워야 단추가 잘리지 않는다 */
export default function CornerButton({
  icon = 'X',           // 'X'(지우기) | 'Pencil'(편집) | 'ArrowUpDown'(뒤집기)
  label,                // 낭독기 이름(예: "레이어 2 지우기")
  className,
  ...props              // onClick 등은 단추에 붙는다
}) {
  return (
    <button type="button" aria-label={label} className={[styles.btn, className].filter(Boolean).join(' ')} {...props}>
      <Icon name={icon} size="sm" className={styles.icon} />
    </button>
  );
}
