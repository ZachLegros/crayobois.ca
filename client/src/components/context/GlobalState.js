import React, { useState } from "react";
import CvsContext from "./cvsContext";

const GlobalState = props => {
  const [mats, setMats] = useState([]);
  const [haws, setHaws] = useState([]);
  const [activeHaws, setActiveHaws] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredMats, setFilteredMats] = useState([]);
  const [filteredHaws, setFilteredHaws] = useState([]);
  const [materialPrice, setMaterialPrice] = useState(0);
  const [hardwarePrice, setHardwarePrice] = useState(0);
  const [myPen, setMyPen] = useState([
    { obj: null, id: 0 },
    { obj: null, id: 1 }
  ]);
  const [prevToggleId, setPrevToggleId] = useState(0);
  const [cvsPage, setCvsPage] = useState("hardwares");
  const [filteringName, setFilteringName] = useState("Tous les matériaux");
  const [filterName, setFilterName] = useState("Filtrer par type");
  const [loading, setLoading] = useState(false);
  const [cvsDropDownToggle, setCvsDropDownToggle] = useState(false);
  const [sortedHaws, setSortedHaws] = useState([])

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 250);
  };

  //fetching materials
  async function getMats() {
    const url = "/mats";
    const response = await fetch(url);
    const data = await response.json();
    setMats(data, console.log(data));
  }

  //fetching hardwares
  async function getHaws() {
    const url = "/haws";
    const response = await fetch(url);
    const data = await response.json();
    setHaws(data, console.log(data));
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

  const filterHaws = type => {
    const toFilter = haws;
    const filtered = toFilter.filter(function(item) {
      return item.type === type;
    });
    setFilteredHaws(filtered);
  };

  const addToPen = (id, idx) => {
    var obj = {};
    for (var i = 0; i < mats.length; i++) {
      if (mats[i]._id === id) {
        obj = mats[i];
      }
    }
    const newArr = myPen;

    //logic which handles the sub total
    if (idx === 0) {
      //
      if (obj._id === newArr[idx].id) {
        var newComponentPrice = 0;
        newArr[idx].id = 0;
        newArr[idx].obj = null;
        console.log(newArr);
      } else {
        var newComponentPrice = obj.price;
        newArr[idx].id = obj._id;
        newArr[idx].obj = obj;
      }
      setMyPen(newArr);
      setMaterialPrice(newComponentPrice);
    } else {
      if (obj._id === newArr[idx].id) {
        var newComponentPrice = 0;
        newArr[idx].id = 0;
        newArr[idx].obj = null;
      } else {
        var newComponentPrice = obj.price;
        newArr[idx].id = obj._id;
        newArr[idx].obj = obj;
      }
      setMyPen(newArr);
      setHardwarePrice(newComponentPrice);
    }
  };

  function sortHawsByType(haws) {
    //obj: {type: [obj of that type]}
    const types = getTypes(haws);

    for (var e = 0; e < haws.length; e++) {
      types[haws[e].type].append(haws[e]);
    }

    setSortedHaws(types);
  }

  function getTypes(collection) {
    var set = new Set();
    for (var i = 0; i < collection.length; i++) {
      set.add(collection[i].type);
    }
    const arr = [...set];
    var obj = {};
    for (var e = 0; e < arr.length; e++) {
      obj[arr[e]] = [];
    }
    return obj;
  }

  return (
    <CvsContext.Provider
      value={{
        materials: mats,
        hardwares: haws,
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        filterMats: filterMats,
        filteredMats: filteredMats,
        filterHaws: filterHaws,
        filteredHaws: filteredHaws,
        activeHaws: [activeHaws, setActiveHaws],
        getMats: getMats,
        getHaws: getHaws,
        myPen: [myPen, setMyPen],
        addToPen: addToPen,
        materialPrice: materialPrice,
        hardwarePrice: hardwarePrice,
        prevToggleId: [prevToggleId, setPrevToggleId],
        cvsPage: [cvsPage, setCvsPage],
        filteringName: [filteringName, setFilteringName],
        filterName: [filterName, setFilterName],
        toggleLoading: toggleLoading,
        loading: loading,
        cvsDropDownToggle: [cvsDropDownToggle, setCvsDropDownToggle],
        sortedHaws: [sortedHaws, setSortedHaws],
        sortHawsByType: sortHawsByType
      }}
    >
      {props.children}
    </CvsContext.Provider>
  );
};

export default GlobalState;
