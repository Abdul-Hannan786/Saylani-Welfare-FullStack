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

function App() {
  const [loading, setLoading] = useState(false);
  const { user, setUser, setUsers } = useStore();

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

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const [userResponse, usersResponse] = await Promise.all([
  //       api.get("/api/auth/verify-token"),
  //       api.get("/api/user"),
  //     ]);

  //     if (userResponse.status === 200 && usersResponse.status === 200) {
  //       setUser(userResponse.data.user);
  //       setUsers(usersResponse.data.users);
  //     } else {
  //       console.error("Error in getting data");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchUser();
    // fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Auth />} />

        <Route element={user ? <UserLayout /> : <Navigate to="/" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
