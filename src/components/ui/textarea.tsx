import * as React from "react";

import { cn } from "@utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, name, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={name} className="font-semibold">
            {label}
          </label>
        )}

        <textarea
          id={name}
          name={name}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <span
            role="alert"
            className="text-sm mt-2 text-red-600 font-semibold"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
