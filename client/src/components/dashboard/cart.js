import React, { useState, useContext, useEffect, useMemo } from "react";
import AuthContext from "../context/authContext";
import "./cart.css";
const uuidv4 = require("uuid/v4");

const Cart = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon panier</span>
      <div className="cart-container">
        {cart.length !== 0 ? (
          cart.map(pens => {
            return (
              <div className="cart-pen-container" key={uuidv4()}>
                <div className="cart-pen-container-top">
                  <form className="qty-input">
                    <label for="quantity">Quantité: </label>
                    <select name="quantity">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </form>
                  <div
                    className="cart-pen-delete"
                    onClick={async () => {
                      const newCart = await authContext.removeFromCart(pens.id);
                      setCart(newCart);
                    }}
                  >
                    <i className="fas fa-times-circle"></i>
                  </div>
                </div>
                {pens.pen.map(item => {
                  return (
                    <div className="cart-pen-item" key={uuidv4()}>
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
                  );
                })}
              </div>
            );
          })
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <span>sous-total</span>
      </div>
    </React.Fragment>
  );
};

export default Cart;
