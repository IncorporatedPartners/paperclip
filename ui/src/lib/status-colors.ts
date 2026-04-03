/**
 * Canonical status & priority color definitions.
 *
 * Every component that renders a status indicator (StatusIcon, StatusBadge,
 * agent status dots, etc.) should import from here so colors stay consistent.
 */

// ---------------------------------------------------------------------------
// Issue status colors
// ---------------------------------------------------------------------------

/** StatusIcon circle: text + border classes */
export const issueStatusIcon: Record<string, string> = {
  backlog: "text-muted-foreground border-muted-foreground",
  todo: "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400",
  in_progress: "text-yellow-600 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400",
  in_review: "text-violet-600 border-violet-600 dark:text-violet-400 dark:border-violet-400",
  done: "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400",
  cancelled: "text-neutral-500 border-neutral-500",
  blocked: "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400",
};

export const issueStatusIconDefault = "text-muted-foreground border-muted-foreground";

/** Text-only color for issue statuses (dropdowns, labels) */
export const issueStatusText: Record<string, string> = {
  backlog: "text-muted-foreground",
  todo: "text-blue-600 dark:text-blue-400",
  in_progress: "text-yellow-600 dark:text-yellow-400",
  in_review: "text-violet-600 dark:text-violet-400",
  done: "text-green-600 dark:text-green-400",
  cancelled: "text-neutral-500",
  blocked: "text-red-600 dark:text-red-400",
};

export const issueStatusTextDefault = "text-muted-foreground";

// ---------------------------------------------------------------------------
// Badge colors — used by StatusBadge for all entity types
// ---------------------------------------------------------------------------

// LabelHead badge palette — dark, restrained, no colored backgrounds
export const statusBadge: Record<string, string> = {
  // Agent statuses
  active: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E33]",
  running: "bg-[#00E5FF14] text-[#00E5FF] border border-[#00E5FF33]",
  paused: "bg-[#1A1A1A] text-[#8A8880] border border-[#222222]",
  idle: "bg-[#1A1A1A] text-[#8A8880] border border-[#222222]",
  archived: "bg-[#1A1A1A] text-[#4A4845] border border-[#222222]",

  // Goal statuses
  planned: "bg-[#1A1A1A] text-[#8A8880] border border-[#222222]",
  achieved: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E33]",
  completed: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E33]",

  // Run statuses
  failed: "bg-[#EF444414] text-[#EF4444] border border-[#EF444433]",
  timed_out: "bg-[#F59E0B14] text-[#F59E0B] border border-[#F59E0B33]",
  succeeded: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E33]",
  error: "bg-[#EF444414] text-[#EF4444] border border-[#EF444433]",
  terminated: "bg-[#EF444414] text-[#EF4444] border border-[#EF444433]",
  pending: "bg-[#F59E0B14] text-[#F59E0B] border border-[#F59E0B33]",

  // Approval statuses
  pending_approval: "bg-[#F59E0B14] text-[#F59E0B] border border-[#F59E0B33]",
  revision_requested: "bg-[#F59E0B14] text-[#F59E0B] border border-[#F59E0B33]",
  approved: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E33]",
  rejected: "bg-[#EF444414] text-[#EF4444] border border-[#EF444433]",

  // Issue statuses
  backlog: "bg-[#1A1A1A] text-[#4A4845] border border-[#222222]",
  todo: "bg-[#1A1A1A] text-[#8A8880] border border-[#222222]",
  in_progress: "bg-[#F59E0B14] text-[#F59E0B] border border-[#F59E0B33]",
  in_review: "bg-[#00E5FF14] text-[#00E5FF] border border-[#00E5FF33]",
  blocked: "bg-[#EF444414] text-[#EF4444] border border-[#EF444433]",
  done: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E33]",
  cancelled: "bg-[#1A1A1A] text-[#4A4845] border border-[#222222]",
};

export const statusBadgeDefault = "bg-[#1A1A1A] text-[#4A4845] border border-[#222222]";

// ---------------------------------------------------------------------------
// Agent status dot — solid background for small indicator dots
// LabelHead palette: static only (no pulse animations)
// ---------------------------------------------------------------------------

export const agentStatusDot: Record<string, string> = {
  running: "bg-[#00E5FF]",
  active: "bg-[#22C55E]",
  paused: "bg-[#4A4845]",
  idle: "bg-[#4A4845]",
  pending_approval: "bg-[#F59E0B]",
  error: "bg-[#EF4444]",
  archived: "bg-[#2A2A2A]",
};

export const agentStatusDotDefault = "bg-[#2A2A2A]";

// ---------------------------------------------------------------------------
// Priority colors
// ---------------------------------------------------------------------------

export const priorityColor: Record<string, string> = {
  critical: "text-red-600 dark:text-red-400",
  high: "text-orange-600 dark:text-orange-400",
  medium: "text-yellow-600 dark:text-yellow-400",
  low: "text-blue-600 dark:text-blue-400",
};

export const priorityColorDefault = "text-yellow-600 dark:text-yellow-400";
