import React from "react";
import GameBoard from "./components/GameBoard";

import "./App.css";

 const App = () => {
   
  return (
    <GameBoard rows={25} cols={25} />
  );

}

export default App;