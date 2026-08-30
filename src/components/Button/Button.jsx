import styles from './Button.module.css';

export default function Button({
  variant = 'primary', // 'primary' | 'secondary' | 'neutral' | 'accent'
  size = 'md',
  children,
  className,
  loading = false,
  onClick,
  ...props
}) {
  return (
    <button
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
}
