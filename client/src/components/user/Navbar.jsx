import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { LogOut, Menu } from "lucide-react";
import useStore from "@/store/store";
import toast from "react-hot-toast";
import api from "@/axios";

const Navbar = () => {
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
    <nav className="fixed z-50 top-6 inset-x-4 h-16 sm:h-16 bg-background/40 backdrop-blur-xs border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex gap-2 items-center">
          <img
            src="https://saylaniwelfare.com/favicon.png"
            alt="logo"
            width={45}
            height={45}
          />
          <p className="font-semibold text-lg md:text-xl text-gray-800">
            HealthMate
          </p>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
            <NavigationMenuItem>
              <NavigationMenuLink className={"text-[16px]"} asChild>
                <Link to="/home">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={"text-[16px]"} asChild>
                <Link to="/about-us">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={"text-[16px]"} asChild>
                <Link to="/contact-us">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="#testimonials">Testimonials</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          {user.role === "admin" && (
            <Link to="/admin">
              <Button className="hidden sm:block rounded-full cursor-pointer font-semibold">
                Dashboard
              </Button>
            </Link>
          )}

          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="hidden rounded-full sm:inline-flex cursor-pointer px-4 font-semibold active:scale-95 transition"
          >
            <LogOut />
            Sign Out
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="p-8 flex flex-col gap-10 items-start justify-start">
                <div className="flex gap-2 items-center">
                  <img
                    src="https://saylaniwelfare.com/favicon.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <p className="font-semibold text-xl text-gray-800">
                    HealthMate
                  </p>
                </div>
                {/* <NavMenu  /> */}

                <NavigationMenu orientation="vertical" className="flex-0">
                  <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
                    <NavigationMenuItem>
                      <NavigationMenuLink className="text-[16px]" asChild>
                        <Link to="/home">Home</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="text-[16px]" asChild>
                        <Link to="/about-us">About</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="text-[16px]" asChild>
                        <Link to="/contact-us">Contact</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                      <NavigationMenuLink className="text-[16px]" asChild>
                        <Link to="#testimonials">Testimonials</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem> */}
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex flex-col gap-3 w-full">
                  {user.role === "admin" && (
                    <Link to="/admin">
                      <Button className="w-full sm:hidden rounded-full font-semibold">
                        Dashboard
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="destructive"
                    className="w-full sm:hidden rounded-full"
                    onClick={handleSignOut}
                  >
                    <LogOut className="font-semibold" />
                    Sign Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
