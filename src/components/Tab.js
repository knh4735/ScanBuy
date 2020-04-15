import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import HistoryImg from "./History.svg";
import CartImg from "./Cart.svg";
import DetectorImg from "./Detector.svg";
import "./Tab.css";

const Tab = () => {
  const { items } = useSelector(state => state.cart, []);
  const { history } = useSelector(state => state.cart, []);
  const cartIcon = useRef(null);
  const historyIcon = useRef(null);

  useEffect(() => {
    if (items.length === 0) return;
    cartIcon.current.style.animationName = "Icon-shake";
    setTimeout(() => (cartIcon.current.style.animationName = null), 600);
  }, [items]);

  useEffect(() => {
    if (history.items.length === 0) return;
    historyIcon.current.style.animationName = "Icon-shake";
    setTimeout(() => (historyIcon.current.style.animationName = null), 600);
  }, [history]);

  return (
    <div className="Tab">
      <NavLink className="Tab-detector Tab-link" exact to="/shop/detector">
        <img className="Tab-link-img" src={DetectorImg} alt="Scan" />
        <div className="Tab-link-text">Scan</div>
      </NavLink>
      <NavLink className="Tab-cart Tab-link" exact to="/shop/cart">
        <img
          className="Tab-link-img Icon-can-shake"
          src={CartImg}
          alt="Cart"
          ref={cartIcon}
        />
        <div className="Tab-link-text">Cart</div>
      </NavLink>
      <NavLink className="Tab-history Tab-link" exact to="/shop/history">
        <img
          className="Tab-link-img Icon-can-shake"
          src={HistoryImg}
          alt="History"
          ref={historyIcon}
        />
        <div className="Tab-link-text">History</div>
      </NavLink>
    </div>
  );
};

export default Tab;
