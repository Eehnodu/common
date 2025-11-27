// src/component/common/sideBar/adminMenu.ts
import { FolderKanban, LucideIcon, Folder, Users } from "lucide-react";

export interface BaseLinkItem {
  label: string;
  to: string;
  icon?: LucideIcon;
}

export interface AdminLinkItem extends BaseLinkItem {
  type: "link";
}

export interface AdminGroupItem {
  type: "group";
  title: string;
  icon?: LucideIcon;
  children: BaseLinkItem[];
}

export type AdminMenuItem = AdminLinkItem | AdminGroupItem;

export const ADMIN_MENU: AdminMenuItem[] = [
  {
    type: "link",
    label: "단일",
    icon: FolderKanban,
    to: "/admin/link",
  },
  {
    type: "group",
    title: "그룹",
    icon: Folder,
    children: [
      { label: "그룹1", to: "/admin/group1", icon: Users },
      { label: "그룹2", to: "/admin/group2", icon: Users },
    ],
  },
];

/**
 * ADMIN_MENU 기반으로 자동 생성되는 라우트 타이틀 맵
 */
export const ROUTE_TITLES: Record<string, string> = ADMIN_MENU.reduce(
  (acc, item) => {
    if (item.type === "link") {
      acc[item.to] = item.label;
    } else {
      item.children.forEach((child) => {
        acc[child.to] = child.label;
      });
    }
    return acc;
  },
  {} as Record<string, string>
);

export const getTitleByPath = (pathname: string) => {
  const key = Object.keys(ROUTE_TITLES)
    .sort((a, b) => b.length - a.length)
    .find((k) => pathname === k || pathname.startsWith(k + "/"));

  return (key && ROUTE_TITLES[key]) || "Unknown Mode";
};
