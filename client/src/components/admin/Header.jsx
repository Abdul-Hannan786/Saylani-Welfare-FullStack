import React from "react";
import { Button } from "../ui/button";
import api from "@/axios";
import toast from "react-hot-toast";
import useStore from "@/store/store";

const Header = () => {
  const { setUser } = useStore();

  const handleSignOut = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
      }
    } catch (error) {
      toast.error("error in signing out");
      console.log(error.message);
    }
  };
  return (
    <header className="hidden items-center justify-between shadow-md gap-5 p-5 sm:flex lg:py-5 xl:gap-10 !important">
      <h2 className="font-bold text-2xl text-gray-800">Admin Dashboard</h2>
      <div className="flex-center min-w-fit gap-4">
        <form onSubmit={handleSignOut}>
          <Button
            type="submit"
            className="flex-center h-[52px] min-w-[54px] items-center rounded-full bg-[#FA7275]/10 p-0 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20 cursor-pointer"
          >
            <img
              src="src/assets/logout.svg"
              alt="logout"
              className="w-6"
              width={24}
              height={24}
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
