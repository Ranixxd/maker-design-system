import Icon from '../Icon/Icon';
import styles from './StatLine.module.css';

/* 좋아요·이어 만들기 지표 줄(2026-11-04). 글 상세의 메타 묶음(PostMeta)과 목록 카드(MediaCard의 meta)가 같은 줄을 쓴다.
   아이콘은 글줄 속 14px이고 글자 색을 따른다. 글자 크기·색은 감싸는 쪽이 정한다. 규칙은 StatLine.stories.jsx 설명에 있다 */

/* 이어 만들기 아이콘. 바꾸려면 여기만 고친다 */
export const TAKE_ICON = 'Repeat';

export default function StatLine({
  likes = 0,     // 좋아요 수
  takes,         // 이어 만든 수. 안 주면 좋아요만 선다
  takesLabel,    // 이어 만든 수 뒤에 붙는 말('명이 이어 만들었어요'). 0이면 붙이지 않는다
  className,
}) {
  const 말 = takes > 0 && takesLabel ? takesLabel : '';
  return (
    <span className={[styles.line, className].filter(Boolean).join(' ')}>
      <span className={styles.item} aria-label={`좋아요 ${likes}`}>
        <Icon name="Heart" size="sm" strokeWidth={2} className={styles.icon} />
        <span>{likes}</span>
      </span>
      {takes != null && (
        <>
          <span aria-hidden="true">·</span>
          <span className={styles.item} aria-label={말 ? undefined : `이어 만든 수 ${takes}`}>
            <Icon name={TAKE_ICON} size="sm" strokeWidth={2} className={styles.icon} />
            <span>{takes}{말}</span>
          </span>
        </>
      )}
    </span>
  );
}
