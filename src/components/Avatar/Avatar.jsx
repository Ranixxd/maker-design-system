import styles from './Avatar.module.css';

// size: 'sm'(24px) | 'md'(40px) | 'lg'(64px)
// src가 비었거나 못 불러오면 fallback(쓰는 쪽의 기본 그림)을 띄운다
export default function Avatar({ src, fallback, alt = '', size = 'sm', className }) {
  return (
    <img
      className={[styles.avatar, styles[size], className].filter(Boolean).join(' ')}
      src={src || fallback}
      alt={alt}
      onError={(e) => {
        if (!fallback || e.currentTarget.src.endsWith(fallback)) return;
        e.currentTarget.src = fallback;
      }}
    />
  );
}
