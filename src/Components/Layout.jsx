import React from "react";
import Header from "./header";
import Footer from "./footer";
import Tost from "./Tost";

const Layout = ({ children }) => {
  return (
    <>
      <Tost />
      {/* <Header /> */}
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
