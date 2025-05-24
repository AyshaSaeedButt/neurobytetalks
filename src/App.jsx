import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : null;

  //  return (
  //     <div className="min-h-screen flex flex-wrap content-between bg-gray-50">
  //       <div className="w-full block">
  //         <Header />
  //         <main>
  //           {loading ? (
  //             <div className="text-center py-10 text-xl text-gray-500">
  //               Loading...
  //             </div>
  //           ) : (
  //             <Outlet />
  //           )}
  //         </main>
  //         <Footer />
  //       </div>
  //     </div>
  //   );
}
export default App;
