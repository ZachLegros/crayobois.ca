import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./cart.css";
const uuidv4 = require("uuid/v4");

const Cart = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon panier</span>
      <div className="cart-container">
        {user.shoppingCart.length !== 0 ? (
          user.shoppingCart.map(pens => {
            return (
              <div className="cart-pen-container" key={uuidv4()}>
                <div
                  className="cart-pen-delete"
                  onClick={() => {
                    authContext.removeFromCart(pens.id);
                  }}
                >
                  <i className="fas fa-times-circle"></i>
                </div>
                {pens.pen.map(item => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      <div className="cart-pen-item">
                        <div className="cart-pen-img-and-name">
                          <img
                            src={item.obj.path}
                            className="cart-pen-img"
                            key={uuidv4()}
                          />

                          {item.obj.name ? (
                            <span className="cart-pen-item-name" key={uuidv4()}>
                              {item.obj.name}
                            </span>
                          ) : (
                            <span className="cart-pen-item-name" key={uuidv4()}>
                              {item.obj.type}{" "}
                              <span className="cart-pen-item-color">
                                {item.obj.color}
                              </span>
                            </span>
                          )}
                        </div>
                        <span className="cart-pen-item-price" key={uuidv4()}>
                          {formatter.format(item.obj.price)}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div className="cart-pen-container-bottom">
                  <div className="qty-input">
                    <span>Quantité: </span>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue="1"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Cart;
