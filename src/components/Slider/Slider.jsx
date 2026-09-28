import styles from './Slider.module.css';

/* 값 하나를 끌어서 고르는 막대(2026-09-29, 주인장의 냉장고 팔·다리 간격).
   브라우저의 input type="range"에 모양만 입힌다. 키보드(화살표·Home·End)와 낭독기는 브라우저가 맡는다.

   ── 채운 쪽 ──
   왼쪽 끝부터 손잡이까지를 bg-primary로 칠한다. 브라우저마다 채운 쪽을 따로 그리는 방법이 달라
   (크롬·사파리는 없고 파이어폭스만 있다) 막대 배경 하나에 --p(0~100%)를 넘겨 칠한다.

   ── 손잡이에 그림자가 없다 ──
   떠 있는 단추에도 그림자를 안 쓴다(사용자). 흰 원에 primary 테두리로 막대와 가른다.

   ── 끄는 대로 onChange ──
   손을 뗄 때가 아니라 끄는 동안 계속 부른다. 뒤 화면이 따라 바뀌는 것을 보며 맞춘다(ColorPicker와 같다).
   값은 숫자로 넘긴다 */
export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,                // 낭독기가 이 막대를 무엇이라 부를지. 눈에 보이는 이름이 없으면 꼭 준다
  disabled = false,
  className,
  style,
  ...props
}) {
  const span = max - min;
  const p = span > 0 ? Math.min(100, Math.max(0, ((value - min) / span) * 100)) : 0;
  return (
    <input
      type="range"
      className={[styles.slider, className].filter(Boolean).join(' ')}
      style={{ ...style, '--p': p + '%' }}
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => onChange && onChange(Number(e.target.value))}
      {...props}
    />
  );
}
