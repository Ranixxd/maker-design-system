import Icon from '../Icon/Icon';
import styles from './EditFab.module.css';

/* 편집 판 위에 떠 있는 둥근 단추. 판 위에서 부가 기능(초기화, 배경 지우기, 기기에 저장)을 줄 때만 쓴다.
   메인 기능은 EditFrame 아래 고정 자리에 둔다. 눈에 띄지 않게 흐린 아이콘에 강조색을 쓰지 않는다.

   자리는 단추가 정하지 않는다. EditFrame의 fabStart·fabEnd에 넣으면 틀이 판 아래 양 끝에 세운다.
   켜고 끄는 단추가 아니라 누르면 한 번 일어나고 끝난다. 그래서 aria-pressed가 없다.
   showLabel이면 아이콘 오른쪽에 label을 글자로 세워 알약 모양이 된다(2026-10-04 사용자). 늘 떠 있는 단추처럼
   아이콘만으로 무슨 일인지 알기 어려운 자리에 쓴다. 판 위 부가 기능은 그대로 아이콘만 둔다 */
export default function EditFab({
  icon,                 // 등록된 아이콘 이름
  iconNode,             // 직접 그린 그림(등록부에 없는 것)
  label,                // 무슨 단추인지. 낭독기 이름이 된다. showLabel이 없으면 PC 말풍선(title)도 된다
  showLabel = false,    // label을 아이콘 오른쪽에 글자로 세운다
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={[styles.fab, showLabel && styles.labeled, className].filter(Boolean).join(' ')}
      aria-label={label}
      title={showLabel ? undefined : label}
      {...props}
    >
      {iconNode || (icon && <Icon name={icon} size="sm" className={styles.icon} />)}
      {showLabel && <span className={`text-label-xs ${styles.text}`} aria-hidden="true">{label}</span>}
    </button>
  );
}
