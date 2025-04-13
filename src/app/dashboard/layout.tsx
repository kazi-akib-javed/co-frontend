import React from "react";
import Search from "../components/search/page";

const Layout = ({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1"></div>
      <div className="col-span-2">{children}</div>
      <div className="col-span-1">c</div>
    </div>
  );
};

export default Layout;
