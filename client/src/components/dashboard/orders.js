import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import "./orders.css";
const uuidv4 = require("uuid/v4");

const Orders = props => {
  const authContext = useContext(AuthContext);
  const [orders, setOrders] = authContext.orders;
  const [moreDetails, setMoreDetails] = useState("");

  const formatter = new Intl.NumberFormat("fr-CA", {
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

  const toggleHandler = (uid) => {
    if (moreDetails === uid) {
      setMoreDetails("");
    } else {
      setMoreDetails(uid);
    }
  }

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
              {orders.map((order, index) => {
                const itemsList = order.purchase_units[0].items;
                const subTotal =
                  order.purchase_units[0].amount.breakdown.item_total.value;
                const taxes =
                  order.purchase_units[0].amount.breakdown.tax_total.value;
                const shipping =
                  order.purchase_units[0].amount.breakdown.shipping.value;
                const total = order.purchase_units[0].amount.value;
                let items = [];
                const itemIndex = `more-details-item${index}`;

                for (var i = 0; i < itemsList.length; i++) {
                  items.push(itemsList[i]);
                }

                return (
                  <div className="order" key={uuidv4()}>
                    <div className="order-cols">
                      <div className="order-info info-col">
                        <span>{`#${order.customId}`}</span>
                      </div>
                      <div className="order-details details-col">
                        <span>{parseDate(order.create_time)}</span>
                        <span>
                          {`Expédié à: ${order.payer.name.given_name} ${order.payer.name.surname}`}
                        </span>
                        <span>
                          {`Total: ${formatter.format(order.purchase_units[0].amount.value)}`}
                        </span>
                      </div>
                      <div className="order-status status-col">
                        <span className="order-status">{order.order_status}</span>
                      </div>
                    </div>
                    <div className="order-more-details-container">
                      <span
                        onClick={() => {
                          toggleHandler(itemIndex);
                        }}
                        className="order-more-details-btn"
                      >
                        {moreDetails === itemIndex
                          ? "Moins de détails"
                          : "Plus de détails"}
                        {moreDetails === itemIndex ? (
                          <i className="fas fa-minus order-details-icon"></i>
                        ) : (
                          <i className="fas fa-plus order-details-icon"></i>
                        )}
                      </span>
                      <div
                        id={itemIndex}
                        className={
                          moreDetails === itemIndex
                            ? "order-more-details more-details-toggled"
                            : "order-more-details"
                        }
                      >
                        <div className="order-items-container more-details-container">
                          {items.map(item => {
                            return (
                              <div
                                key={uuidv4()}
                                className="order-item item-more-details"
                              >
                                <div className="item-name">
                                  <span className="order-item-text more-details-item-txt">
                                    {`${item.name} `}
                                    <span className="order-item-text item-quantity more-details-item-txt">
                                      {" "}
                                      {` x${item.quantity}`}
                                    </span>
                                  </span>
                                </div>
                                <span className="order-item-text right-aligned bold more-details-item-txt">
                                  {formatter.format(item.unit_amount.value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="order-total more-details-breakdown">
                          <span className="order-total-text more-details-item-txt">
                            Sous-total: {formatter.format(subTotal)}
                          </span>
                          <span className="order-total-text more-details-item-txt">
                            Taxes (TPS et TVQ): {formatter.format(taxes)}
                          </span>
                          <span className="order-total-text more-details-item-txt">
                            Livraison: {formatter.format(shipping)}
                          </span>
                          <span className="order-total-text bold more-details-item-txt">
                            Total: {formatter.format(total)}
                          </span>
                        </div>
                      </div>
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
