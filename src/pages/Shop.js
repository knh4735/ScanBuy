import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Header, Tab, Detector, Cart, History } from "../components";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="Shop">
      <div className="Shop-header">
        <Header />
      </div>
      <div className="Shop-main">
        <Router>
          <Route exact path="/shop/detector" component={Detector} />
          <Route exact path="/shop/cart" component={Cart} />
          <Route exact path="/shop/history" component={History} />
        </Router>
      </div>
      <div className="Shop-tab">
        <Tab />
      </div>
    </div>
  );
};

export default Shop;
