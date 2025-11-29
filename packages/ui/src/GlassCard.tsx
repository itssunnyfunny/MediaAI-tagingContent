import * as React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    );
}
