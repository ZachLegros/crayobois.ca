import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import "./cart.css";
const uuidv4 = require("uuid/v4");

const Cart = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const cart = user.shoppingCart;



  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mon panier</span>
      <button onClick={() => console.log(cart)}></button>
      <div className="cart-container">
          {() => {return <span>hello</span>}}
        {() => {
          for (var i = 0; i < cart.length; i++) {
            return (
              <div className="cart-pen-container" key={uuidv4()}>
                <React.Fragment>
                  {() => {
                    for (var e = 0; e < cart[i]["pen"].length; e++) {
                      const item = cart[i]["pen"][e];
                      return (
                        <React.Fragment>
                          <span>{item.name}</span>
                          <span>{item.price}</span>
                        </React.Fragment>
                      );
                    }
                  }}
                </React.Fragment>
              </div>
            );
          }
        }}

        {/*{user.shoppingCart.map(pens => {
          return (
            <div className="cart-pen-container" key={uuidv4()}>
              <React.Fragment>
                <span>{pens.pen[0].obj.name}</span>
                <span>{pens.pen[0].obj.price}</span>
              </React.Fragment>
            </div>
          );
        })}*/}
      </div>
    </React.Fragment>
  );
};

export default Cart;
