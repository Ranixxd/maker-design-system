/* lucide-react를 통째로(import *) 끌어오면 이름을 런타임 문자열로 찾는
   구조라 Rollup이 무엇이 쓰이는지 빌드 타임에 알 수 없어 전체(~800KB)가
   묶여 들어간다. 실제 쓰는 것만 이름 import로 등록해 tree-shaking되게 한다.

   새 아이콘이 필요하면: 1) 여기 import에 추가  2) ICONS에 추가
   3) Icon.stories.jsx의 CommonIcons 목록에도 추가(문서가 이 레지스트리와
   어긋나지 않게) */
import {
  Home, Palette, Bell, Settings,
  ChevronRight, ChevronLeft, ChevronDown,
  Minus, Check, Info,
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
  /* 뒤집기 (2026-10-15). 배경 만들기의 그라디언트 반전 모서리 단추 */
  ArrowUpDown,
  /* 신고하기 (2026-10-15). 카톡테마 메이커 블로그 댓글 [⋯] 메뉴 */
  Siren,
  /* 사진 고르기 메뉴의 만들던 배경화면·배경 만들기에서 만들기 (2026-10-20). 카톡테마 메이커 프로필 사진, 덕꾸 앱과 같은 아이콘 */
  Wallpaper, Brush,
  /* 판 위 개체 도구 줄(ObjectBox)의 맨 앞으로·맨 뒤로 (2026-10-20) */
  LayersArrowUp, LayersArrowDown,
  /* 사진 고르기 메뉴의 이모지 (2026-10-20). 카톡테마 메이커 쉽게 시작하기의 [내 사진]/[이모지] */
  Smile,
  /* 판 위 개체 도구 줄(ObjectBox)의 복사 (2026-10-21). 카톡테마 메이커 프로필 사진 파츠 */
  Copy,
  /* 캐러셀의 다음 칸으로 (2026-10-24). 이전은 ArrowLeft */
  ArrowRight,
  /* 카톡테마 메이커 편집기 단추(EditFab)의 테마모드·쉽게시작, 배경 만들기의 모양섞기, 작성자 SNS 새 탭 열기 (2026-10-26). 웹이 lucide-react로 바로 그리던 것을 옮겨 왔다 */
  Moon, Sun, WandSparkles, Shuffle, SquareArrowOutUpRight,
  /* 카톡테마 메이커 말풍선 만들기의 도구 줄(말풍선·크기 가이드)과 자르기 도구(기본과 위치 맞추기·자동 자르기), 글자 자리 손잡이 (2026-10-26) */
  MessageCirclePlus, Scan, ScanSquare, RulerDimensionLine, MoveVertical, MoveHorizontal,
  createLucideIcon,
} from 'lucide-react';

/* 획이 엇갈리는 X·Plus는 두 path를 한 path로 합쳐 다시 만든다. 루시드 원본은 획마다 따로 칠해
   아이폰 사파리에서 위 획 가장자리가 아래 획을 밝게 끊는 일이 있었다. 한 path는 한 번에 칠해 이음매가 없다 */
const X = createLucideIcon('x', [['path', { d: 'M18 6 6 18M6 6l12 12', key: 'x' }]]);
const Plus = createLucideIcon('plus', [['path', { d: 'M5 12h14M12 5v14', key: 'plus' }]]);

const ICONS = {
  Home, Palette, Bell, Settings,
  ChevronRight, ChevronLeft, ChevronDown,
  X, Plus, Minus, Check, Info,
  Upload, Download, Pencil, Trash2,
  Image, Layers, Menu, MoreHorizontal,
  User, LogOut,
  Folder, FolderPlus, Astroid, RotateCcw,
  CircleHelp, Search, ImagePlus, Eraser,
  ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown, Siren,
  Wallpaper, Brush, Smile,
  LayersArrowUp, LayersArrowDown, Copy,
  Moon, Sun, WandSparkles, Shuffle, SquareArrowOutUpRight,
  MessageCirclePlus, Scan, ScanSquare, RulerDimensionLine, MoveVertical, MoveHorizontal,
};

/* sm 20 / md 24 (2026-09-18, 16 / 20에서 한 단계씩 키웠다). 폰에서 알아보기 작았다 */
const SIZES = { sm: 20, md: 24 };

/* 크기별 실제 굵기(화면 px): md 2, sm 1.5 (2026-10-26 사용자). 루시드 strokeWidth는 24칸 그림판 단위라
   그대로 2를 주면 20px에서 2×20/24 ≈ 1.67px로 보여 크기마다 굵기가 갈렸다. 그래서 실제 px를 24칸 단위로 바꿔 넘긴다(sm 1.8).
   루시드 absoluteStrokeWidth를 켜지 않은 것은 쓰는 쪽이 넘기는 strokeWidth의 뜻(24칸 단위)을 바꾸지 않으려서다.
   CSS로 크기를 줄인 곳(SearchField 지우기 X 12px 등)은 그 크기에서 맞는 값을 24칸 단위로 넘긴다 */
const STROKE_PX = { sm: 1.5, md: 2 };
const strokeOf = (size) => (STROKE_PX[size] * 24) / SIZES[size];

export default function Icon({ name, size = 'md', className, style, color, ...props }) {
  const LucideIcon = ICONS[name];
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      size={SIZES[size]}
      strokeWidth={strokeOf(size)}
      color={color ?? 'currentColor'}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}
