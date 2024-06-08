import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import KeepAlive from "./components/KeepAlive";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <KeepAlive></KeepAlive>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/Register"} element={<Register />}></Route>
          <Route path={"/Login"} element={<Login />}></Route>
          <Route path={"/Main/:username"} element={<Main />}></Route>
          <Route path={"/Main"} element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;