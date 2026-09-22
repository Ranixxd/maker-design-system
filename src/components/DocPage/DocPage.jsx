import Title from '../Title/Title';
import styles from './DocPage.module.css';

/* 글을 읽는 페이지의 틀. 제목 하나, 그 아래 도구 줄, 섹션들이 쌓이는 모양이다
   (자주 묻는 질문, 의견 보내기, 방침, 약관).

   간격을 이 틀이 정한다. 쓰는 쪽은 margin을 적지 않는다 —
   페이지마다 손으로 적으면 장마다 값이 어긋난다.

   도구 줄이 없으면 본문이 제목 바로 아래 붙는다(20px). 도구 줄이 있을 때만 48px로 벌린다 —
   약관처럼 글만 있는 페이지에서 48px은 제목이 혼자 떠 보인다.

   헤더는 밖에서 넘긴다(header). 서비스마다 헤더가 다르고, 그것을 여기서 부르면
   부품이 앱을 알게 된다 */
export default function DocPage({ header, title, tools, children, className, ...props }) {
  return (
    <>
      {header}
      <div className={[styles.wrap, className].filter(Boolean).join(' ')} {...props}>
        <Title as="h1" size="lg">{title}</Title>
        {tools && <div className={styles.tools}>{tools}</div>}
        <div className={tools ? styles.body : styles.bodyTight}>{children}</div>
      </div>
    </>
  );
}

/* 페이지 안의 한 묶음. 제목은 없어도 된다 */
export function DocSection({ title, children, className, ...props }) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')} {...props}>
      {title && <Title as="h2" size="md">{title}</Title>}
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
