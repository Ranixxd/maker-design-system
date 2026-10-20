import styles from './Switch.module.css';

/* 켜고 끄는 스위치(2026-10-20, 웹 프로필 사진 만들기의 사람 끄기에서 처음 썼다).
   체크박스와 달리 누르는 순간 화면이 바뀌는 켜기/끄기에 쓴다. 저장 단추를 기다리지 않는다.

   onChange는 이벤트가 아니라 **바뀐 값(true/false)** 을 받는다(Checkbox와 같다).
   글자 라벨이 없을 수 있어 label을 받아 읽어 주는 이름으로 단다. children이 있으면 오른쪽에 라벨로 선다.
   덕꾸 앱 Switch(운영체제 스위치)와 같은 색이다: 켜면 bg-primary, 끄면 border-default, 손잡이 bg-default */
export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  children,
  className,
  ...props
}) {
  return (
    <label className={['text-body-md', styles.option, disabled ? styles.disabled : '', className]
      .filter(Boolean).join(' ')}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-label={children ? undefined : label}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className={styles.input}
        {...props}
      />
      <span className={styles.track} aria-hidden="true"><span className={styles.thumb} /></span>
      {children}
    </label>
  );
}
