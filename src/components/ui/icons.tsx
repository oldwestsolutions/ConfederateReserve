import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function createIcon(children: ReactNode) {
  const Icon = ({ className = "h-4 w-4", ...rest }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
  return Icon;
}

/* Arrows */
export const ArrowRight = createIcon(
  <>
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </>
);
export const ArrowDown = createIcon(
  <>
    <path d="M12 5v14" />
    <path d="M5 13l7 7 7-7" />
  </>
);
export const ArrowDownRight = createIcon(
  <>
    <path d="M7 7l10 10" />
    <path d="M17 8v9h-9" />
  </>
);
export const ArrowUpRight = createIcon(
  <>
    <path d="M7 17l10-10" />
    <path d="M8 7h9v9" />
  </>
);
export const ArrowDownToLine = createIcon(
  <>
    <path d="M12 3v14" />
    <path d="M6 11l6 6 6-6" />
    <path d="M4 21h16" />
  </>
);
export const ArrowUpFromLine = createIcon(
  <>
    <path d="M12 21V7" />
    <path d="M18 13l-6-6-6 6" />
    <path d="M4 3h16" />
  </>
);
export const ArrowRightLeft = createIcon(
  <>
    <path d="M17 3l4 4-4 4" />
    <path d="M21 7H9" />
    <path d="M7 21l-4-4 4-4" />
    <path d="M3 17h12" />
  </>
);

/* Chevrons */
export const ChevronDown = createIcon(<path d="M6 9l6 6 6-6" />);
export const ChevronUp = createIcon(<path d="M18 15l-6-6-6 6" />);
export const ChevronRight = createIcon(<path d="M9 6l6 6-6 6" />);

/* Close / menu */
export const X = createIcon(
  <>
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </>
);
export const Menu = createIcon(
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </>
);

/* Theme */
export const Moon = createIcon(<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />);
export const Sun = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.42 1.42" />
    <path d="M17.65 17.65l1.42 1.42" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.93 19.07l1.42-1.42" />
    <path d="M17.65 6.35l1.42-1.42" />
  </>
);

/* Finance */
export const Wallet = createIcon(
  <>
    <path d="M3 7a2 2 0 012-2h12a2 2 0 012 2v2h1a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    <path d="M15 13h3" />
  </>
);
export const Coins = createIcon(
  <>
    <circle cx="9" cy="9" r="6" />
    <circle cx="15" cy="15" r="6" />
  </>
);
export const CircleDollarSign = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9.5A3 3 0 0012 8c-1.657 0-3 1-3 2.5s1.343 2.5 3 2.5 3 1 3 2.5-1.343 2.5-3 2.5a3 3 0 01-3-1.5" />
    <path d="M12 6v2" />
    <path d="M12 16v2" />
  </>
);
export const TrendingUp = createIcon(
  <>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M17 7h4v4" />
  </>
);
export const Zap = createIcon(<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />);

/* Security */
export const Shield = createIcon(<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />);
export const ShieldCheck = createIcon(
  <>
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </>
);
export const Lock = createIcon(
  <>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </>
);

/* Status / activity */
export const Activity = createIcon(<path d="M22 12h-4l-3 9L9 3l-3 9H2" />);
export const Radio = createIcon(
  <>
    <circle cx="12" cy="12" r="2" />
    <path d="M4.93 19.07a10 10 0 010-14.14" />
    <path d="M19.07 4.93a10 10 0 010 14.14" />
    <path d="M7.76 16.24a6 6 0 010-8.48" />
    <path d="M16.24 7.76a6 6 0 010 8.48" />
  </>
);
export const RefreshCcw = createIcon(
  <>
    <path d="M3 12a9 9 0 0115-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 01-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </>
);
export const CheckCircle2 = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" />
  </>
);
export const Loader2 = createIcon(
  <>
    <path d="M21 12a9 9 0 11-9-9" />
  </>
);

/* Documents */
export const BookOpen = createIcon(
  <>
    <path d="M3 5h6a3 3 0 013 3v12a2 2 0 00-2-2H3z" />
    <path d="M21 5h-6a3 3 0 00-3 3v12a2 2 0 012-2h7z" />
  </>
);
export const Code2 = createIcon(
  <>
    <path d="M8 7L3 12l5 5" />
    <path d="M16 7l5 5-5 5" />
    <path d="M14 4l-4 16" />
  </>
);
export const FileText = createIcon(
  <>
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
    <path d="M14 3v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h8" />
    <path d="M8 9h3" />
  </>
);
export const FileCheck2 = createIcon(
  <>
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
    <path d="M14 3v6h6" />
    <path d="M8 15l2 2 4-4" />
  </>
);
export const Layers = createIcon(
  <>
    <path d="M12 2L3 7l9 5 9-5-9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </>
);

