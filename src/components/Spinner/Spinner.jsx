import styles from './Spinner.module.css';

/* 도는 표시 하나. 기다리는 자리에 바로 놓는다.
   label을 주면 읽어 주는 기능이 읽고(role="status"), 안 주면 장식으로 둔다(둘레가 이미 기다림을 말하는 자리) */
export default function Spinner({ size = 'md', label, className, ...props }) {
  return (
    <span
      className={[styles.spinner, styles[size], className].filter(Boolean).join(' ')}
      {...(label ? { role: 'status', 'aria-label': label } : { 'aria-hidden': true })}
      {...props}
    />
  );
}
