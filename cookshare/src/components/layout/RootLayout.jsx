import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
    
  return (
    <main>
    <Header/>
      <div>
        <Outlet />
      </div>
      <Footer/>
    </main>
  );
};

export default RootLayout;
