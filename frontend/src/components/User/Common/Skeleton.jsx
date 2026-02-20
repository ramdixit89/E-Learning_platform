import React from "react";

/**
 * Skeleton — animated shimmer placeholder.
 *
 * Props:
 *  width    — CSS width   (default: "100%")
 *  height   — CSS height  (default: "1rem")
 *  radius   — border-radius  (default: "8px")
 *  count    — how many lines to render  (default: 1)
 *  gap      — gap between multiple lines (default: "0.5rem")
 *  circle   — render a circle (overrides radius)
 */
const Skeleton = ({
  width = "100%",
  height = "1rem",
  radius = "8px",
  count = 1,
  gap = "0.5rem",
  circle = false,
  style = {},
}) => {
  const sharedStyle = {
    display: "block",
    width: circle ? height : width,
    height,
    borderRadius: circle ? "50%" : radius,
    background: "linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-shimmer 1.6s ease-in-out infinite",
    flexShrink: 0,
    ...style,
  };

  if (count === 1) return <span style={sharedStyle} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            ...sharedStyle,
            // Slightly vary last line width for realistic feel
            width: i === count - 1 && count > 1 ? "65%" : width,
          }}
        />
      ))}
    </div>
  );
};

// ── Pre-built composite skeletons ─────────────────────────────────────────────

/** Course card placeholder */
export const CourseCardSkeleton = () => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", overflow: "hidden",
  }}>
    <Skeleton height="200px" radius="0" />
    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Skeleton height="12px" width="40%" />
      <Skeleton height="18px" width="80%" />
      <Skeleton height="12px" count={2} />
      <Skeleton height="36px" radius="9999px" style={{ marginTop: "0.5rem" }} />
    </div>
  </div>
);

/** Blog card placeholder */
export const BlogCardSkeleton = () => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", overflow: "hidden",
  }}>
    <Skeleton height="200px" radius="0" />
    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Skeleton height="20px" width="60px" radius="9999px" />
        <Skeleton height="20px" width="50px" radius="9999px" />
      </div>
      <Skeleton height="18px" width="90%" />
      <Skeleton height="12px" count={3} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Skeleton width="28px" height="28px" circle />
          <Skeleton height="12px" width="80px" />
        </div>
        <Skeleton height="12px" width="50px" />
      </div>
    </div>
  </div>
);

/** Stat card placeholder */
export const StatCardSkeleton = () => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", padding: "1.5rem",
    display: "flex", flexDirection: "column", gap: "0.75rem",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Skeleton width="44px" height="44px" radius="10px" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <Skeleton height="12px" width="60%" />
        <Skeleton height="22px" width="40%" />
      </div>
    </div>
  </div>
);

/** Dashboard course row placeholder */
export const DashboardCourseSkeleton = () => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", padding: "1.25rem",
    display: "flex", flexDirection: "column", gap: "0.75rem",
  }}>
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Skeleton width="56px" height="56px" radius="10px" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <Skeleton height="14px" width="75%" />
        <Skeleton height="11px" width="40%" />
      </div>
    </div>
    <Skeleton height="6px" radius="9999px" />
    <Skeleton height="34px" radius="9999px" />
  </div>
);

export default Skeleton;
