import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";

export default function MainLayouts() {
  return (
    <>
      <Toaster />
      <header>
        <div className="fixed top-0 left-0 right-0 z-[1000] w-screen ">
          <Navbar />
        </div>
      </header>
      <main className="font-nunito min-h-[calc(100vh-325px)] pt-20">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
