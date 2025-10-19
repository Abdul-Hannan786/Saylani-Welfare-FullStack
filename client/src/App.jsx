/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/user/Auth";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserLayout from "./components/user/layout/UserLayout";
import { useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";
import useStore from "./store/store";
import api from "./axios";
import Loading from "./components/user/Loading";
import UploadReport from "./pages/admin/UploadReport";
import Vitals from "./pages/admin/Vitals";
import Report from "./pages/admin/Report";
import Timeline from "./pages/admin/Timeline";

function App() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useStore();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/auth/verify-token");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        {/* <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Auth />}
        /> */}

        <Route element={user ? <AdminLayout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadReport />} />
          <Route path="/vitals" element={<Vitals />} />
          <Route path="/report" element={<Report />} />
          <Route path="/timeline" element={<Timeline />} />
        </Route>

        <Route element={user && <Navigate to="/dashboard" />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
          </Route>
        </Route>

        <Route
          path="/auth"
          element={user ? <Navigate to="/dashboard" /> : <Auth />}
        />

        {/*  */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
