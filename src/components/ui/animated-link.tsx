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
      "relative inline-block text-muted-foreground transition-colors duration-150",
      "underline decoration-muted-foreground/30 underline-offset-2",
      "hover:text-foreground hover:decoration-accent/60",
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
      "group inline-flex items-center gap-1.5",
      "text-foreground no-underline transition-colors duration-150",
      "hover:no-underline",
      "hover:text-accent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      className
    );

    const content = (
      <>
        <span>{children}</span>
        {arrow && (
          <span
            className="text-accent transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.68, 0, 1)" }}
          >
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
