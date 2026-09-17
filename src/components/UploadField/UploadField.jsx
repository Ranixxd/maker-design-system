import styles from './UploadField.module.css';

/* 사진 한 장을 올리는 폼 칸. 누르면 파일 고르기가 열리고, 고른 사진이 그 자리에 보인다
   (쉽게 시작하기의 기본 이미지·반응한 이미지).

   TextField와 같은 줄에 선 폼 부품이다. 옵션 카드(ListItem box)와 다른 자리다 —
   카드는 "무엇을 할지 고르는 것"이고, 이 칸은 "값을 넣는 것"이다.

   투명한 그림도 그대로 보이게 칸 바탕에 격자를 깐다. 아직 안 골랐을 때는
   어떤 그림이 들어갈 자리인지 견본(sample)을 연하게 깔아 둘 수 있다 */
export default function UploadField({
  label,
  description,
  value,                // 고른 그림 주소(dataURL 등)
  sample,               // 아직 안 골랐을 때 연하게 깔아 둘 견본 그림 주소
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={[styles.field, className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className={[styles.box, value && styles.has].filter(Boolean).join(' ')}>
        {!value && sample && <span className={styles.sample} style={{ backgroundImage: `url("${sample}")` }} />}
        {value && <span className={styles.pick} style={{ backgroundImage: `url("${value}")` }} />}
      </span>
      {label && <span className={`text-label-md ${styles.label}`}>{label}</span>}
      {description && <span className={`text-body-sm ${styles.desc}`}>{description}</span>}
    </button>
  );
}
