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
  size = 'md',          // 'md' | 'lg'
  trailing,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={[styles.item, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      {icon && <Icon name={icon} size="sm" className={styles.leading} />}
      {/* 둘 다 label이다 — 읽는 글이 아니라 누르는 것의 이름이고, 한 줄로
          끝나므로 행간도 single이 맞다.

          lg는 서랍 항목이라 17px이어야 하는데(카톡테마 메이커 서랍이
          17px·medium·1.3이다), 예전에는 label 척도가 15px에서 끝나 갈 곳이 없어
          body-lg를 임시로 빌려 썼다. 척도를 한 칸 올리며 17px 자리가 생겼으므로
          제자리로 돌아왔다 */}
      <span className={`text-label-${size === 'lg' ? 'lg' : 'md'} ${styles.label}`}>{label}</span>
      {trailing !== undefined && <span className={styles.trailing}>{trailing}</span>}
    </button>
  );
}
