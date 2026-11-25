import { useState } from 'react';
import styles from './Disclosure.module.css';

/* 글자 하나를 누르면 아래로 짧은 안내가 펼쳐지는 작은 토글.
   앞의 ▸가 열리면 90도 돌아 ▾가 된다.

   - details/summary로 만든다. 키보드·읽어 주기는 브라우저가 맡는다
   - 내용은 닫혀 있어도 DOM에 남는다. 검색 엔진이 읽어야 하는 글이 들어오는 자리다
   - 열림을 밖에서 쥐려면 open과 onToggle을 함께 준다. 안 주면 제 안에서 쥔다
   - 내용 자리에는 무엇이든 넣는다. 글이 아닌 것은 제 글자·색을 스스로 정한다
   - full: 제목 줄을 한 줄 전체로 펴고 위아래 여백을 준다. 줄 목록 안에 설 때 쓴다.
     그 목록의 선은 목록이 긋는다 */
export default function Disclosure({
  title,
  children,
  open,
  onToggle,
  defaultOpen = false,
  full = false,
  className,
  ...props
}) {
  const [inner, setInner] = useState(defaultOpen);
  const controlled = open !== undefined;
  const isOpen = controlled ? open : inner;

  const toggle = (e) => {
    e.preventDefault();
    if (onToggle) onToggle(!isOpen);
    if (!controlled) setInner(!isOpen);
  };

  return (
    <details className={[styles.item, full && styles.full, className].filter(Boolean).join(' ')} open={isOpen} {...props}>
      <summary className={`text-label-sm ${styles.label}`} onClick={toggle}>{title}</summary>
      <div className={`text-body-sm ${styles.body}`}>{children}</div>
    </details>
  );
}
