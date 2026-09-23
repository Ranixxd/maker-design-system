import styles from './MediaCard.module.css';

/* 그림 한 장이 주인공인 목록 카드. 그림 아래에 제목 한 줄, 그 아래에 부가 정보가 붙는다.
   배경화면 목록, 공식·유저 템플릿 목록이 이 한 벌을 나눠 쓴다(2026-09-23 사용자).

   테두리도 그림자도 없다. 그림이 배경에서 붕 뜨지 않아야 하고, 목록에서 눈에 들어와야 하는 것은
   테두리가 아니라 그림이다. 모서리만 radius-xl로 둥글린다.

   ratio는 서비스마다 다르다 — 배경화면은 2/3, 테마 목록은 4/5다. 그림 크기가 목록의 인상을
   정하므로 부품이 하나로 못 박지 않고 쓰는 쪽이 정한다.

   누르는 방식도 둘이다. href를 주면 링크(a)다 — 제 주소를 가진 페이지로 가고 크롤러가 따라간다.
   onClick만 주면 단추(button)다 — 같은 화면에서 창을 연다 */
export default function MediaCard({
  src,
  alt = '',
  ratio = '4 / 5',
  title,
  titleClass = 'text-heading-xs',  // 제목 글자. 서비스마다 크기가 다르다
  lines = 2,                       // 제목을 몇 줄까지 보일지. 1이면 한 줄 말줄임
  badge,                           // 그림 왼쪽 위에 얹는 표(오늘 올라왔어요 점 등)
  meta,                            // 제목 아래 줄(좋아요·이어 만든 수, 작성자 등)
  href,
  onClick,
  className,
  ...props
}) {
  const Tag = href ? 'a' : 'button';
  const 제목클래스 = [titleClass, styles.title, lines === 1 ? styles.oneLine : styles.clamp]
    .filter(Boolean).join(' ');

  return (
    <Tag
      {...(href ? { href } : { type: 'button', onClick })}
      className={[styles.card, className].filter(Boolean).join(' ')}
      {...props}
    >
      <figure className={styles.figure} style={{ aspectRatio: ratio }}>
        <img className={styles.image} src={src} alt={alt} loading="lazy" decoding="async" />
        {badge && <span className={styles.badge}>{badge}</span>}
      </figure>
      {(title || meta) && (
        <div className={styles.body}>
          {title && (
            <span className={제목클래스} style={lines > 1 ? { '--media-card-lines': lines } : undefined}>
              {title}
            </span>
          )}
          {meta && <div className={styles.meta}>{meta}</div>}
        </div>
      )}
    </Tag>
  );
}
