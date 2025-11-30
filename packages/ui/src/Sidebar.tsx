import * as React from "react";
import { Home, History, Settings, User, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
    className?: string;
    collapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ className, collapsed = false, onToggle }: SidebarProps) {
    return (
        <aside
            className={`h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                } ${className || ""}`}
        >
            <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-6 mb-4`}>
                {!collapsed && (
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">
                        TagGen
                    </h1>
                )}
                {onToggle && (
                    <button
                        onClick={onToggle}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                )}
            </div>

            <nav className="flex-1 space-y-2 px-3">
                <SidebarLink icon={Home} label="Home" collapsed={collapsed} active />
                <SidebarLink icon={History} label="History" collapsed={collapsed} />
                <SidebarLink icon={Settings} label="Settings" collapsed={collapsed} />
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10 p-3">
                <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                        <User className="w-5 h-5" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-white truncate">User Profile</span>
                            <span className="text-xs text-gray-400 truncate">Pro Plan</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

interface SidebarLinkProps {
    icon: React.ElementType;
    label: string;
    collapsed?: boolean;
    active?: boolean;
}

function SidebarLink({ icon: Icon, label, collapsed, active }: SidebarLinkProps) {
    return (
        <a
            href="#"
            className={`flex items-center ${collapsed ? "justify-center px-2" : "px-4"} py-3 rounded-xl transition-all group ${active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            title={collapsed ? label : undefined}
        >
            <Icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"} ${active ? "text-blue-400" : "text-gray-500 group-hover:text-purple-400"} transition-colors`} />
            {!collapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
        </a>
    );
}
