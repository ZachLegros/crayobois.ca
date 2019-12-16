import React, { useState } from "react";
import CvsContext from "./cvsContext";

const GlobalState = props => {
  const [mats, setMats] = useState([]);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [filteredMats, setFilteredMats] = useState([]);
  const [myPen, setMyPen] = useState({
    bois: { obj: null, price: 0 },
    hardware: { obj: null, price: 0 },
    shape: { obj: null, price: 0 }
  });
  //const [loading, setLoading] = useState(true);

  /*  const toggleLoading = () => {
    setLoading(!loading);
  }; */

  //fetching materials
  async function getMats() {
    const url = "/mats";
    const response = await fetch(url);
    const data = await response.json();
    setMats(data, console.log(data));
  }

  const addToCart = pen => {};

  const removeFromCart = id => {};

  const filterMats = type => {
    const toFilter = mats;
    if (type === []) {
      setFilteredMats([]);
    } else {
      const filtered = toFilter.filter(function(item) {
        return item.type === type;
      });
      setFilteredMats(filtered);
    }
  };

  const changeSubTotal = () => {
    console.log(myPen);
    setSubTotal(() => {
        //map over array
        
        const arr = Object.keys(myPen);

    });
  };

  const addToPen = (id, type) => {
    setMyPen(obj => {
      const newElem = mats.find(element => (element._id = id));
      obj[type].obj = newElem;
      obj[type].price = newElem.price;
    }, changeSubTotal());
  };

  return (
    <CvsContext.Provider
      value={{
        materials: mats,
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        filterMats: filterMats,
        filteredMats: filteredMats,
        subTotal: subTotal,
        getMats: getMats,
        myPen: myPen,
        addToPen: addToPen
      }}
    >
      {props.children}
    </CvsContext.Provider>
  );
};

export default GlobalState;
