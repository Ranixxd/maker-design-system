import Avatar from '../Avatar/Avatar';
import Badge from '../Badge/Badge';
import styles from './PostMeta.module.css';

/* 글 상세의 메타 묶음(2026-10-22). 템플릿 상세·배경화면 상세처럼 남이 올린 글 아래에 선다.
   차례는 늘 같다. 규칙은 PostMeta.stories.jsx 설명에 있다.
     묶음 1  제목 / 내용 / 게시 시간   (셋 다 없으면 묶음째 없다)
     묶음 2  사진 | 닉네임 | 최애 / SNS (늘 선다)
     묶음 3  지표                      (없으면 묶음째 없다)
     맨 아래 [⋯]                       (있으면 혼자 한 줄, 오른쪽) */
export default function PostMeta({
  title,                 // 제목. 없으면 빈다
  titleAs: TitleTag = 'h2', // 제 주소 페이지의 주인공 제목이면 'h1'
  body,                  // 내용. 사람이 쓴 줄바꿈을 그대로 살린다
  time,                  // 게시 시간. 글자나 <time>
  stats,                 // 지표. 쓰는 쪽이 그린다(좋아요·이어 만들기 등)
  name,                  // 닉네임
  avatar,                // 작성자 사진 주소. undefined면 사진 자리를 두지 않는다. ''면 fallback 그림
  avatarFallback,        // 사진이 없을 때 그림
  favorite,              // 최애. 있으면 닉네임 옆 명찰
  sns,                   // SNS 줄. 쓰는 쪽이 그린다(링크 규칙이 서비스에 있다)
  more,                  // [⋯]. 쓰는 쪽이 IconButton·Popover를 넘긴다
  className,
}) {
  const 묶음1 = title || body || time;
  return (
    <div className={[styles.meta, className].filter(Boolean).join(' ')}>
      {묶음1 && (
        <div className={styles.head}>
          {title && <TitleTag className={`text-heading-xs ${styles.title}`}>{title}</TitleTag>}
          {body && <p className={`text-body-sm ${styles.body}`}>{body}</p>}
          {time && <p className={`text-body-sm ${styles.time}`}>{time}</p>}
        </div>
      )}
      <div className={styles.author}>
        <p className={`text-body-sm ${styles.by}`}>
          {avatar !== undefined && <Avatar size="sm" src={avatar} fallback={avatarFallback} className={styles.avatar} />}
          <span className={styles.name}>{name}</span>
          {favorite && <Badge>최애: {favorite}</Badge>}
        </p>
        {sns && <div className={`text-body-sm ${styles.sns}`}>{sns}</div>}
      </div>
      {stats && <div className={`text-body-sm ${styles.stats}`}>{stats}</div>}
      {more && <div className={styles.more}>{more}</div>}
    </div>
  );
}
