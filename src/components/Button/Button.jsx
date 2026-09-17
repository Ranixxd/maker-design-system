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
  image,                // 이미지 주소. 글자 옆에 선다(공유하기 + 선물 그림). 높이는 크기마다 고정, 너비는 비율대로
  imagePosition = 'end', // 'start' | 'end'
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
      <span className={loading ? styles.labelHidden : styles.label}>
        {/* 뜻은 글자가 전한다. 그림은 꾸밈이라 낭독기에서 뺀다 */}
        {image && imagePosition === 'start' && <img className={styles.image} src={image} alt="" aria-hidden="true" />}
        {children}
        {image && imagePosition !== 'start' && <img className={styles.image} src={image} alt="" aria-hidden="true" />}
      </span>
    </button>
  );
});

export default Button;
