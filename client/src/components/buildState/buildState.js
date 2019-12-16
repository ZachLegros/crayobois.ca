import React, { useState, useContext, useEffect } from "react";
import "./buildState.css";
import { CvsContext } from "../context/cvsContext";
const uuidv4 = require("uuid/v4");

function BuildState(props) {
  const [cvs, setCvs] = useContext(CvsContext);
  const [loading, setLoading] = useState(true);
  const [matsQty, setMatQty] = useState([]);

  const formatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });

  useEffect(() => {
    //function that gets all the wood type and their quantities

    function sorted(callback) {
      var types = {};
      const materials = props.mats;

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
      callback();
      return types;
    }

    function addMatsToState() {
      setLoading(false);
    }

    setMatQty(sorted(addMatsToState));
  }, []);

  return (
    <React.Fragment>
      <div className="cvs-building-status">
        <span>{cvs.buildStateTop}</span>
        {loading || !props.mats ? (
          <div />
        ) : (
          <ul className="cvs-material-list">
            {matsQty.map(material => {
              const id = uuidv4();
              return (
                <li key={id}>
                  <a
                    key={id}
                    onClick={() => {
                      props.setLoading();
                      setCvs(obj => {
                        obj.type = material[0];
                      });
                    }}
                  >
                    {material[0] + ` (${material[1]})`}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
        <span className="sub-total">{formatter.format(cvs.subTotal)}</span>
      </div>
    </React.Fragment>
  );
}

export default BuildState;
