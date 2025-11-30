"use client";

import { useState } from "react";
import { GlassCard, Sidebar, Input, Button } from "@repo/ui";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[url('/grid.svg')] bg-fixed bg-cover">
      {/* Sidebar */}
      <Sidebar
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50"
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <div className="flex items-center gap-4">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
                🔔
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                + New Project
              </Button>
            </div>
          </header>

          {/* Main Action Area */}
          <GlassCard className="p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Generate Tags</h3>
            <p className="text-gray-400 mb-6">Paste your article content or URL below to generate optimized tags.</p>

            <div className="space-y-4">
              <Input placeholder="https://example.com/article..." />
              <div className="relative">
                <textarea
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  placeholder="Or paste text content here..."
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg shadow-purple-500/30 font-medium transition-all transform hover:scale-105">
                  ✨ Generate Tags
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Tags */}
            <GlassCard>
              <h4 className="text-lg font-medium text-white mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-white transition-colors">
                        #
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Tech Trends 2025</p>
                        <p className="text-gray-500 text-xs">2 mins ago</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs group-hover:text-white">View</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Trending Topics */}
            <GlassCard>
              <h4 className="text-lg font-medium text-white mb-4">Trending Topics</h4>
              <div className="flex flex-wrap gap-2">
                {["AI", "Machine Learning", "Web3", "React", "Next.js", "Design", "Startup"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

        </div>
      </main>
    </div>
  );
}
