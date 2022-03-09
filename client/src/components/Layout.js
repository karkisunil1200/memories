import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import AuthBox from "./AuthBox";
import Header from "./Header";

const Layout = () => {
  const { fetchingUser } = useGlobalContext();

  return fetchingUser ? (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route expact path="/" element={<AuthBox />} />
        <Route expact path="/register" element={<AuthBox register />} />
      </Routes>
    </Router>
  );
};

export default Layout;
