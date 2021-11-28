import React from "react";

interface PageTextProps {
  className?: string;
  fontSize?: string;
  color?: string;
  children: React.ReactNode;
}

export const PageText: React.FC<PageTextProps> = ({
  className,
  fontSize,
  children,
}: PageTextProps) => {
  return <span className={className}>{children}</span>;
};
