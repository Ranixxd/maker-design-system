import styles from './WaveFooter.module.css';

/* 페이지 맨 아래에 서는 읽을 글 칸. 위 경계를 큰 물결로 두고 뮤트 바탕을 깐다.
   글은 본문 폭에 두고, 물결과 바탕만 페이지 가로 끝까지 편다.

   - children: 글. 소제목(h2·h3)·문단(p)·목록(ul)·링크(a)를 바로 넣는다
   - bottom: 글 아래 맨 끝에 서는 것(링크 줄 등)
   - 글 모양(간격, 색, 링크 색)은 이 부품이 정한다. 글 내용은 쓰는 쪽이 정한다 */
export default function WaveFooter({ children, bottom, className, ...props }) {
  return (
    <footer className={[styles.foot, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.body}>
        <div className={`text-body-md ${styles.prose}`}>{children}</div>
        {bottom}
      </div>
    </footer>
  );
}
