import { ChevronRight } from 'lucide-react';
import styles from './LinkBanner.module.css';

/* 화면 안에서 다른 곳으로 보내는 한 줄 띠(2026-10-19).
   카톡테마 메이커의 블로그 글로 가는 띠(쉽게 시작하기, 배경 만들기)와 템플릿 상세의 원작 띠가
   같은 모양을 따로 그리고 있어 하나로 묶었다.

   href가 있으면 링크(a), onClick만 있으면 단추(button), 둘 다 없으면 갈 곳이 없는 띠(div)다.
   갈 곳이 없으면 > 를 그리지 않는다.
   글은 한 줄이다. 넘칠 수 있는 조각만 linkBannerClip으로 감싸면 그 조각만 말줄임된다 */
export default function LinkBanner({ href, onClick, children, className, ...props }) {
  const Tag = href ? 'a' : onClick ? 'button' : 'div';
  const moves = Tag !== 'div';
  return (
    <Tag
      className={[styles.banner, 'text-label-xs', className].filter(Boolean).join(' ')}
      href={href}
      type={Tag === 'button' ? 'button' : undefined}
      onClick={onClick}
      {...props}
    >
      <span className={styles.text}>{children}</span>
      {moves && <ChevronRight size={14} aria-hidden="true" />}
    </Tag>
  );
}

/* 띠 글에서 넘칠 때 줄일 조각. 감싸지 않은 앞뒤 글은 줄지 않는다 */
export const linkBannerClip = styles.clip;
