import styles from './Badge.module.css';

export default function Badge({ children, variant = 'primary' }) {
  return (
    <span className={`text-label-xs ${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
}
