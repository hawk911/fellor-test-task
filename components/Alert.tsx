import React from "react";
import { cn } from "../utils";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ className, ...props }) => {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        className
      )}
      {...props}
    />
  );
};

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}; 