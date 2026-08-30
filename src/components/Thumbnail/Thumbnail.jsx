import styles from './Thumbnail.module.css';

// size: 'sm'(44px) | 'md'(60px)
// onClick을 넘기면 클릭 가능(이미지 불러오기 트리거), 넘기지 않으면 읽기 전용 미리보기
export default function Thumbnail({ src, alt = '', size = 'sm', onClick, className }) {
  const filled = Boolean(src);
  const interactive = Boolean(onClick);

  function handleKeyDown(e) {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  }

  return (
    <div
      className={[
        styles.thumb,
        styles[size],
        filled && styles.filled,
        interactive && styles.clickable,
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? alt || '이미지 불러오기' : undefined}
    >
      {src && <img src={src} alt={alt} />}
    </div>
  );
}
