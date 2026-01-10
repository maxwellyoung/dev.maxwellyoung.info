"use client";

import { forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

/**
 * AnimatedLink - A link with a delightful underline animation
 *
 * Inspired by: Emil Kowalski (motion grammar), Mariana Castilho (fluid interfaces)
 *
 * The underline grows from the left on hover, creating a sense of
 * momentum and intentionality.
 */

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ children, className, external, ...props }, ref) => {
    const baseClasses = cn(
      "relative inline-block text-muted-foreground transition-colors duration-200",
      "hover:text-foreground",
      "after:absolute after:bottom-0 after:left-0 after:h-[1px]",
      "after:w-full after:origin-left after:scale-x-0",
      "after:bg-current after:transition-transform after:duration-300 after:ease-out",
      "hover:after:scale-x-100",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      className
    );

    if (external) {
      return (
        <a
          ref={ref}
          className={baseClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link ref={ref} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }
);

AnimatedLink.displayName = "AnimatedLink";

/**
 * AccentLink - A prominent link with accent color
 *
 * For CTAs and important actions.
 */
interface AccentLinkProps extends AnimatedLinkProps {
  arrow?: boolean;
}

export const AccentLink = forwardRef<HTMLAnchorElement, AccentLinkProps>(
  ({ children, className, arrow = true, external, ...props }, ref) => {
    const baseClasses = cn(
      "group inline-flex items-center gap-2",
      "text-foreground transition-colors duration-200",
      "hover:text-accent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      className
    );

    const content = (
      <>
        <span>{children}</span>
        {arrow && (
          <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        )}
      </>
    );

    if (external) {
      return (
        <a
          ref={ref}
          className={baseClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link ref={ref} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }
);

AccentLink.displayName = "AccentLink";
