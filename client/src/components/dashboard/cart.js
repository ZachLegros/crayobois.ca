import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./cart.css";
const uuidv4 = require("uuid/v4");

const Cart = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [cart, setCart] = useState(Object.assign([], user.shoppingCart));
  const [subTotal, setSubTotal] = useState(0);

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  const getSubTotal = cart => {
    var value = 0;

    if (cart.length === 0) {
      value = 0;
    } else {
      for (var i = 0; i < cart.length; i++) {
        var priceOfObjects = 0;
        for (var e = 0; e < cart[i].pen.length; e++) {
          priceOfObjects += cart[i].pen[e].obj.price;
        }

        value += priceOfObjects * cart[i].quantity;
      }
    }

    return value;
  };

  const setQuantity = (id, index) => {
    const input = document.getElementById(id);

    if (input.value > 10) {
      input.value = 10;
    } else if (input.value < 1) {
      input.value = 1;
    }

    var newCart = Object.assign([], cart);
    newCart[index].quantity = input.value;
    authContext.updateCart(newCart);
    setSubTotal(getSubTotal(newCart));
  };

  useEffect(() => {
    setSubTotal(getSubTotal(cart));
  }, []);

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon panier</span>
      <div className="cart-container">
        {cart.length !== 0 ? (
          cart.map((pens, index) => {
            return (
              <div className="cart-pen-container" key={uuidv4()}>
                <div className="cart-pen-container-top">
                  <form className="qty-input">
                    <label htmlFor="quantity">Quantité: </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      max="10"
                      value={cart[index].quantity}
                      onChange={() => {
                        setQuantity("quantity" + index, index);
                      }}
                      id={"quantity" + index}
                    />
                  </form>
                  <div
                    className="cart-pen-delete"
                    onClick={async () => {
                      const newCart = await authContext.removeFromCart(pens.id);
                      setCart(newCart);
                      setSubTotal(getSubTotal(newCart));
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
      </div>
      <span className="cart-content-footer">
        Sous-total: {formatter.format(subTotal)}
      </span>
    </React.Fragment>
  );
};

export default Cart;
