import type { DefaultComponentProps } from "../../types/componentProps";

export default function H3Heading({
  children,
  className = "text-center mb-4 text-2xl text-content",
}: DefaultComponentProps) {
  return <h3 className={className}>{children}</h3>;
}
