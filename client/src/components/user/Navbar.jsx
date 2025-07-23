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
import { Menu } from "lucide-react";

const Navbar = () => {
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
            Saylani Welfare
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
          <Button className="hidden sm:block rounded-full cursor-pointer">
            Dashboard
          </Button>
          <Button
            variant="destructive"
            className="hidden rounded-full sm:inline-flex cursor-pointer"
          >
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
                    Saylani Welfare
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

                <Button
                  variant="destructive"
                  className="w-full sm:hidden rounded-full"
                >
                  Sign Out
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
