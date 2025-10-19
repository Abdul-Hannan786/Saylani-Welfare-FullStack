import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { LayoutDashboard, ClipboardPlus, Activity, History    } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const adminNav = [
  { name: "Dashboard", icon: <LayoutDashboard />, url: "/dashboard" },
  { name: "Upload Report", icon: <ClipboardPlus  />, url: "/upload" },
  { name: "Add Manual Vitals", icon: <Activity  />, url: "/vitals" },
  { name: "View Report", icon: <ClipboardPlus />, url: "/report" },
  { name: "View Timeline", icon: <History  />, url: "/timeline" },
];
const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useStore();

  return (
    <aside className="remove-scrollbar shadow-md hidden h-screen w-[90px] flex-col overflow-auto px-4 py-5 sm:flex lg:w-[270px] xl:w-[310px] !important">
      <Link to={"/"} className="flex gap-2 items-center">
        <img
          src="https://saylaniwelfare.com/favicon.png"
          alt="logo"
          width={50}
          height={50}
        />
        <h3 className="font-semibold text-gray-800 text-xl hidden lg:block">
          HealthMate
        </h3>
      </Link>

      <nav className="mt-9 flex-1 gap-1 text-[16px] leading-[24px] font-semibold text-primary">
        <ul className="flex flex-1 flex-col gap-6">
          {adminNav.map(({ icon, name, url }) => (
            <Link to={url} key={name} className="lg:w-full">
              <li
                className={cn(
                  "flex text-[#333F4E] gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center lg:px-[30px] h-[52px] lg:rounded-full !important text-[16px] leading-[24px] font-semibold",
                  pathname === url &&
                    "bg-primary text-white shadow-drop-(0 8px 30px 0 rgba(65, 89, 214, 0.3) !important"
                )}
              >
                <div className="w-6">{icon}</div>
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary/10 p-1 text-[#333F4E] lg:justify-start lg:p-3 !important">
        <img
          src="/user.png"
          alt="avatar"
          className="aspect-square w-10 rounded-full object-cover !important"
          width={44}
          height={44}
        />
        <div className="hidden lg:block">
          <p className="text-[14px] leading-[20px] font-semibold capitalize">
            {user.name}
          </p>
          <p className="text-[12px] leading-[16px] font-normal">{user.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
