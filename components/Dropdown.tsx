import React, { useState } from "react";
import { cn } from "../utils";

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
  open?: boolean;
}

interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
}) => {
  return <div className={cn("relative", className)}>{children}</div>;
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  className,
  align = "start",
  open = false,
  ...props
}) => {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80",
        {
          "left-0": align === "start",
          "right-0": align === "end",
          "left-1/2 -translate-x-1/2": align === "center",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
