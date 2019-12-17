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
  const [total, setTotal] = useState(0);
  const [filteringName, setFilteringName] = context.filteringName;
  const [filterName, setFilterName] = context.filterName;

  useEffect(() => {
    //function that gets all the wood type and their quantities
    function sorted() {
      var types = {};
      const materials = context.materials;

      function getTypes() {
        var set = new Set();
        for (var i = 0; i < materials.length; i++) {
          set.add(materials[i].type);
        }
        const arr = [...set];
        var obj = {};
        for (var e = 0; e < arr.length; e++) {
          obj[arr[e]] = 0;
        }
        return obj;
      }

      types = getTypes();

      for (var j = 0; j < materials.length; j++) {
        const type = materials[j].type;
        types[type]++;
      }

      types = Object.entries(types);

      //gets the total amount of materials
      var count = 0;
      for (var f = 0; f < types.length; f++) {
        count += types[f][1];
      }

      setTotal(count);
      return types;
    }

    setMatQty(sorted());
  }, [context.materials]);

  return (
    <div className="cvs-building-status">
      <span className="cvs-filter-name">{filterName}</span>
      <ul className="cvs-filter-list">
        <li>
          <a
            onClick={() => {
              context.filterMats([]);
              setFilteringName("Tous les matériaux");
            }}
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
                  //context.toggleLoading();
                  context.filterMats(material[0]);
                  setFilteringName(material[0]);
                }}
              >
                {material[0] + ` (${material[1]})`}
              </a>
            </li>
          );
        })}
        {/*when on page 'hardware*/}
      </ul>
      {/*sub total component*/}
      <div className="buildState-bottom">
        <SubTotal />
        <CvsNav />
      </div>
    </div>
  );
}

export default BuildState;
