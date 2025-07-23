import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const LoginForm = () => {
  const [state, setState] = useState("login");
  return (
    <form className={cn("flex flex-col gap-5")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {state === "login" ? "Login to your account" : "Create an account"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {state === "login"
            ? "Enter your cnic, email and password to login"
            : "Enter your cnic, email and password to signup"}
        </p>
      </div>
      <div className="grid gap-6">
        {state === "register" && (
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div className="grid gap-3">
          <Label htmlFor="cnic">CNIC</Label>
          <Input
            id="cnic"
            type="number"
            placeholder="Enter your cnic"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          {state === "login" ? "Login" : "Create account"}
        </Button>
      </div>
      <div className="text-center text-sm">
        {state === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="underline underline-offset-4 text-primary font-semibold cursor-pointer"
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="underline underline-offset-4 text-primary font-semibold cursor-pointer"
            >
              Log in
            </span>
          </>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
