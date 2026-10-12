import SelectTile, { ColorDot, RainbowDot } from '../SelectTile/index.js';
import SelectRow from '../SelectRow/index.js';

/* 컬러 팔레트(2026-10-12, 덕꾸 앱의 ColorPalette를 웹으로 옮겼다). 선택 줄(SelectRow)에 색 타일(SelectTile + ColorDot)을 채운 것이다.
   색을 고르는 줄은 이것을 쓴다.

   - colors: 샘플 색 [{ value, label }]. value가 그중 하나면 그 타일이 고른 상태가 된다. null이면 아무것도 안 고른 상태
   - customTile을 주면 맨 끝에 무지개 타일(색 직접 고르기)이 선다. 샘플 밖의 색이 고른 값이면 그 타일이 고른 상태가 되고
     무지개 대신 그 색을 보인다. customTile은 타일을 받아 감싸는 함수다. 누르면 무엇을 띄울지(Popover, 시트)는 쓰는 쪽이 정한다
   - label: 낭독기가 읽는 이름 앞말(예: "배경"이면 "배경 분홍", "배경 색 직접 고르기") */
export default function ColorPalette({
  colors,
  value,
  onChange,
  customTile,
  leading,
  size = 'md',
  label,
  className,
}) {
  const custom = value != null && !colors.some((c) => c.value === value);
  const tile = customTile && (
    <SelectTile size={size} label={label + ' 색 직접 고르기'} selected={custom}>
      {custom ? <ColorDot value={value} size={size} /> : <RainbowDot size={size} />}
    </SelectTile>
  );
  return (
    <SelectRow leading={leading} label={label + ' 색'} className={className}>
      {colors.map((c) => (
        <SelectTile key={c.value} size={size} label={label + ' ' + c.label} selected={value === c.value} onClick={() => onChange?.(c.value)}>
          <ColorDot value={c.value} size={size} />
        </SelectTile>
      ))}
      {tile && customTile(tile)}
    </SelectRow>
  );
}
