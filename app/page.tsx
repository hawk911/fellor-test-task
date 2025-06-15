"use client";

import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { StatsCards } from "../components/StatsCards";
import { HiringInsights } from "../components/HiringInsights";
import { UpcomingInterviews } from "../components/UpcomingInterviews";
import { TopActiveJobs } from "../components/TopActiveJobs";
import { TodoList } from "../components/TodoList";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="md:ml-64">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white h-full shadow-lg z-50">
            <Sidebar mobile />
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setSidebarOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <HiringInsights />
            </div>

            <div>
              <UpcomingInterviews />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopActiveJobs />
            <TodoList />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
