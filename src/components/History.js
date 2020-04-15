import React from "react";
import { useSelector } from "react-redux";
import HistoryItem from "./HistoryItem";
import HistoryImg from "./History.svg";
import "./History.css";

const History = () => {
  const { history } = useSelector(state => state.cart, []);
  const { date, items } = history;

  const itemList = items.map(item => <HistoryItem key={item.id} item={item} />);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.amount),
    0
  );

  const watermark = {
    backgroundImage: `url(${HistoryImg})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "250px",
    backgroundPosition: "center"
  };

  return (
    <div className="History">
      <div className="History-watermark" style={watermark}></div>
      <div className="History-items">{itemList}</div>
      <div className="History-info">
        <div className="History-date">{date}</div>
        <div className="History-price">
          ₩ {Number(totalPrice).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default History;
