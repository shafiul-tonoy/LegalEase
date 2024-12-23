import ThemeToggle from "./ThemeToggle";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PiSignOutLight, PiSignInLight } from "react-icons/pi";
import logo1 from '../assets/logo-1.jpg'

export default function Navbar() {
  const { user, logout } = useAuth();
  const navItems = (
    <>
      <li className="">
        <NavLink to="/" className="text-linksColor">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className="text-linksColor">
          All Services
        </NavLink>
      </li>
    </>
  );
  const dropdownItems = (
    <>
      <li className="w-36">
        <Link to="/addService">Add Service</Link>
      </li>
      <li>
        <Link to="/manageService">Manage Service</Link>
      </li>
      <li>
        <Link to="/bookedService">Booked Service</Link>
      </li>
      <li>
        <Link to="/serviceToDo">Service To Do</Link>
      </li>
    </>
  );

  return (
    <div className="w-full md:w-10/12 mx-auto ">
      <div className="navbar bg-base-100">
        <div className="navbar-start ">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1050] mt-3  p-2 shadow"
            >
              {navItems}
              <li>
                <a>Dashboard</a>
                <ul className="p-2 ">{dropdownItems}</ul>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <img src={logo1} className= 'h-20 object-cover' />
            <Link to="/" className="btn btn-ghost text-xl p-0">
              Legal Ease
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            {navItems}
            <li>
              <details>
                <summary>Dashboard</summary>
                <ul className="p-2 border rounded-lg bg-base-100 shadow-lg z-[1] ">
                  {dropdownItems}
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
            {user && user?.email ? (
              <div className="flex items-center gap-1">
                <div
                  className="tooltip  tooltip-left"
                  data-tip={user.displayName}
                >
                  <img
                    src={user.photoURL}
                    alt="image"
                    className="w-10 h-10 rounded-full object-cover object-top"
                  ></img>
                </div>

                <button
                  className="btn btn-ghost text-linksColor"
                  onClick={logout}
                >
                  Logout
                  <PiSignOutLight />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost ">
                  {" "}
                  <PiSignInLight size="18" />
                  <span className="text-linksColor">Login</span>
                </Link>
                <Link to="/register" className="btn btn-ghost ">
                  {" "}
                  <span className="text-linksColor">Register</span>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
