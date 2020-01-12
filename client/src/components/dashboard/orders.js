import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
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
          break
        }
      }
    
    return newDate;
  };

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mes commandes</span>
      {orders.length === 0 ? (
        <span className="dashboard-notice">
          Vous n'avez effectué aucune commande
        </span>
      ) : (
        <section className="orders-section">
          <div className="orders-container">
            <div className="columns-names">
              <ul>
                <li className="id-col">Commande</li>
                <li className="details-col">Détails</li>
                <li className="status-col">Statut</li>
              </ul>
            </div>
            <div className="orders">
              {orders.map(order => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <div>{`#${order.customId}`}</div>
                    <div>
                      {`Expédié à: ${order.payer.name.given_name} ${order.payer.name.surname}`}
                      {parseDate(order.create_time)}
                      {`Total: ${order.purchase_units[0].amount.value}`}
                    </div>
                    <div>{order.order_status}</div>
                  </React.Fragment>
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
