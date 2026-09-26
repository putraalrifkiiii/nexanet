export const BUTTONBASESTYLES =
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export const BUTTONVARIANTS = {
  primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-sm",
  secondary: "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-sm",
  outline:
    "border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.45)] hover:bg-brand-offwhite/10",
  danger: "bg-brand-danger text-white hover:bg-brand-danger/90",
  light:
    "text-sm font-semibold text-brand-blue bg-brand-white hover:opacity-90 transition-opacity font-body ",
  glass:
    "bg-[rgba(255,255,255,0.14)] text-brand-white hover:bg-white/20 transition-colors",
};

export const BUTTONSIZES = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};
