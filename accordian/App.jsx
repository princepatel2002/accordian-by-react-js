import React, { useState } from "react";
import data from "./data";
import "./style.css";

const App = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultipleSelection, setenableMultipleSelection] = useState(false);
  const [multiple, setmultiple] = useState([]);
  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };
  const handleMultipleSelection = (getCurrentId) => {
    let cpymultiple = [...multiple];
    const findIndexOfCurrentId = cpymultiple.indexOf(getCurrentId);
    if (findIndexOfCurrentId === -1) {
      cpymultiple.push(getCurrentId);
    } else cpymultiple.splice(findIndexOfCurrentId, 1);
    setmultiple(cpymultiple);
    console.log(selected, multiple);
  };
  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setenableMultipleSelection(!enableMultipleSelection);
        }}
      >
        Click for multiple selection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultipleSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
                <div>
                  {enableMultipleSelection
                    ? multiple.indexOf(dataItem.id) !== -1 && (
                        <div className="content">{dataItem.answer}</div>
                      )
                    : selected === dataItem.id && (
                        <div className="content">{dataItem.answer}</div>
                      )}
                  {/* {selected === dataItem.id ||
                  multiple.indexOf(dataItem.id) !== -1 ? (
                    <div className="content">{dataItem.answer}</div>
                  ) : null} */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>data not found</div>
        )}
      </div>
    </div>
  );
};

export default App;
