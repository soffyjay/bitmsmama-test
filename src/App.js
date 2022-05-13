import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./SigninPage";
import NewAcct from "./NewAcct";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/:username" element={<NewAcct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
