import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";

export default function MainLayouts() {
  return (
    <>
      <Toaster />
      <header>
        <Navbar />        
      </header>      
      <main className="font-nunito min-h-[calc(100vh-325px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
