import { NavLink } from "@/lib/router";
import { cn } from "../lib/utils";
import { useSidebar } from "../context/SidebarContext";
import type { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  className?: string;
  badge?: number;
  badgeTone?: "default" | "danger";
  textBadge?: string;
  textBadgeTone?: "default" | "amber";
  alert?: boolean;
  liveCount?: number;
}

export function SidebarNavItem({
  to,
  label,
  icon: Icon,
  end,
  className,
  badge,
  badgeTone = "default",
  textBadge,
  textBadgeTone = "default",
  alert = false,
  liveCount,
}: SidebarNavItemProps) {
  const { isMobile, setSidebarOpen } = useSidebar();

  return (
    <NavLink
      to={to}
      end={end}
      onClick={() => { if (isMobile) setSidebarOpen(false); }}
      className={({ isActive }) =>
        cn(
          // LabelHead sidebar nav item — left border indicator for active, no bg fill
          "relative flex items-center gap-2.5 px-3 py-1.5 text-[13px] transition-colors",
          isActive
            ? "font-medium text-[#F2F0EB] border-l-2 border-[#00E5FF] pl-[10px]"
            : "font-normal text-[#8A8880] border-l-2 border-transparent pl-[10px] hover:bg-[#1A1A1A] hover:text-[#F2F0EB]",
          className,
        )
      }
    >
      <span className="relative shrink-0">
        <Icon className="h-3.5 w-3.5" />
        {alert && (
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
        )}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {textBadge && (
        <span
          className={cn(
            "ml-auto rounded-md px-1 py-0.5 text-[10px] font-medium leading-none",
            textBadgeTone === "amber"
              ? "bg-[#F59E0B14] text-[#F59E0B] border border-[#F59E0B33]"
              : "bg-[#1A1A1A] text-[#4A4845] border border-[#222222]",
          )}
        >
          {textBadge}
        </span>
      )}
      {liveCount != null && liveCount > 0 && (
        <span className="ml-auto flex items-center gap-1.5">
          {/* Static dot — no pulse per LabelHead design spec */}
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
          <span className="text-[11px] font-medium text-[#00E5FF] tabular-nums">{liveCount}</span>
        </span>
      )}
      {badge != null && badge > 0 && (
        <span
          className={cn(
            "ml-auto rounded-md px-1 py-0.5 text-[10px] leading-none font-medium",
            badgeTone === "danger"
              ? "bg-[#EF444414] text-[#EF4444] border border-[#EF444433]"
              : "bg-[#1A1A1A] text-[#8A8880] border border-[#222222]",
          )}
        >
          {badge}
        </span>
      )}
    </NavLink>
  );
}
