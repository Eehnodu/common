import SubLink from "./subLink";
import type { BaseLinkItem } from "./adminMenu";
import { LucideIcon } from "lucide-react";

interface GroupProps {
  title: string;
  links: BaseLinkItem[];
  icon?: LucideIcon;
  collapsed?: boolean;
}

const GroupLink = ({ title, links, icon: Icon, collapsed }: GroupProps) => {
  if (collapsed) {
    return (
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <SubLink
            key={link.to}
            to={link.to}
            label={link.label}
            icon={link.icon}
            collapsed
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="px-4 py-2 flex items-center gap-3 text-lg font-medium text-neutral-400">
        {Icon && <Icon className="h-4 w-4 text-neutral-400" />}
        <span className="truncate">{title}</span>
      </div>

      <div className="mt-2 flex flex-col gap-1">
        {links.map((link) => (
          <SubLink
            key={link.to}
            to={link.to}
            label={link.label}
            icon={link.icon}
            nested
          />
        ))}
      </div>
    </div>
  );
};

export default GroupLink;
