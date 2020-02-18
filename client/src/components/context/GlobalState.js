import React, { useState } from "react";
import CvsContext from "./cvsContext";
import * as firebase from "firebase";

const GlobalState = props => {
  const [mats, setMats] = useState([]);
  const [haws, setHaws] = useState([]);
  const [activeHaws, setActiveHaws] = useState([]);
  const [DisplayedHaws, setDisplayedHaws] = useState({});
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
  const [loading, setLoading] = useState(true);
  const [cvsDropDownToggle, setCvsDropDownToggle] = useState(false);
  const [sortedHaws, setSortedHaws] = useState([]);
  const [prevToggleHaw, setPrevToggleHaw] = useState(0);
  const [cvsAlertOn, setCvsAlertOn] = useState(false);

  // firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBccRjBkjdgTdVxFQwKvrbpUCGCMeVryAA",
    authDomain: "crayobois-fe722.firebaseapp.com",
    databaseURL: "https://crayobois-fe722.firebaseio.com",
    projectId: "crayobois-fe722",
    appId: "1:410478848299:web:b2f130cd32dba774fcbd6e",
    measurementId: "G-XHQN6JX1WG"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 250);
  };

  //fetching materials
  function getMats() {
    if (auth.currentUser.uid) {
      db.collection("shop")
        .doc("materialsList")
        .get()
        .then(doc => {
          const data = doc.data();
          setMats([...data.materials]);
          setLoading(false);
        });
    }
  }

  //fetching hardwares
  function getHaws() {
    if (auth.currentUser.uid) {
      db.collection("shop")
        .doc("hardwaresList")
        .get()
        .then(doc => {
          const data = doc.data();
          setHaws([...data.hardwares]);
          sortHawsByType(data.hardwares);
          setLoading(false);
        });
    }
  }

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
    if (type === "*") {
      setFilteredHaws([]);
    } else {
      const active = sortedHaws[type];
      setFilteredHaws(active);
    }
  };

  const addToPen = (id, idx) => {
    //previous 'myPen'
    const newArr = myPen;

    if (idx === 0) {
      //getting material
      var obj = {};
      for (var i = 0; i < mats.length; i++) {
        if (mats[i]._id === id) {
          obj = mats[i];
        }
      }
      //removing item
      if (obj._id === newArr[idx].id) {
        var newComponentPrice = 0;
        newArr[idx].id = 0;
        newArr[idx].obj = null;
        //adding item
      } else {
        var newComponentPrice = obj.price;
        newArr[idx].id = obj._id;
        newArr[idx].obj = obj;
      }
      setMyPen(newArr);
      setMaterialPrice(newComponentPrice);
    } else {
      var hawId = id._id;
      var obj = id;
      //removing item
      if (hawId === newArr[idx].id) {
        var newComponentPrice = 0;
        newArr[idx].id = 0;
        newArr[idx].obj = null;
        //adding item
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
    setDisplayedHaws(arr[0][1]);
    setHawsFilteringName("Tous les matériels");
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

  function cvsNav(action, goTo) {
    if (!goTo) {
      const idx = cvsPages.indexOf(activeCvsPage);
      if (action === "back" && activeCvsPage !== "materials") {
        toggleLoading();
        scrollTop();
        setActiveCvsPage(cvsPages[idx - 1]);
        setCvsDropDownToggle(false);
      } else if (
        action === "next" &&
        idx !== cvsPages.length - 1 &&
        myPen[0].obj !== null
      ) {
        toggleLoading();
        scrollTop();
        setActiveCvsPage(cvsPages[idx + 1]);
        setCvsDropDownToggle(false);
      } else if (idx === cvsPages.length - 1 && myPen[1].obj !== null) {
        setCvsAlertOn(true);
        setCvsDropDownToggle(false);
      }
    } else {
      const idx = cvsPages.indexOf(goTo);
      setActiveCvsPage(cvsPages[idx]);
      toggleLoading();
      scrollTop();
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
        filterMats: filterMats,
        filteredMats: [filteredMats, setFilteredMats],
        filterHaws: filterHaws,
        filteredHaws: [filteredHaws, setFilteredHaws],
        activeHaws: [activeHaws, setActiveHaws],
        getMats: getMats,
        getHaws: getHaws,
        myPen: [myPen, setMyPen],
        addToPen: addToPen,
        materialPrice: [materialPrice, setMaterialPrice],
        hardwarePrice: [hardwarePrice, setHardwarePrice],
        prevToggleId: [prevToggleId, setPrevToggleId],
        cvsPages: cvsPages,
        activeCvsPage: [activeCvsPage, setActiveCvsPage],
        filteringName: [filteringName, setFilteringName],
        filterName: [filterName, setFilterName],
        toggleLoading: toggleLoading,
        loading: [loading, setLoading],
        cvsDropDownToggle: [cvsDropDownToggle, setCvsDropDownToggle],
        sortedHaws: [sortedHaws, setSortedHaws],
        DisplayedHaws: [DisplayedHaws, setDisplayedHaws],
        cvsNav: cvsNav,
        hawsFilteringName: [hawsFilteringName, setHawsFilteringName],
        scrollTop: scrollTop,
        prevToggleHaw: [prevToggleHaw, setPrevToggleHaw],
        cvsAlertOn: [cvsAlertOn, setCvsAlertOn]
      }}
    >
      {props.children}
    </CvsContext.Provider>
  );
};

export default GlobalState;
