import React from "react";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./Layout.css";
/* eslint-disable react/prop-types */
function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
