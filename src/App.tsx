import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container-fluid">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel"></div>
        <div className="col-9 rigth-panel"></div>
      </div>
    </div>
  );
}

export default App;