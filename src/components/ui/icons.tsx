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