/* Navigation / misc */
export const LayoutGrid = createIcon(
  <>
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </>
);
export const PlusCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </>
);
export const Settings = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" />
  </>
);
export const Settings2 = Settings;
export const Bell = createIcon(
  <>
    <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10 21a2 2 0 004 0" />
  </>
);
export const Sparkles = createIcon(
  <>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  </>
);
export const Sprout = createIcon(
  <>
    <path d="M7 20h10" />
    <path d="M12 20V8" />
    <path d="M12 8c0-3 3-5 6-5 0 4-3 5-6 5z" />
    <path d="M12 12c0-2-2-4-5-4 0 3 2 4 5 4z" />
  </>
);
export const ExternalLink = createIcon(
  <>
    <path d="M14 4h6v6" />
    <path d="M20 4L10 14" />
    <path d="M20 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h5" />
  </>
);
export const Link = createIcon(
  <>
    <path d="M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" />
    <path d="M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" />
  </>
);
export const Download = createIcon(
  <>
    <path d="M12 3v12" />
    <path d="M6 11l6 6 6-6" />
    <path d="M4 21h16" />
  </>
);
export const Mail = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </>
);
export const Globe = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 010 18" />
    <path d="M12 3a14 14 0 000 18" />
  </>
);

/* Social (glyph-style filled paths; render via currentColor) */
type GlyphProps = SVGProps<SVGSVGElement> & { className?: string };
function createGlyph(children: ReactNode) {
  const Icon = ({ className = "h-4 w-4", ...rest }: GlyphProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
  return Icon;
}

export const TwitterX = createGlyph(
  <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.86l-5.37-6.66L4.04 22H.78l8.02-9.16L.5 2h7.01l4.84 6.07L18.244 2zm-2.4 18h1.9L7.25 4H5.23l10.615 16z" />
);
export const Discord = createGlyph(
  <path d="M20.317 4.37A19.79 19.79 0 0016.885 3.1a.08.08 0 00-.085.04 13.68 13.68 0 00-.6 1.24 18.33 18.33 0 00-5.487 0 12.64 12.64 0 00-.61-1.24.083.083 0 00-.085-.04 19.76 19.76 0 00-3.432 1.27.07.07 0 00-.033.028C2.72 8.06 2.07 11.65 2.39 15.19a.08.08 0 00.031.055 19.9 19.9 0 005.99 3.03.084.084 0 00.09-.03 14.2 14.2 0 001.23-2 .077.077 0 00-.042-.106 13.17 13.17 0 01-1.88-.9.08.08 0 01-.007-.132c.126-.095.252-.194.373-.293a.08.08 0 01.083-.01c3.93 1.79 8.18 1.79 12.06 0a.08.08 0 01.084.01c.12.1.247.2.374.293a.08.08 0 01-.006.132 12.42 12.42 0 01-1.88.9.077.077 0 00-.042.107 15.97 15.97 0 001.23 2 .082.082 0 00.09.03 19.83 19.83 0 006-3.03.08.08 0 00.031-.055c.375-4.11-.63-7.67-2.665-10.79a.06.06 0 00-.032-.03zM8.02 13.33c-1.183 0-2.157-1.09-2.157-2.43 0-1.34.955-2.43 2.157-2.43 1.21 0 2.175 1.1 2.157 2.43 0 1.34-.955 2.43-2.157 2.43zm7.975 0c-1.183 0-2.157-1.09-2.157-2.43 0-1.34.955-2.43 2.157-2.43 1.21 0 2.175 1.1 2.157 2.43 0 1.34-.946 2.43-2.157 2.43z" />
);
export const Telegram = createGlyph(
  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-2 1.94c-.23.23-.42.42-.82.42z" />
);
export const Github = createGlyph(
  <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1.01.11-.78.42-1.32.77-1.62-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.86.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
);
export const LinkedIn = createGlyph(
  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.32V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
);
export const Medium = createGlyph(
  <path d="M2.846 6.887c.03-.295-.083-.587-.302-.786L.55 3.82v-.302h5.893L11.004 13.5l4-9.98h5.62v.3l-1.707 1.636a.502.502 0 00-.19.482V17.65a.5.5 0 00.19.482l1.667 1.636v.301h-8.373v-.3l1.728-1.676c.17-.17.17-.22.17-.482V7.68L7.32 20.038h-.65L1.076 7.68v8.285c-.046.348.07.7.314.95l2.248 2.726v.3H.046v-.3l2.248-2.727a1.16 1.16 0 00.3-.948V6.887z" />
);
