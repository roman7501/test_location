import React from "react";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import Port from "./Components/Port";

function App({ className }) {
  return (
    <div className="App">
      <GlobalStyle />
      <Port />
    </div>
  );
}

export default App;
