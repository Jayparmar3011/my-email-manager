import React from "react";

const CollapseIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 12,
}) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export default CollapseIcon;
