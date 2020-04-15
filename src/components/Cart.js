import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import Pay from "./Pay";
import CartImg from "./Cart.svg";
import "./Cart.css";

const Cart = () => {
  const { items } = useSelector(state => state.cart, []);

  const itemList = items.map(item => <Item item={item} key={item.id} />);

  const watermark = {
    backgroundImage: `url(${CartImg})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "250px",
    backgroundPosition: "center"
  };

  return (
    <div className="Cart">
      <div className="Cart-watermark" style={watermark}></div>
      <div className="Cart-items">{itemList}</div>
      <div className="Cart-pay">
        <Pay items={items} />
      </div>
    </div>
  );
};

export default Cart;
