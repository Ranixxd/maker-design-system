/* lucide-react를 통째로(import *) 끌어오면 이름을 런타임 문자열로 찾는
   구조라 Rollup이 무엇이 쓰이는지 빌드 타임에 알 수 없어 전체(~800KB)가
   묶여 들어간다. 실제 쓰는 것만 이름 import로 등록해 tree-shaking되게 한다.

   새 아이콘이 필요하면: 1) 여기 import에 추가  2) ICONS에 추가
   3) Icon.stories.jsx의 CommonIcons 목록에도 추가(문서가 이 레지스트리와
   어긋나지 않게) */
import {
  Home, Palette, Bell, Settings,
  ChevronRight, ChevronLeft, ChevronDown,
  X, Plus, Minus, Check, Info,
  Upload, Download, Pencil, Trash2,
  Image, Layers, Menu, MoreHorizontal,
} from 'lucide-react';

const ICONS = {
  Home, Palette, Bell, Settings,
  ChevronRight, ChevronLeft, ChevronDown,
  X, Plus, Minus, Check, Info,
  Upload, Download, Pencil, Trash2,
  Image, Layers, Menu, MoreHorizontal,
};

const SIZES = { sm: 16, md: 20 };

export default function Icon({ name, size = 'md', className, style, color, ...props }) {
  const LucideIcon = ICONS[name];
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      size={SIZES[size]}
      strokeWidth={2}
      color={color ?? 'currentColor'}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}
