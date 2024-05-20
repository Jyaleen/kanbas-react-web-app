import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Labs from './Labs';
import Kanbas from './Kanbas';
import HelloWorld from "./Labs/a3/HelloWorld";
import { HashRouter, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/hello" element={<HelloWorld />} />
        </Routes>
      </>
    </HashRouter>);
}

export default App;
