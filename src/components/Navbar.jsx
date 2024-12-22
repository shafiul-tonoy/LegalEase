import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navItems = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  const dropdownItems = (
    <>
      <li>
        <a>hello 1</a>
      </li>
      <li>
        <a>Submenu 2</a>
      </li>
    </>
  );

  return (
    <div className="w-full md:w-10/12 mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
              <li>
                <a>Dashboard</a>
                <ul className="p-2">{dropdownItems}</ul>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
            <li>
              <details>
                <summary>Dashboard</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
            <a>Login</a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
