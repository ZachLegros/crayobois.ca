import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./orders.css";
const uuidv4 = require("uuid/v4");

const Orders = props => {
  const authContext = useContext(AuthContext);
  const [orders, setOrders] = authContext.orders;

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
          <div className="orders-container">
            <div className="columns-names">
              <ul>
                <li className="info-col">Commande</li>
                <li className="details-col">Détails</li>
                <li className="status-col">Statut</li>
              </ul>
            </div>
            <div className="orders">
              {orders.map(order => {
                return (
                  <div className="order" key={uuidv4()}>
                    <div className="order-info info-col">
                      <span>{`#${order.customId}`}</span>
                    </div>
                    <div className="order-details details-col">
                      <span>{parseDate(order.create_time)}</span>
                      <span>
                        {`Expédié à: ${order.payer.name.given_name} ${order.payer.name.surname}`}
                      </span>
                      <span>
                        {`Total: ${order.purchase_units[0].amount.value}`}
                      </span>
                    </div>
                    <div className="order-status status-col">
                      <span>{order.order_status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Orders;
