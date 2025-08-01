import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/axios";
import useStore from "@/store/store";

const LoginForm = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useStore();

  const validateForm = () => {
    if (state === "state") {
      if (name.length < 2) {
        toast.error("Name must be at least 2 characters long");
        return false;
      }
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (cnic.length !== 13) {
      toast.error("CNIC must be 13 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { data } = await api.post(`/api/auth/${state}`, {
        name,
        email,
        password,
        cnic,
      });
      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        console.log(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal server error");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-5")}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle
                className="w-5 h-5 animate-spin text-white"
                strokeWidth={3}
              />
            </>
          ) : state === "login" ? (
            "Login"
          ) : (
            "Create account"
          )}
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
