import React from "react";
import GameBoard from "./components/GameBoard";

import "./App.css";

 const App = () => {
   
  return (
    <GameBoard rows={5} cols={5} />
  );

}

export default App;