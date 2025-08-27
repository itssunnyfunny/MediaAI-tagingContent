import * as React from "react";

export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // use the token-based classes from theme.css (e.g., bg-primary-500)
  return (
    <button className={`inline-flex items-center px-3 py-2 rounded-[--radius-md] text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 ${className}`} {...props}>
      {children}
    </button>
  );
}
