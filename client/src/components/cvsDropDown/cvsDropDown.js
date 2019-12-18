import React, {useState, useContext, useEffect} from "react";
import CvsContext from "../context/cvsContext";
import "./cvsDropDown.css";
const uuidv4 = require("uuid/v4");

function CvsDropDown(props) {
  const context = useContext(CvsContext);
  //state to handle quantities of materials
  const [matsQty, setMatQty] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteringName, setFilteringName] = context.filteringName;
  const [cvsDropDownToggle, setCvsDropDownToggle] = context.cvsDropDownToggle;
  
  function scrollTop() {
    document.getElementById("cvs-scrollable-section").scrollTop = 0;
  }

  function toggleDropDown() {
    const width  = document.documentElement.clientWidth;
    console.log(width);
    if (width <= 825) {
      setCvsDropDownToggle(!cvsDropDownToggle);
    }
  }

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
    <div id="cvs-dropdown" className={
        cvsDropDownToggle === true ? "cvs-dropdown-active" : "cvs-dropdown"
    }>
      <ul className="cvs-dropdown-filter-list">
        <li>
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
            <li key={id}>
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
                  filteringName == material[0]
                    ? "filter-dropdown-active"
                    : "filter-dropdown-off"
                }
              >
                {material[0] + ` (${material[1]})`}
              </a>
            </li>
          );
        })}
        {/*when on page 'hardware*/}
      </ul>
    </div>
  );
}

export default CvsDropDown;
