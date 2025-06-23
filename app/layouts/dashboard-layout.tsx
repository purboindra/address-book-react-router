import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <header>
        <h1>Dashboard Header</h1>
        {/* You can include navigation links here */}
      </header>

      <div className="sidebar">
        {/* Sidebar content */}
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
        {/* The Outlet will render the nested route content */}
        <Outlet />
      </main>

      <footer>
        <p>Dashboard Footer</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
