"use client";

import { useState } from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./Dropdown";

export function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-gray-900 font-medium">Home</span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search..."
            className="w-64 pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative block md:hidden"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => setDropdownOpen((v) => !v)}>
            <span className="gap-2 flex items-center">
              Quick Actions
              <ChevronDown className="h-4 w-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent open={dropdownOpen} align="end">
            <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
              Add New Job
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
              Generate Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
