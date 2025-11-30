import * as React from "react";
import { Home, History, Settings, User } from "lucide-react";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    return (
        <aside className={`w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 ${className || ""}`}>
            <div className="mb-10 px-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    TagGen
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                <a href="#" className="flex items-center px-4 py-3 text-white bg-white/10 rounded-xl transition-all hover:bg-white/15 group">
                    <Home className="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="font-medium">Home</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                    <History className="w-5 h-5 mr-3 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    <span className="font-medium">History</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                    <Settings className="w-5 h-5 mr-3 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    <span className="font-medium">Settings</span>
                </a>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">User Profile</span>
                        <span className="text-xs text-gray-400">Pro Plan</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
