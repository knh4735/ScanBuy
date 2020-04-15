import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelDetected } from "../reducers/view";
import { addItem } from "../reducers/cart";
import "./DetectedItem.css";

const DetectedItem = () => {
  const dispatch = useDispatch();
  const { detectedItem } = useSelector(state => state.view, []);

  const { id, name, price } = detectedItem;
  const amountInput = useRef(null);

  const itemImg = require(`../products/${name}.webp`);

  const addProduct = () => {
    dispatch(
      addItem({
        ...detectedItem,
        amount: Number(amountInput.current.value)
      })
    );
    dispatch(cancelDetected());
  };

  const cancelProduct = () => {
    dispatch(cancelDetected());
  };

  return (
    <div className="DetectedItem">
      <div className="DetectedItem-overlay"></div>
      <div className="DetectedItem-item" item-id={id}>
        <img className="DetectedItem-img" alt={name} src={itemImg} />
        <div className="DetectedItem-item-info">
          <div className="DetectedItem-text">
            <div className="DetectedItem-name">{name}</div>
            <div className="DetectedItem-price">₩ {price.toLocaleString()}</div>
          </div>
          <div className="DetectedItem-amount-wrapper">
            <input
              className="DetectedItem-amount"
              type="number"
              ref={amountInput}
              defaultValue="1"
            />
          </div>
        </div>
        <div className="DetectedItem-button">
          <button
            className="DetectedItem-cancel DetectedItem-btn"
            onClick={cancelProduct}
          >
            Cancel
          </button>
          <button
            className="DetectedItem-confirm DetectedItem-btn"
            onClick={addProduct}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetectedItem;
