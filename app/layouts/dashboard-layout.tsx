import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <main className="w-full px-12 flex min-h-screen flex-col">
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
