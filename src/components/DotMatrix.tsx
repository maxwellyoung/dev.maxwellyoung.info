import React from "react";

type DotMatrixProps = {
  /**
   * Optional extra class names to adjust masking/positioning per page.
   */
  className?: string;
};

/**
 * Subtle, performant dot-matrix backdrop using a CSS radial-gradient.
 * Rendered fixed and non-interactive behind all content.
 */
export default function DotMatrix({ className = "" }: DotMatrixProps) {
  return <div aria-hidden className={`dot-matrix ${className}`} />;
}
