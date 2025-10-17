import { LayoutDashboard, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import useStore from "@/store/store";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import api from "@/axios";
import toast from "react-hot-toast";

const adminNav = [
  { name: "Admin", icon: <LayoutDashboard />, url: "/admin" },
  { name: "Dashboard", icon: <LayoutDashboard />, url: "/admin/dashboard" },
];

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, setUser } = useStore();

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
    <header className="flex justify-between py-4 px-5 sm:hidden">
      <div className="flex items-center gap-2">
        <img
          src="https://saylaniwelfare.com/favicon.png"
          alt="logo"
          width={45}
          height={45}
        />
        <h2 className="text-xl font-bold text-gray-800">Saylani Welfare</h2>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="pt-0 h-screen px-3">
          <SheetTitle>
            <div className="my-3 flex items-center gap-2 rounded-full p-1 text-[#333F4E] sm:justify-center sm:bg-primary/10 lg:justify-start lg:p-3">
              <img
                src="/user.png"
                alt="avatar"
                className=" aspect-square w-10 rounded-full object-cover"
                width={44}
                height={44}
              />
              <div className="sm:hidden lg:block">
                <p className="text-[14px] leading-[20px] font-semibold capitalize">
                  {user.name}
                </p>
                <p className="text-[12px] leading-[16px] font-normal">
                  {user.email}
                </p>
              </div>
            </div>
            <Separator className="mb-4 bg-[#A3B2C7]/20 w-0" />
          </SheetTitle>
          <nav className="flex-1 gap-1 text-[#FA7275] text-[16px] leading-[24px] font-semibold">
            <ul className="flex flex-1 flex-col gap-4">
              {adminNav.map(({ name, url, icon }) => (
                <Link to={url} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "flex text-[#333F4E] gap-4 w-full justify-start items-center text-[16px] leading-[24px] font-semibold px-6 h-[52px] rounded-full",
                      pathname === url && "bg-primary text-white shadow-drop-2"
                    )}
                  >
                    <div className="w-6">{icon}</div>
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          {/* <Separator className="my-5 bg-[#A3B2C7]/20 w-0" /> */}
          <div className="flex flex-col justify-between gap-5 pb-5">
            <Button
              className="text-[16px] leading-[24px] font-semibold flex h-[52px] w-full items-center gap-4 rounded-full bg-[#FA7275]/10 px-6 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20 cursor-pointer"
              onClick={handleSignOut}
            >
              <img
                src="/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
