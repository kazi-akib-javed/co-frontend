import React from "react";

const Layout = ({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">a</div>
      <div className="col-span-2">{children}</div>
      <div className="col-span-1">c</div>
    </div>
  );
};

export default Layout;
