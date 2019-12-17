import React, { useState } from "react";
import CvsContext from "./cvsContext";

const GlobalState = props => {
  const [mats, setMats] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredMats, setFilteredMats] = useState([]);
  const [materialPrice, setMaterialPrice] = useState(0);
  const [hardwarePrice, setHardwarePrice] = useState(0);
  const [myPen, setMyPen] = useState([
    { obj: null, id: 0 },
    { obj: null, id: 1 }
  ]);
  const [prevToggleId, setPrevToggleId] = useState(0);

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

  const addToPen = (id, idx) => {
    var obj = {};
    for (var i = 0; i < mats.length; i++) {
      if (mats[i]._id === id) {
        obj = mats[i];
      }
    }

    /*  console.log("obj id: " + id);
    console.log("index: " + idx);
    console.log(obj);
    console.log(obj.price); */

    const newArr = myPen;
    // console.log(newArr);

    //logic which handles the sub total
    if (idx === 0) {
      if (obj._id === newArr[idx].id) {
        var newComponentPrice = 0;
        newArr[idx].id = 0;
      } else {
        var newComponentPrice = obj.price;
        newArr[idx].id = obj._id;
      }
      newArr[idx].obj = obj;
      setMyPen(newArr);
      setMaterialPrice(newComponentPrice);
    } else {
      if (obj._id === newArr[idx].id) {
        var newComponentPrice = 0;
        newArr[idx].id = 0;
      } else {
        var newComponentPrice = obj.price;
        newArr[idx].id = obj._id;
      }
      newArr[idx].obj = obj;
      setMyPen(newArr);
      setHardwarePrice(newComponentPrice);
    }
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
        getMats: getMats,
        myPen: myPen,
        addToPen: addToPen,
        materialPrice: materialPrice,
        hardwarePrice: hardwarePrice,
        prevToggleId: prevToggleId,
        setPrevToggleId: setPrevToggleId
      }}
    >
      {props.children}
    </CvsContext.Provider>
  );
};

export default GlobalState;
