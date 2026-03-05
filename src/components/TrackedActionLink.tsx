"use client";

import Link, { LinkProps } from "next/link";
import posthog from "posthog-js";
import { MouseEvent, ReactNode } from "react";

interface TrackedActionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  external?: boolean;
}

export function TrackedActionLink({
  children,
  className,
  eventName,
  eventProps,
  external = false,
  ...props
}: TrackedActionLinkProps) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    posthog.capture(eventName, eventProps);
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
