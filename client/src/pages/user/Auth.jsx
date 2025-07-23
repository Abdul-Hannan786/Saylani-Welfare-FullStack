import LoginForm from "@/components/user/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";

const Auth = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 p-5">
      <div className="flex flex-col gap-6 p-6 md:p-2">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <img
                src="https://saylaniwelfare.com/favicon.png"
                alt="Logo"
                loading="lazy"
              />
            </div>
            <p className="text-xl text-gray-800 font-semibold">
              Saylani Welfare
            </p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://res.cloudinary.com/saylani-welfare/image/upload/v1717165115/website-images/dynamic/868109e7-078d-4508-ab5c-75baa05a48ea.jpg"
          alt="Image"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-xl"
        />
      </div>
    </div>
  );
};

export default Auth;
