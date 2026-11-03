import Button from '../Button/index.js';
import styles from './BottomCta.module.css';

/* 하단 고정형 버튼. 글 상세 바닥에 붙어 그 글로 할 일을 받는다. 규칙은 BottomCta.stories.jsx 설명에 있다.

   - children: 주 단추(Button primary 하나). 남은 폭을 다 쓴다
   - like: 주면 주 단추 왼쪽에 좋아요 단추(Button neutral, ❤️)가 선다. { pressed, onClick, ref }
   - position: 'fixed'(페이지가 구른다) | 'sticky'(제 칸이 구르는 화면에서 칸 바닥에 붙는다)
   - width·gutter: 단추 줄이 맞출 본문 줄 너비와 좌우 여백(px). 단추 가장자리가 본문 가장자리와 같은 선에 선다 */
export default function BottomCta({ like, children, position = 'fixed', width = 488, gutter = 16, className }) {
  return (
    <div className={[styles.bar, styles[position], className].filter(Boolean).join(' ')}
      style={{ '--bottom-cta-width': width + 'px', '--bottom-cta-gutter': gutter + 'px' }}>
      <div className={styles.inner}>
        {like && (
          <Button ref={like.ref} variant="neutral" className={styles.like}
            aria-label="좋아요" aria-pressed={!!like.pressed} onClick={like.onClick}>❤️</Button>
        )}
        {children}
      </div>
    </div>
  );
}
