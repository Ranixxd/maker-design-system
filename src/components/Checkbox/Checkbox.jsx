import styles from './Checkbox.module.css';

/* 켜고 끄는 입력. 라디오(Radio)와 짝이다 — 여럿 중 하나면 Radio, 각각 켜고 끄면 Checkbox다.

   onChange는 이벤트가 아니라 **바뀐 값(true/false)** 을 받는다. RadioGroup의 onChange와 같은 결이다.
   묶음(Group)을 두지 않는다 — 체크박스는 서로를 모르고 각자 켜지고 꺼진다 */
export default function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  align = 'center',   /* 'center' | 'start' — 라벨이 두 줄 넘게 감기면 start로 첫 줄에 맞춘다 */
  children,
  className,
  ...props
}) {
  return (
    <label className={[`text-body-md`, styles.option, styles[align], disabled ? styles.disabled : '', className]
      .filter(Boolean).join(' ')}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className={styles.input}
        {...props}
      />
      {children}
    </label>
  );
}
