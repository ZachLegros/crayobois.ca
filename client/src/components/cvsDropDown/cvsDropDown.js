import React, { useState, useContext, useEffect } from "react";
import CvsContext from "../context/cvsContext";
import "./cvsDropDown.css";
const uuidv4 = require("uuid/v4");

function CvsDropDown(props) {
  const context = useContext(CvsContext);
  const [matsQty, setMatQty] = useState([]);
  const [hawsQty, setHawsQty] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteringName, setFilteringName] = context.filteringName;
  const [hawsFilteringName, setHawsFilteringName] = context.hawsFilteringName;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;

  function scrollTop() {
    document.getElementById("cvs-scrollable-section").scrollTop = 0;
  }

  function toggleDropDown() {
    const width = document.documentElement.clientWidth;
    if (width <= 825) {
      setCvsDropDownToggle(!cvsDropDownToggle);
    }
  }

  useEffect(() => {
    //function that gets all the wood type and their quantities
    function sorted(collection, collectionName) {
      var types = {};

      function getTypes() {
        var set = new Set();
        for (var i = 0; i < collection.length; i++) {
          set.add(collection[i].type);
        }
        const arr = [...set];
        var obj = {};
        for (var e = 0; e < arr.length; e++) {
          obj[arr[e]] = 0;
        }
        return obj;
      }

      if (collectionName === "mats") {
        types = getTypes();

        for (var j = 0; j < collection.length; j++) {
          const type = collection[j].type;
          types[type]++;
        }

        //types: Array[type: qty of type]
        types = Object.entries(types);

        //gets the total amount of materials
        var count = 0;
        for (var f = 0; f < types.length; f++) {
          count += types[f][1];
        }

        setTotal(count);
        return types;
      } else if (collectionName === "haws") {
        types = getTypes();

        for (var j = 0; j < collection.length; j++) {
          const type = collection[j].type;
          types[type]++;
        }

        types = Object.entries(types);
        return types;
      }
    }

    setMatQty(sorted(context.materials, "mats"));
    setHawsQty(sorted(context.hardwares, "haws"));
  }, []);

  if (context.activeCvsPage[0] === "materials") {
    return (
      <div
        id="cvs-dropdown"
        className={
          cvsDropDownToggle === true
            ? "cvs-dropdown cvs-dropdown-active"
            : "cvs-dropdown"
        }
      >
        <ul className="cvs-dropdown-filter-list">
          <li className="filter-list-li">
            <a
              onClick={() => {
                context.filterMats([]);
                setFilteringName("Tous les matériaux");
                scrollTop();
                context.toggleLoading();
                toggleDropDown();
              }}
              className={
                filteringName === "Tous les matériaux"
                  ? "filter-dropdown-active"
                  : "filter-dropdown-off"
              }
            >
              Tous les matériaux ({total})
            </a>
          </li>
          {matsQty.map(material => {
            const id = uuidv4();
            return (
              <li className="filter-list-li" key={id}>
                <a
                  key={id}
                  onClick={() => {
                    context.filterMats(material[0]);
                    setFilteringName(material[0]);
                    scrollTop();
                    context.toggleLoading();
                    toggleDropDown();
                  }}
                  className={
                    filteringName === material[0]
                      ? "filter-dropdown-active"
                      : "filter-dropdown-off"
                  }
                >
                  {material[0] + ` (${material[1]})`}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (context.activeCvsPage[0] === "hardwares") {
    return (
      <div
        id="cvs-dropdown"
        className={
          cvsDropDownToggle === true
            ? "cvs-dropdown haws-dropdown cvs-dropdown-active"
            : "cvs-dropdown haws-dropdown"
        }
      >
        <ul className="cvs-dropdown-filter-list haws-filter-list">
          <li className="filter-list-li haws-filter-list-li">
            <a
              onClick={() => {
                context.filterHaws("*");
                setHawsFilteringName("Tous les matériels");
                scrollTop();
                context.toggleLoading();
                toggleDropDown();
              }}
              className={
                hawsFilteringName === "Tous les matériels"
                  ? "filter-dropdown-active"
                  : "filter-dropdown-off"
              }
            >
              {"Tous les matériels"}
            </a>
          </li>
          {hawsQty.map(hardware => {
            const id = uuidv4();
            return (
              <li className="filter-list-li haws-filter-list-li" key={id}>
                <a
                  key={id}
                  onClick={() => {
                    context.filterHaws(hardware[0]);
                    setHawsFilteringName(hardware[0]);
                    scrollTop();
                    context.toggleLoading();
                    toggleDropDown();
                  }}
                  className={
                    hawsFilteringName === hardware[0]
                      ? "filter-dropdown-active"
                      : "filter-dropdown-off"
                  }
                >
                  {hardware[0] + ` (${hardware[1]})`}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CvsDropDown;
