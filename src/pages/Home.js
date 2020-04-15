import React from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "../Logo.svg";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home-logo-wrapper">
        <img src={LogoImg} alt="Scan Buy" className="Home-logo" />
      </div>
      <div className="Home-btn-wrapper">
        <NavLink
          className="Home-shop-wrapper Home-btn"
          exact
          to="/shop/detector"
        >
          <div>Go Shopping</div>
        </NavLink>
        <div className="Home-menu-wrapper Home-btn">
          <div className="Home-menu">Manual</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
