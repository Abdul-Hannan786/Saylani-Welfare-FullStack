import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Spotlight } from "@/components/ui/spotlight";

const UserLayout = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(195, 100%, 65%, 0.12) 0, hsla(190, 100%, 55%, 0.06) 50%, hsla(195, 100%, 50%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(190, 100%, 80%, 0.12) 0, hsla(195, 100%, 65%, 0.06) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 80%, 0.10) 0, hsla(195, 100%, 70%, 0.10) 80%, transparent 100%)"
      />

      <Navbar />
      <div className="relative pt-32 md:pt-36">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
