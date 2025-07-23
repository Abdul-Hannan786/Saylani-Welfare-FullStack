import { Route, Routes } from "react-router-dom";
import Auth from "./pages/user/Auth";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
// import Navbar from "./components/user/Navbar";
import UserLayout from "./components/user/layout/UserLayout";

function App() {
  // const { pathname } = useLocation();
  // const hideNavbar = pathname === "/" || pathname.startsWith("/admin");
  return (
    <>
      {/* {!hideNavbar && } */}

      <Routes>
        <Route path="/" element={<Auth />} />

        <Route element={<UserLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
