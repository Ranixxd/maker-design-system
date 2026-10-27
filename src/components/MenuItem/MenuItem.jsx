import styles from './MenuItem.module.css';

/* Popover 안에 들어가는 짧은 줄.

   ListItem과 겹쳐 보이지만 자리가 다르다 — ListItem은 화면을 채우는 목록의 한 줄이라
   부제(sub)를 달고 여백이 넉넉하다. MenuItem은 이미 열려 있는 작은 패널 안이라
   낮고 좁아야 한다. 목록용을 그대로 쓰면 팝오버가 의도보다 커진다.

   앞 아이콘은 두지 않는다(2026-10-27, 덕꾸 앱과 같게). 고를 것이 그림이면 그 그림만 leading에 둔다 */
export default function MenuItem({
  label,
  sub,                  // 이름에 딸린 것(날짜 등). 끝이 아니라 이름 아래에 선다
  leading,              // 고를 것이 그림일 때 그 그림(썸네일, 비율 상자). 아이콘은 넣지 않는다
  variant = 'normal',   // 'normal' | 'subtle' | 'critical'
  size = 'md',          // 'md' | 'lg'
  trailing,
  href,                 // 주면 링크(a)로 그린다. 다른 페이지로 가는 줄(서랍 메뉴). 새 탭 열기·주소 복사가 된다
  className,
  ...props
}) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      type={href ? undefined : 'button'}
      href={href}
      className={[styles.item, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      {/* 둘 다 label이다 — 읽는 글이 아니라 누르는 것의 이름이고, 한 줄로
          끝나므로 행간도 single이 맞다. md는 15px, 서랍의 lg는 17px */}
      <span className={styles.text}>
        <span className={`text-label-${size === 'lg' ? 'lg' : 'md'}`}>{label}</span>
        {sub !== undefined && <span className={`text-label-sm ${styles.sub}`}>{sub}</span>}
      </span>
      {trailing !== undefined && <span className={styles.trailing}>{trailing}</span>}
    </Tag>
  );
}
