import { parseUserInfo, refreshExp } from "@/hooks/common/getCookie";
import { useRefreshToken } from "@/hooks/common/useAPI";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "@/component/common/sideBar/sideBar";
import AdminHeader from "@/component/common/header/header";

const AdminLayout = () => {
  const user = parseUserInfo();
  const isRefresh = refreshExp();
  const refresh = useRefreshToken();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!user && isRefresh) {
      refresh()
        .then(() => {
          window.location.reload();
        })
        .catch(() => {});
    }
  }, []);

  if (!user && !isRefresh) {
    return <Navigate to="/admin/login" />;
  }

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{
        backgroundColor: "var(--admin-bg)",
        color: "var(--admin-text)",
      }}
    >
      <AdminSidebar collapsed={sidebarCollapsed} />

      <main className="flex h-screen flex-1 flex-col min-w-0">
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        <section className="flex-1 px-4 py-5 min-h-0">
          <div className="w-full h-full min-h-0 overflow-y-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
