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
  User, LogOut,
  /* 카톡테마 메이커 더보기 메뉴 (2026-09-17) */
  Folder, FolderPlus, Astroid, RotateCcw,
  /* 제목 옆 도움말 (2026-09-17) */
  CircleHelp,
  /* 찾기칸 (2026-09-18) */
  Search,
  /* 편집기 항목 줄의 사진 올리기 (2026-09-19) */
  ImagePlus,
  /* 편집 판 위 단추(EditFab)의 배경 지우기 (2026-09-25) */
  Eraser,
  /* 뒤로 가기 (2026-09-25). 쉐브론은 더보기·펼치기로 읽혀서 뒤로 가기는 화살표로 가른다 */
  ArrowLeft,
  /* 맨 위로 (2026-09-25) */
  ArrowUp,
} from 'lucide-react';

const ICONS = {
  Home, Palette, Bell, Settings,
  ChevronRight, ChevronLeft, ChevronDown,
  X, Plus, Minus, Check, Info,
  Upload, Download, Pencil, Trash2,
  Image, Layers, Menu, MoreHorizontal,
  User, LogOut,
  Folder, FolderPlus, Astroid, RotateCcw,
  CircleHelp, Search, ImagePlus, Eraser,
  ArrowLeft, ArrowUp,
};

/* sm 20 / md 24 (2026-09-18, 16 / 20에서 한 단계씩 키웠다). 폰에서 알아보기 작았다 */
const SIZES = { sm: 20, md: 24 };

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
