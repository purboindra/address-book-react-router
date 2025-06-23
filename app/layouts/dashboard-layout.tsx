import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <main className="w-full px-12 flex min-h-screen flex-col bg-blue-300">
      <header>
        <h1>Dashboard Header</h1>
      </header>

      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Dashboard Home</a>
            </li>
            <li>
              <a href="/dashboard/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </div>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Dashboard Footer</p>
      </footer>
    </main>
  );
};

export default DashboardLayout;
