import React from "react";

const ExpandIcon: React.FC<{ className?: string; size?: number }> = ({
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default ExpandIcon;
