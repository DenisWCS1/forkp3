import PropTypes from "prop-types";
import React from "react";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Layout;
