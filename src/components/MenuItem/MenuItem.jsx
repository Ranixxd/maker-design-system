import Icon from '../Icon/Icon';
import styles from './MenuItem.module.css';

/* Popover 안에 들어가는 짧은 줄.

   ListItem과 겹쳐 보이지만 자리가 다르다 — ListItem은 화면을 채우는 목록의 한 줄이라
   부제(sub)를 달고 여백이 넉넉하다. MenuItem은 이미 열려 있는 작은 패널 안이라
   낮고 좁아야 한다. 목록용을 그대로 쓰면 팝오버가 의도보다 커진다. */
export default function MenuItem({
  label,
  icon,
  variant = 'normal',   // 'normal' | 'critical'
  trailing,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={[styles.item, styles[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {icon && <Icon name={icon} size="sm" className={styles.leading} />}
      <span className={`text-body-2 ${styles.label}`}>{label}</span>
      {trailing !== undefined && <span className={styles.trailing}>{trailing}</span>}
    </button>
  );
}
