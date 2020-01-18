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
                <a
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
                </a>
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
  } else if (context.activeCvsPage[0] === "hardwares") {
    return (
      <div className="cvs-building-status">
        <span className="cvs-filter-name">{filterName}</span>
        <ul className="cvs-filter-list">
          {hawsQty.map(hardware => {
            const id = uuidv4();
            return (
              <li key={id}>
                <a
                  key={id}
                  onClick={() => {
                    context.filterHaws(hardware[0]);
                    
                    setHawsFilteringName(hardware[0]);
                    context.scrollTop();
                    context.toggleLoading();
                  }}
                  className={
                    hawsFilteringName === hardware[0] ? "filter-active" : "filter-off"
                  }
                >
                  {hardware[0] + ` (${hardware[1]})`}
                </a>
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
