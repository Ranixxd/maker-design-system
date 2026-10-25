import { forwardRef } from 'react';
import Icon from '../Icon/index.js';
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
  error,                // 칸 아래 빨간 글자 한 줄. 주면 invalid도 켜진다. hint는 그 아래에 그대로 선다(2026-10-25)
  multiline = false,
  rows = 6,
  action,               // 칸 안 오른쪽 끝 둥근 단추 { icon, 'aria-label', onClick }. 한 줄 칸에서만 선다(2026-10-13)
  ...inputProps
}, ref) {
  const bad = invalid || !!error;
  const errorId = error && id ? `${id}-error` : undefined;
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
        data-invalid={bad || undefined}
        aria-invalid={bad || undefined}
        aria-describedby={errorId}
        {...inputProps}
      />
      ) : (
      <div className={styles.inputWrap}>
      <input
        ref={ref}
        id={id}
        type={type}
        className={`text-body-md ${styles.input} ${action ? styles.withAction : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-required={required || undefined}
        data-invalid={bad || undefined}
        aria-invalid={bad || undefined}
        aria-describedby={errorId}
        {...inputProps}
      />
      {action && (
        /* 누르는 동안 칸의 초점을 뺏지 않는다. 뺏으면 폰 자판이 내려갔다 다시 올라온다 */
        <button type="button" className={styles.action} aria-label={action['aria-label']}
          onPointerDown={(e) => e.preventDefault()} onClick={action.onClick} tabIndex={inputProps.tabIndex}>
          <Icon name={action.icon} size="sm" />
        </button>
      )}
      </div>
      )}
      {error && (
        /* 칠 때 바로 뜨는 말이라 낭독기에도 바로 읽힌다 */
        <div id={errorId} role="alert" className={`text-body-sm ${styles.error}`}>{error}</div>
      )}
      {hint && (
        /* 여러 줄과 목록을 받는다. span이면 안에 ul을 둘 수 없다 */
        <div className={`text-body-sm ${styles.hint}`}>{hint}</div>
      )}
    </div>
  );
});

export default TextField;
