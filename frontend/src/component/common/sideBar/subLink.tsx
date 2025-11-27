import { NavLink } from "react-router-dom";
import type { BaseLinkItem } from "./adminMenu";

interface SubLinkProps extends BaseLinkItem {
  nested?: boolean;
  collapsed?: boolean;
}

const SubLink = ({
  to,
  label,
  nested = false,
  collapsed = false,
  icon: Icon,
}: SubLinkProps) => {
  const base =
    "flex items-center rounded-lg select-none transition-all duration-200 text-lg min-w-0 ";

  const paddingClass = collapsed
    ? "justify-center px-3 py-2"
    : nested
      ? "pl-8 pr-3 py-2 text-sm"
      : "px-4 py-2";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        isActive
          ? `${base} ${paddingClass} bg-white/10 text-white font-medium`
          : `${base} ${paddingClass} text-neutral-300 hover:bg-white/5 hover:text-white/90`
      }
    >
      {Icon && (
        <Icon className={`h-4 w-4 flex-shrink-0 ${collapsed ? "" : "mr-3"}`} />
      )}

      <span
        className={`truncate whitespace-nowrap transition-all duration-300 ease-in-out ${
          collapsed ? "w-0 opacity-0 overflow-hidden -ml-1" : "opacity-100"
        }`}
        style={{
          transition: "opacity 300ms ease, width 300ms ease, margin 300ms ease",
        }}
      >
        {label}
      </span>
    </NavLink>
  );
};

export default SubLink;
