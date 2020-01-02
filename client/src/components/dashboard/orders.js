import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

const Orders = props => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = authContext.user;
  const [orders, setOrders] = useState(Object.assign([], user.orders));

  return (
    <React.Fragment>
      <span className="dashboard-content-header">Mes commandes</span>
      {orders.length === 0 ? (
        <span className="dashboard-notice">
          Vous n'avez effectué aucune commande
        </span>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default Orders;
