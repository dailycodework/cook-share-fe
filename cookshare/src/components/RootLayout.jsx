import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    
  return (
    <main>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
