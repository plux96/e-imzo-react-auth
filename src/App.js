import "./App.css";
import Button from "./lib/components/Button";
import Badge from "./lib/components/Badge";
import EIMZO from "./lib/components/e-imzo/Eimzo";
import Modal from "./lib/components/Modal";
import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <div className="App">{<Modal />}</div>
    </>
  );
}

export default App;
