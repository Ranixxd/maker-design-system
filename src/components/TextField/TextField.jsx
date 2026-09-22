import { forwardRef } from 'react';
import styles from './TextField.module.css';

/* forwardRef — 창을 열자마자 입력칸에 포커스를 줄 수 있어야 한다(카톡테마 메이커 테마 보관).
   나머지 속성(maxLength, disabled, onKeyDown, onCompositionStart/End, autoComplete 등)은
   input에 그대로 넘긴다. 한글 조합을 기다리는 일은 쓰는 쪽이 이 신호로 한다 (2026-09-17 더함) */
const TextField = forwardRef(function TextField({
  id,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  hint,
  type = 'text',
  invalid = false,
  multiline = false,
  rows = 6,
  ...inputProps
}, ref) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={`text-label-sm ${styles.label}`}>
          {label}
          {/* 점은 눈으로만 보인다. 낭독기에는 input의 aria-required로 알린다 */}
          {required && <span className={styles.req} aria-hidden="true" />}
        </label>
      )}
      {multiline ? (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`text-body-md ${styles.input} ${styles.area}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-required={required || undefined}
        data-invalid={invalid || undefined}
        aria-invalid={invalid || undefined}
        {...inputProps}
      />
      ) : (
      <input
        ref={ref}
        id={id}
        type={type}
        className={`text-body-md ${styles.input}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-required={required || undefined}
        data-invalid={invalid || undefined}
        aria-invalid={invalid || undefined}
        {...inputProps}
      />
      )}
      {hint && (
        /* 여러 줄과 목록을 받는다. span이면 안에 ul을 둘 수 없다 */
        <div className={`text-body-sm ${styles.hint}`}>{hint}</div>
      )}
    </div>
  );
});

export default TextField;
