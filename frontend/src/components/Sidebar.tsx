import { NavLink } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  FileText,
  Star,
  Settings,
  Anvil,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import NavItem from "./NavItem";
import { useAuth } from "../context/authContext"

//this is only needed for text check/ cast?
interface SidebarProps {
  collapsed: boolean; 
  setCollapsed: (val: boolean) => void; // state setter 
} 


export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { user } = useAuth();
  const name = user?.name+"'s";
  return (
    <aside
      className={`h-screen bg-forge-sidebar flex flex-col border-r border-forge-border shrink-0 transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Logo qnd collapse button */}
      <div className="px-3 py-4 border-b border-forge-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-forge-accent flex items-center justify-center shrink-0">
              <Anvil size={16} color="white" />
            </div>
            <span className="text-black font-bold tracking-tight text-base">{name} Forge</span>
          </div>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded-md bg-forge-accent flex items-center justify-center mx-auto">
            <Anvil size={16} color="white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-forge-muted hover:text-white transition-colors"
          >
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>

      {/*if collapsed*/}
      {collapsed && (
        <div className="px-3 py-3 border-b border-forge-border flex justify-center">
          <button
            onClick={() => setCollapsed(false)}
            className="text-forge-muted hover:text-white transition-colors"
          >
            <PanelLeftOpen size={16} />
          </button>
        </div>
      )}

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-forge-border">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-forge-accent text-white"
                  : "text-forge-muted hover:text-white bg-forge-hover"
              }`
            }
          >
            <Search size={14} />
            <span>Search</span>
            <span className="ml-auto text-xs opacity-40">⌘K</span>
          </NavLink>
        </div>
      )}

      {/* search icon only when collpased cus its a text box */}
      {collapsed && (
        <div className="px-3 py-3 border-b border-forge-border flex justify-center">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-all ${
                isActive
                  ? "bg-forge-accent text-white"
                  : "text-forge-muted hover:text-white hover:bg-forge-hover"
              }`
            }
          >
            <Search size={15} />
          </NavLink>
        </div>
      )}

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-2 py-3 flex-1">
        {!collapsed && (
          <p className="text-xs font-semibold text-forge-muted/50 uppercase tracking-widest px-3 mb-1">
            Main
          </p>
        )}
        <NavItem to="/dashboard" icon={<LayoutDashboard size={15} />} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/projects" icon={<FolderOpen size={15} />} label="Projects" collapsed={collapsed} />
        <NavItem to="/tasks" icon={<CheckSquare size={15} />} label="Tasks" collapsed={collapsed} />
        <NavItem to="/report" icon={<FileText size={15} />} label="Report" collapsed={collapsed} />

        {!collapsed && (
          <p className="text-xs font-semibold text-forge-muted/50 uppercase tracking-widest px-3 mt-4 mb-1">
            Personal
          </p>
        )}
        {collapsed && <div className="my-2 border-t border-forge-border" />}
        <NavItem to="/favorites" icon={<Star size={15} />} label="Favorites" collapsed={collapsed} />
      </nav>

      {/* Settings */}
      <div className="px-2 py-3 border-t border-forge-border">
        <NavItem to="/settings" icon={<Settings size={15} />} label="Settings" collapsed={collapsed} />
      </div>
    </aside>
  );
}