import React, { useState } from "react";
import CvsContext from "./cvsContext";

const GlobalState = props => {
  const [mats, setMats] = useState([]);
  const [haws, setHaws] = useState([]);
  const [activeHaws, setActiveHaws] = useState([]);
  const [displayedHaw, setDisplayedHaw] = useState({});
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
  const [cvsPages, setCvsPages] = useState(["materials", "hardwares"]);
  const [activeCvsPage, setActiveCvsPage] = useState("materials");
  const [filteringName, setFilteringName] = useState("Tous les matériaux");
  const [hawsFilteringName, setHawsFilteringName] = useState("");
  const [filterName, setFilterName] = useState("Filtrer par type");
  const [loading, setLoading] = useState(false);
  const [cvsDropDownToggle, setCvsDropDownToggle] = useState(false);
  const [sortedHaws, setSortedHaws] = useState([]);

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
    sortHawsByType(data);
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
    const active = sortedHaws[type];
    const displayed = active[0];
    console.log(active)
    console.log(displayed)
    setActiveHaws(active);
    setDisplayedHaw(displayed);
  };

  const newDisplayedHaw = action => {
    const maxIdx = activeHaws.length - 1;
    console.log(maxIdx);
    console.log(activeHaws);
    console.log(displayedHaw);
    const currentIdx = activeHaws.indexOf(displayedHaw);

    if (action === "next") {
      if (currentIdx === maxIdx) {
        setDisplayedHaw(activeHaws[0]);
      } else if (currentIdx < maxIdx) {
        const newIdx = currentIdx + 1;
        setDisplayedHaw(activeHaws[newIdx]);
      }
    } else if (action === "prev") {
      if (currentIdx === 0) {
        setDisplayedHaw(activeHaws[maxIdx]);
      } else if (currentIdx > 0) {
        const newIdx = currentIdx - 1;
        setDisplayedHaw(activeHaws[newIdx]);
      }
    }
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
      types[haws[e].type].push(haws[e]);
    }
    setSortedHaws(types);
    const arr = Object.entries(types);
    //default values for haws collection and displayed haw
    setActiveHaws(arr[0][1]);
    setDisplayedHaw(arr[0][1][0]);
    setHawsFilteringName(arr[0][0]);
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

  function cvsNav(action) {
    const idx = cvsPages.indexOf(activeCvsPage);
    if (action === "back" && activeCvsPage !== "materials") {
      toggleLoading();
      scrollTop();
      setActiveCvsPage(cvsPages[idx - 1]);
    } else if (
      action === "next" &&
      idx !== cvsPages.length - 1 &&
      myPen[0].obj !== null
    ) {
      toggleLoading();
      scrollTop();
      setActiveCvsPage(cvsPages[idx + 1]);
    } else if (idx === cvsPages.length - 1) {
      toggleLoading();
      scrollTop();
      setActiveCvsPage(cvsPages[0]);
    }
  }

  function scrollTop() {
    document.getElementById("cvs-scrollable-section").scrollTop = 0;
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
        cvsPages: cvsPages,
        activeCvsPage: [activeCvsPage, setActiveCvsPage],
        filteringName: [filteringName, setFilteringName],
        filterName: [filterName, setFilterName],
        toggleLoading: toggleLoading,
        loading: loading,
        cvsDropDownToggle: [cvsDropDownToggle, setCvsDropDownToggle],
        sortedHaws: [sortedHaws, setSortedHaws],
        displayedHaw: [displayedHaw, setDisplayedHaw],
        cvsNav: cvsNav,
        hawsFilteringName: [hawsFilteringName, setHawsFilteringName],
        scrollTop: scrollTop,
        newDisplayedHaw: newDisplayedHaw
      }}
    >
      {props.children}
    </CvsContext.Provider>
  );
};

export default GlobalState;
