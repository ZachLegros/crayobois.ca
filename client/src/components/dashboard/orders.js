import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import CvsContext from "../context/cvsContext";
import "./orders.css";
import FocusedOrder from "./focusedOrder";
const uuidv4 = require("uuid/v4");

const Orders = props => {
  const authContext = useContext(AuthContext);
  const context = useContext(CvsContext);
  const [orders, setOrders] = authContext.orders;
  const [moreDetails, setMoreDetails] = useState("");
  const [focusedOrder, setFocusedOrder] = context.focusedOrder;

  const priceFormatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  const parseDate = prevDate => {
    let allowedChar = "0123456789-";
    let newDate = "";

    for (let e = 0; e < prevDate.length; e++) {
      if (allowedChar.includes(prevDate[e])) {
        newDate += prevDate[e];
      } else {
        break;
      }
    }

    return newDate;
  };

  const removeFocus = () => {
    setFocusedOrder(null);
  };

  const toggleHandler = uid => {
    if (moreDetails === uid) {
      setMoreDetails("");
    } else {
      setMoreDetails(uid);
    }
  };

  return (
    <React.Fragment>
      {orders.length === 0 ? (
        <React.Fragment>
          <span className="dashboard-content-header">Mes commandes</span>
          <span className="dashboard-notice">
            Vous n'avez effectué aucune commande
          </span>
        </React.Fragment>
      ) : (
        <section className="orders-section">
          {focusedOrder ? (
            <FocusedOrder order={focusedOrder} removeFocus={removeFocus} />
          ) : (
            <div className="orders">
              {orders.map(order => {
                return (
                  <div
                    className="order"
                    onClick={() => {
                      setFocusedOrder(order);
                      const d = document.querySelector(".dashboard-right");
                    }}
                    key={order.id}
                  >
                    <div className="order-id-container">
                      <span className="order-text">
                        #{order.customId - 100000000}
                      </span>
                    </div>
                    <div className="order-client-info-container">
                      <div className="order-user">
                        <div className="order-user-info">
                          <span className="order-text">
                            <i className="fas fa-user order-icon"></i>
                            {`${order.payer.name.given_name} ${order.payer.name.surname}`}
                          </span>
                          <span className="order-text">
                            <i className="fas fa-envelope order-icon"></i>
                            {order.payer.email_address}
                          </span>
                        </div>
                        <span className="order-text">
                          <i className="far fa-calendar-alt order-icon"></i>
                          {parseDate(order.create_time)}
                        </span>
                      </div>
                    </div>
                    <div className="order-info-container">
                      <div className="order-info-quantities">
                        <span className="order-text">
                          {priceFormatter.format(
                            order.purchase_units[0].amount.value
                          )}
                        </span>
                        <span className="order-text">
                          {order.purchase_units[0].items.length}
                          <i className="fas fa-pen-alt order-icon order-icon-right"></i>
                        </span>
                      </div>
                      <span className="order-text order-state">
                        {order.order_status === "Livré"
                          ? "Livré"
                          : "En attente"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </React.Fragment>
  );
};

export default Orders;
