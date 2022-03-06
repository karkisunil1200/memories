import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthBox from "./AuthBox";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route expact path="/" element={<AuthBox />} />
          <Route expact path="/register" element={<AuthBox register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Layout;
