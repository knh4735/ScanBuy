import React from "react";
import { useDispatch } from "react-redux";
import { increaseItem, decreaseItem, deleteItem } from "../reducers/cart";
import "./Item.css";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const { id, name, price, amount } = item;
  const itemImg = require(`../products/${name}.webp`);

  return (
    <div className="Item" item-id={id}>
      <img className="Item-img" alt={name} src={itemImg} />
      <div className="Item-text-wrap">
        <div className="Item-name">{name}</div>
        <div className="Item-price">₩ {Number(price).toLocaleString()}</div>
      </div>
      <div className="Item-etc">
        <div
          className="Item-up-btn Item-btn"
          onClick={() => dispatch(increaseItem(id))}
        >
          ▲
        </div>
        <div className="Item-amount">{amount}</div>
        <div
          className="Item-down-btn Item-btn"
          onClick={() => {
            if (amount === 1) dispatch(deleteItem(id));
            else dispatch(decreaseItem(id));
          }}
        >
          ▼
        </div>
        <div
          className="Item-delete-btn Item-btn"
          onClick={() => dispatch(deleteItem(id))}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default Item;
