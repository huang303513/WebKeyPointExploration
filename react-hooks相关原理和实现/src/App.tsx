import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Father from './TestSetStateFather.js';

function App() {
  const [num, setNum] = useState<number>(0);

  return (
    <div>
      <Father></Father>
      <div>num:{num}</div>
      <button onClick={() => setNum(num + 1)}>加 1</button>
    </div>
  );
}

export default App;
