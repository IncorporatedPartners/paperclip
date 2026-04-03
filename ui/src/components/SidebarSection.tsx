import type { ReactNode } from "react";

interface SidebarSectionProps {
  label: string;
  children: ReactNode;
}

export function SidebarSection({ label, children }: SidebarSectionProps) {
  return (
    <div>
      <div data-sidebar-section-label className="px-3 py-1.5 text-[10px] font-medium uppercase text-[#4A4845]" style={{ letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div className="flex flex-col gap-0.5 mt-0.5">{children}</div>
    </div>
  );
}
