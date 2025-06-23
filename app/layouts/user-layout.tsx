import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div>
      <header>
        <h1>User Profile</h1>
        {/* User navigation could be added here */}
      </header>

      <main>
        {/* The Outlet will render the nested route content */}
        <Outlet />
      </main>

      <footer>
        <p>User Footer</p>
      </footer>
    </div>
  );
};

export default UserLayout;
