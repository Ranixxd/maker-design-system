import Icon from '../Icon/Icon';
import styles from './ToolButton.module.css';

/* 그림 아래 이름이 붙는 세로 단추. 도구 줄에 여럿이 나란히 선다(이미지 만들기 툴바).

   Button과 다른 자리다 — Button은 글자로 무엇을 하는지 말하는 한 줄짜리고,
   이쪽은 그림이 먼저 눈에 들어오는 도구다. 켜고 끄는 도구(크기 가이드)는 active를 준다 */
export default function ToolButton({
  icon,                 // 등록된 아이콘 이름
  iconNode,             // 직접 그린 그림(등록부에 없는 것)
  label,
  active = false,
  wide = false,         // 이름이 길어 한 줄에 안 들어갈 때
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={[styles.btn, active && styles.on, wide && styles.wide, className].filter(Boolean).join(' ')}
      aria-pressed={active}
      {...props}
    >
      <span className={styles.icon}>{iconNode || (icon && <Icon name={icon} size="md" />)}</span>
      <span className={`text-label-sm ${styles.label}`}>{label}</span>
    </button>
  );
}
