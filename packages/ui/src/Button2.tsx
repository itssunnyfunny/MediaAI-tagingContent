import * as React from "react";

export function Button2({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // use the token-based classes from theme.css (e.g., bg-primary-500)
  return (
    <button className={`bg-primary-500 text-white hover:bg-primary-600 rounded-md p-2 text-sm font-medium flex items-center justify-center ${className}`} {...props}>
      {children}
    </button>
  );
}
