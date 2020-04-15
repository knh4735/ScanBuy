import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { pay } from "../reducers/cart";
import LogoImg from "../Logo.svg";
import "./Pay.css";

const Pay = ({ items }) => {
  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const totalPrice = items.reduce(
    (sum, item) => (sum += Number(item.price) * Number(item.amount)),
    0
  );

  const getDateString = date =>
    `${date.getFullYear()}-${
      date.getMonth() < 9 ? "0" + date.getMonth() + 1 : date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

  const payItems = () => {
    if (totalPrice === 0) {
      alert("No items to purchase");
      return;
    }

    const methodData = [
      {
        supportedMethods: "basic-card",
        data: {
          supportedNetworks: ["visa", "mastercard"]
        }
      }
    ];
    const details = {
      displayItems: items.map(item => {
        return {
          label: item.name,
          amount: {
            currency: "KRW",
            value: (Number(item.price) * Number(item.amount)).toString()
          }
        };
      }),
      total: {
        label: "Total",
        amount: { currency: "KRW", value: totalPrice }
      }
    };

    const options = {
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestPayerName: true
    };

    const payRequest = new PaymentRequest(methodData, details, options);

    payRequest
      .show()
      .then(paymentResponse => {
        const payTime = getDateString(new Date());

        Notification.requestPermission(result => {
          if (result === "granted") {
            navigator.serviceWorker.ready.then(registration => {
              registration.showNotification("Payment Complete", {
                body: `${paymentResponse.payerName} payed ₩ ${Number(
                  totalPrice
                ).toLocaleString()} at ${payTime}`,
                icon: LogoImg,
                vibrate: [200, 100, 200],
                tag: "Payment Complete"
              });
            });
          }
        });

        paymentResponse.complete("success");

        dispatch(pay(payTime));
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  const drag = e => {
    const left = "changedTouches" in e ? e.changedTouches[0].pageX : e.offsetX;
    const width = payBtn.current.offsetWidth;

    if (left < 0) return;
    else if (left > document.body.offsetWidth - width) return;

    payBtn.current.style.left = `${left}px`;
  };

  const dragStart = e => {
    payBtn.current.style.animationName = undefined;

    payBtn.current.addEventListener("touchmove", drag);
    payBtn.current.addEventListener("mousemove", drag);

    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);
  };

  const dragEnd = e => {
    const left = parseInt(payBtn.current.style.left);

    payBtn.current.style.animationName = "Pay-slide-back";
    payBtn.current.style.animationDuration = "0.5s";

    setTimeout(_ => {
      payBtn.current.style.left = `1px`;
      payBtn.current.style.animationName = "Pay-slide-bounce";
      payBtn.current.style.animationDuration = "2s";
    }, 480);

    payBtn.current.removeEventListener("touchmove", drag);
    payBtn.current.removeEventListener("mousemove", drag);

    document.removeEventListener("mouseup", dragEnd);
    document.removeEventListener("touchend", dragEnd);

    if (left > document.body.offsetWidth - payBtn.current.offsetWidth - 10)
      payItems();
  };

  return (
    <div className="Pay">
      <div
        className="Pay-slide"
        onMouseDown={dragStart}
        onTouchStart={dragStart}
        ref={payBtn}
      >
        <div className="Pay-slide-text">Pay</div>
      </div>
      <div className="Pay-price">₩ {Number(totalPrice).toLocaleString()}</div>
    </div>
  );
};

export default Pay;
