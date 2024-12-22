import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function MainLayouts() {
  return (
    <>
      <Toaster />
      <header>
        <Navbar />
      </header>
      <main className= 'font-nunito' >
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
