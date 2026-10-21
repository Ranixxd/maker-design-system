import SelectTile from '../SelectTile/index.js';
import SelectRow from '../SelectRow/index.js';
import Popover from '../Popover/index.js';
import ColorPickerPopup from '../ColorPickerPopup/index.js';
import MenuItem from '../MenuItem/index.js';
import Icon from '../Icon/index.js';
import { tileFillClass } from '../SelectTile/index.js';
import styles from './ColorPalette.module.css';

/* 사진 칸. 누르면 칸 위로 메뉴가 펴지고, 고르면 메뉴를 닫은 뒤 그 항목의 할 일을 부른다.
   칸 안은 불러오는 중이면 도는 표시, 사진이 있으면 썸네일, 없으면 ImagePlus */
function PhotoTile({ src, selected, loading, label, menu, size }) {
  return (
    <Popover portal side="top" align="start" label={label} panelClassName={styles.menuPop}
      trigger={(
        <SelectTile size={size} label={label} selected={!!selected} aria-busy={loading || undefined}>
          {loading ? <span className={styles.spin} aria-hidden="true" />
            : src ? <img className={tileFillClass} src={src} alt="" draggable={false} /> : <Icon name="ImagePlus" size="sm" />}
        </SelectTile>
      )}>
      {(close) => menu.map((m) => (
        <MenuItem key={m.label} icon={m.icon} label={m.label} onClick={() => { close(false); m.onClick?.(); }} />
      ))}
    </Popover>
  );
}

/* 컬러 팔레트(2026-10-12, 덕꾸 앱의 ColorPalette를 웹으로 옮겼다). 선택 줄(SelectRow)에 색 타일(SelectTile fill)을 채운 것이다.
   색을 고르는 줄은 이것을 쓴다.

   - colors: 샘플 색 [{ value, label }]. value가 그중 하나면 그 타일이 고른 상태가 된다. null이면 아무것도 안 고른 상태
   - picker: 주면 맨 끝에 무지개 타일(색 직접 고르기)이 서고, 누르면 ColorPicker가 뜬다(2026-10-13).
     샘플 밖의 색이 고른 값이면 그 타일이 고른 상태가 되고 무지개 대신 그 색을 보인다.
     true 또는 { start, title }. start는 고른 색이 없을 때(null) 선택기가 열리는 값, title은 선택기 이름(기본 "<label> 색")
   - customTile: 무지개 타일을 받아 감싸는 함수. 선택기를 쓰는 쪽이 직접 띄울 때만 쓴다. picker가 있으면 무시한다
   - photo: 주면 맨 앞(leading 자리)에 사진 칸이 고정된다(2026-10-21). { src, selected, loading, label, menu: [{ icon, label, onClick }] }.
     메뉴 항목·차례·아이콘과 할 일은 쓰는 쪽이 넘긴다(앱과 같게). 사진을 쓰는 동안은 value를 null로 둔다. photo가 있으면 leading은 무시한다
   - align: 'start' | 'center'. SelectRow와 같다
   - label: 낭독기가 읽는 이름 앞말(예: "배경"이면 "배경 분홍", "배경 색 직접 고르기") */
export default function ColorPalette({
  colors,
  value,
  onChange,
  picker,
  customTile,
  photo,
  leading,
  size = 'md',
  align = 'start',
  label,
  className,
}) {
  const custom = value != null && !colors.some((c) => c.value === value);
  const hasCustom = picker || customTile;
  const tile = hasCustom && (
    <SelectTile size={size} label={label + ' 색 직접 고르기'} selected={custom} fill={custom ? value : 'rainbow'} />
  );
  const opt = picker === true ? {} : picker || {};
  return (
    <SelectRow leading={photo ? <PhotoTile size={size} {...photo} label={photo.label || label + ' 사진'} /> : leading} label={label + ' 색'} align={align} className={className}>
      {colors.map((c) => (
        <SelectTile key={c.value} size={size} label={label + ' ' + c.label} selected={value === c.value} fill={c.value} onClick={() => onChange?.(c.value)} />
      ))}
      {tile && (picker
        ? <ColorPickerPopup trigger={tile} value={value || opt.start || '#ffffff'} onChange={onChange} title={opt.title || label + ' 색'} />
        : customTile(tile))}
    </SelectRow>
  );
}
