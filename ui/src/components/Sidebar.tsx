import {
  Inbox,
  CircleDot,
  Target,
  LayoutDashboard,
  DollarSign,
  History,
  Search,
  SquarePen,
  Network,
  Boxes,
  Repeat,
  Settings,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SidebarSection } from "./SidebarSection";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarProjects } from "./SidebarProjects";
import { SidebarAgents } from "./SidebarAgents";
import { useDialog } from "../context/DialogContext";
import { useCompany } from "../context/CompanyContext";
import { heartbeatsApi } from "../api/heartbeats";
import { queryKeys } from "../lib/queryKeys";
import { useInboxBadge } from "../hooks/useInboxBadge";
import { Button } from "@/components/ui/button";
import { PluginSlotOutlet } from "@/plugins/slots";

export function Sidebar() {
  const { openNewIssue } = useDialog();
  const { selectedCompanyId, selectedCompany } = useCompany();
  const inboxBadge = useInboxBadge(selectedCompanyId);
  const { data: liveRuns } = useQuery({
    queryKey: queryKeys.liveRuns(selectedCompanyId!),
    queryFn: () => heartbeatsApi.liveRunsForCompany(selectedCompanyId!),
    enabled: !!selectedCompanyId,
    refetchInterval: 10_000,
  });
  const liveRunCount = liveRuns?.length ?? 0;

  function openSearch() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }

  const pluginContext = {
    companyId: selectedCompanyId,
    companyPrefix: selectedCompany?.issuePrefix ?? null,
  };

  return (
    <aside className="w-60 h-full min-h-0 bg-[#0A0A0A] p-2 pr-0 flex flex-col">
      <div className="flex-1 min-h-0 rounded-2xl bg-[#111111] flex flex-col overflow-hidden">
      {/* Top bar: Company name + Search */}
      <div className="flex items-center gap-1 px-3 h-12 shrink-0">
        {selectedCompany?.brandColor && (
          <div
            className="w-3.5 h-3.5 rounded-[4px] shrink-0 ml-1"
            style={{ backgroundColor: selectedCompany.brandColor }}
          />
        )}
        <span className="flex-1 text-[13px] font-semibold text-[#F2F0EB] truncate pl-1">
          {selectedCompany?.name ?? "Select company"}
        </span>
      </div>

      {/* Pill search bar */}
      <div className="px-3 pb-2 shrink-0">
        <button
          onClick={openSearch}
          className="flex items-center gap-2 w-full rounded-full bg-[#1A1A1A] px-3 py-1.5 text-[12px] text-[#4A4845] hover:text-[#8A8880] transition-colors"
        >
          <Search className="h-3 w-3 shrink-0" />
          <span>Search dashboard...</span>
        </button>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-auto-hide flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-0.5">
          {/* New Issue button */}
          <button
            onClick={() => openNewIssue()}
            className="relative flex items-center gap-2.5 px-3 py-1.5 pl-[10px] text-[13px] font-normal text-[#8A8880] border-l-2 border-transparent hover:bg-[#1A1A1A] hover:text-[#F2F0EB] transition-colors"
          >
            <SquarePen className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">New Issue</span>
          </button>
          <SidebarNavItem to="/dashboard" label="Dashboard" icon={LayoutDashboard} liveCount={liveRunCount} />
          <SidebarNavItem
            to="/inbox"
            label="Inbox"
            icon={Inbox}
            badge={inboxBadge.inbox}
            badgeTone={inboxBadge.failedRuns > 0 ? "danger" : "default"}
            alert={inboxBadge.failedRuns > 0}
          />
          <PluginSlotOutlet
            slotTypes={["sidebar"]}
            context={pluginContext}
            className="flex flex-col gap-0.5"
            itemClassName="text-[13px] font-medium"
            missingBehavior="placeholder"
          />
        </div>

        <SidebarSection label="Work">
          <SidebarNavItem to="/issues" label="Issues" icon={CircleDot} />
          <SidebarNavItem to="/routines" label="Routines" icon={Repeat} textBadge="Beta" textBadgeTone="amber" />
          <SidebarNavItem to="/goals" label="Goals" icon={Target} />
        </SidebarSection>

        <SidebarProjects />

        <SidebarAgents />

        <SidebarSection label="Company">
          <SidebarNavItem to="/org" label="Org" icon={Network} />
          <SidebarNavItem to="/skills" label="Skills" icon={Boxes} />
          <SidebarNavItem to="/costs" label="Costs" icon={DollarSign} />
          <SidebarNavItem to="/activity" label="Activity" icon={History} />
          <SidebarNavItem to="/company/settings" label="Settings" icon={Settings} />
        </SidebarSection>

        <PluginSlotOutlet
          slotTypes={["sidebarPanel"]}
          context={pluginContext}
          className="flex flex-col gap-3"
          itemClassName="rounded-lg border border-border p-3"
          missingBehavior="placeholder"
        />
      </nav>
      </div>
    </aside>
  );
}
