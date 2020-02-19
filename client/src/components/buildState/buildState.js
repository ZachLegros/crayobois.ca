import React, { useState, useContext, useEffect } from "react";
import "./buildState.css";
import CvsContext from "../context/cvsContext";
import SubTotal from "../subTotal/subTotal";
import CvsNav from "../cvsNav/cvsNav";
const uuidv4 = require("uuid/v4");

function BuildState(props) {
  const context = useContext(CvsContext);
  //state to handle quantities of materials
  const [matsQty, setMatQty] = useState([]);
  const [hawsQty, setHawsQty] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteringName, setFilteringName] = context.filteringName;
  const [hawsFilteringName, setHawsFilteringName] = context.hawsFilteringName;
  const [filterName, setFilterName] = context.filterName;
  const [materials, setMaterials] = useState([...context.materials]);
  const [hardwares, setHardwares] = useState([...context.hardwares]);
  const activeCvsPage = context.activeCvsPage[0];
  const sortedHaws = context.sortedHaws[0];
  const [totalHaws, setTotalHaws] = useState(0);

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

  const countHaws = () => {
    let total = 0;
    const types = Object.entries(sortedHaws);
    for (let i = 0; i < types.length; i++) {
      total += types[i].length;
    }
    setTotalHaws(total);
  };

  useEffect(() => {
    setMatQty(sorted(materials, "mats"));
    setHawsQty(sorted(hardwares, "haws"));
    if (totalHaws === 0) {
      countHaws();
    }
  }, [materials, hardwares, totalHaws]);

  if (context.activeCvsPage[0] === "materials") {
    return (
      <div className="cvs-building-status">
        <span className="cvs-filter-name">{filterName}</span>
        <ul className="cvs-filter-list">
          <li>
            <a
              onClick={() => {
                context.filterMats([]);
                setFilteringName("Tous les matériaux");
                context.scrollTop();
                context.toggleLoading();
              }}
              className={
                filteringName === "Tous les matériaux"
                  ? "filter-active"
                  : "filter-off"
              }
            >
              Tous les matériaux ({total})
            </a>
          </li>
          {matsQty.map(material => {
            const id = uuidv4();
            return (
              <li key={id}>
                <span
                  key={id}
                  onClick={() => {
                    context.filterMats(material[0]);
                    setFilteringName(material[0]);
                    context.scrollTop();
                    context.toggleLoading();
                  }}
                  className={
                    filteringName === material[0]
                      ? "filter-active"
                      : "filter-off"
                  }
                >
                  {material[0] + ` (${material[1]})`}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="buildState-bottom">
          <div className="bottom-content">
            <SubTotal />
            <CvsNav />
          </div>
        </div>
      </div>
    );
  } else if (context.activeCvsPage[0] === "hardwares") {
    return (
      <div className="cvs-building-status">
        <span className="cvs-filter-name">{filterName}</span>
        <ul className="cvs-filter-list">
          <li>
            <span
              onClick={() => {
                context.filterHaws("*");
                setHawsFilteringName("Tous les matériels");
                context.scrollTop();
                context.toggleLoading();
              }}
              className={
                hawsFilteringName === "Tous les matériels"
                  ? "filter-active"
                  : "filter-off"
              }
            >
              Tous les matériels {`(${totalHaws})`}
            </span>
          </li>
          {hawsQty.map(hardware => {
            const id = uuidv4();
            return (
              <li key={id}>
                <span
                  key={id}
                  onClick={() => {
                    context.filterHaws(hardware[0]);
                    setHawsFilteringName(hardware[0]);
                    context.scrollTop();
                    context.toggleLoading();
                  }}
                  className={
                    hawsFilteringName === hardware[0]
                      ? "filter-active"
                      : "filter-off"
                  }
                >
                  {hardware[0] + ` (${hardware[1]})`}
                </span>
              </li>
            );
          })}
        </ul>
        {/*sub total component*/}
        <div className="buildState-bottom">
          <SubTotal />
          <CvsNav />
        </div>
      </div>
    );
  }
}

export default BuildState;
