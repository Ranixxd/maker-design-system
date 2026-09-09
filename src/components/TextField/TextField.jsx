import styles from './TextField.module.css';

export default function TextField({
  id,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  hint,
  type = 'text',
}) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={`text-label-sm ${styles.label}`}>
          {label}
          {required && <span className={styles.req} aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`text-body-md ${styles.input}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {hint && (
        <span className={`text-label-xs ${styles.hint}`}>{hint}</span>
      )}
    </div>
  );
}
