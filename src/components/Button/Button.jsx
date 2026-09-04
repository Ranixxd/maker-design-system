import { forwardRef } from 'react';
import styles from './Button.module.css';

/* forwardRef — 호출부가 자동 포커스 등으로 DOM 버튼에 ref를 붙일 수 있어야
   한다. 없으면 ref가 조용히 버려진다(에러 없이 그냥 안 붙음) */
const Button = forwardRef(function Button({
  variant = 'primary', // 'primary' | 'secondary' | 'neutral' | 'accent'
  size = 'md',
  children,
  className,
  loading = false,
  onClick,
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={loading ? styles.labelHidden : styles.label}>{children}</span>
    </button>
  );
});

export default Button;
