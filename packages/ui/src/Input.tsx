import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${className || ""}`}
            {...props}
        />
    );
}
