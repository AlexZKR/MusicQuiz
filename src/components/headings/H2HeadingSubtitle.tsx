import type { DefaultComponentProps } from "../../types/componentProps";

export default function H1HeadingSubtitle({
  children,
  className = "text-center mb-4 text-gray-600 dark:text-gray-400",
}: DefaultComponentProps) {
  return <p className={className}>{children}</p>;
}
