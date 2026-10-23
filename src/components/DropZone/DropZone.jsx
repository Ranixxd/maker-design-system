import { useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './DropZone.module.css';

/* 사진을 받는 큰 상자(2026-10-23 사용자). 누르면 파일 고르기가 열리고, 끌어다 놓아도 받는다.
   화면의 주인공 자리를 차지한다. 짤 만들기의 글자 넣기·부적·찌그러진 얼굴·음식 짤이 사진을 받는 첫 화면이다.
   모양은 핀터레스트 올리기 상자를 따랐다(둥근 큰 회색 상자, 가운데 위 화살표 원과 글). 테두리는 없다.

   UploadField와 가른다. UploadField는 폼 안에서 값 하나를 넣는 작은 칸이고, 이것은 사진을 받는 것 자체가 할 일인 화면이다.

   파일 고르기 창은 이 부품이 연다. 같은 파일을 다시 골라도 받게 고를 때마다 입력칸을 비운다.
   accept에 맞지 않는 파일을 끌어다 놓으면 받지 않는다(onReject가 있으면 알린다) */
const 맞나 = (file, accept) => {
  if (!accept || accept === '*') return true;
  return accept.split(',').map((s) => s.trim()).some((a) => {
    if (a.endsWith('/*')) return file.type.startsWith(a.slice(0, -1));
    if (a.startsWith('.')) return file.name.toLowerCase().endsWith(a.toLowerCase());
    return file.type === a;
  });
};

export default function DropZone({
  label,                 // 가운데 글
  description,           // 아래쪽 작은 안내(받는 크기·형식 등). 없어도 된다
  accept = 'image/*',
  ratio = '5 / 6',       // 상자 비율. 쓰는 쪽 화면에 맞춘다. null이면 비율을 두지 않고 쓰는 쪽이 크기를 정한다
  tone = 'default',      // 'default' 밝은 바탕 위 회색 면 | 'onDark' 어두운 덮개 위 흰 점선(바탕 없음, 글·아이콘 흰색)
  disabled = false,
  onPick,                // (file) => void. 고르거나 놓은 파일 한 장
  onReject,              // (file) => void. accept에 안 맞는 파일을 놓았을 때
  className,
  style,
  ...props
}) {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  const 받기 = (file) => {
    if (!file) return;
    if (!맞나(file, accept)) { if (onReject) onReject(file); return; }
    if (onPick) onPick(file);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={[styles.zone, tone === 'onDark' && styles.onDark, over && styles.over, className].filter(Boolean).join(' ')}
      style={ratio ? { aspectRatio: ratio, ...style } : style}
      onClick={() => input.current && input.current.click()}
      onDragOver={(e) => { if (disabled) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (!disabled) 받기(e.dataTransfer.files && e.dataTransfer.files[0]);
      }}
      {...props}
    >
      <span className={styles.center}>
        <span className={styles.arrow}><Icon name="ArrowUp" size="sm" /></span>
        {label && <span className={`text-body-md ${styles.label}`}>{label}</span>}
      </span>
      {description && <span className={`text-body-sm ${styles.desc}`}>{description}</span>}
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          e.target.value = '';
          받기(file);
        }}
      />
    </button>
  );
}
