import * as LucideIcons from 'lucide-react';

const SIZES = { sm: 16, md: 20 };

export default function Icon({ name, size = 'md', className, style, color, ...props }) {
  const LucideIcon = LucideIcons[name];
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
