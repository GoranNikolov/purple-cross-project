export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 disabled:bg-primary-300",
  secondary:
    "bg-surface-light-alt dark:bg-surface-dark-alt text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/30 focus-visible:ring-primary-500",
  danger:
    "bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500 disabled:bg-danger-300",
  ghost:
    "bg-transparent text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 focus-visible:ring-primary-500",
  outline:
    "bg-transparent border border-current text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-primary-500",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
};
