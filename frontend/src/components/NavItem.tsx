import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
}

export default function NavItem({ to, icon, label, collapsed = false }: NavItemProps) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center rounded-lg text-sm font-medium transition-all duration-150 ${
          collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
        } ${
          isActive
            ? "bg-forge-accent text-white shadow-sm"
            : "text-forge-muted hover:text-white hover:bg-forge-hover"
        }`
      }
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}