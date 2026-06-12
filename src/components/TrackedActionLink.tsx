"use client";

import Link, { LinkProps } from "next/link";
import { capture } from "@/lib/analytics";
import { MouseEvent, ReactNode } from "react";

interface TrackedActionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function TrackedActionLink({
  children,
  className,
  eventName,
  eventProps,
  external = false,
  onClick,
  ...props
}: TrackedActionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    capture(eventName, eventProps);
    onClick?.(event);
  };

  if (external) {
    return (
      <a
        className={className}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        href={String(props.href)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
