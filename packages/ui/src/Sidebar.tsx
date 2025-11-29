import * as React from "react";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    return (
        <aside className={`w-64 h-screen bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 ${className || ""}`}>
            <div className="mb-10">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    TagGen
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                <a href="#" className="flex items-center px-4 py-3 text-white bg-white/10 rounded-lg transition-colors">
                    <span className="mr-3">🏠</span> Home
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <span className="mr-3">📜</span> History
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <span className="mr-3">⚙️</span> Settings
                </a>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                    <span className="text-sm text-gray-300">User Profile</span>
                </div>
            </div>
        </aside>
    );
}
