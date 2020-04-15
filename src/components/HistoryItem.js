import React from "react";
import "./HistoryItem.css";

const HistoryItem = ({ item }) => {
  const { id, name, price, amount } = item;
  const itemImg = require(`../products/${name}.webp`);

  return (
    <div className="HistoryItem" item-id={id}>
      <img className="HistoryItem-img" alt={name} src={itemImg} />
      <div className="HistoryItem-text-wrap">
        <div className="HistoryItem-name">{name}</div>
        <div className="HistoryItem-price">
          ₩ {Number(price).toLocaleString()} &times; {amount}
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
