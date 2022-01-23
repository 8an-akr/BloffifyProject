import Login from "./Components/Login/Login";
import Bloffify from "./Components/Bloffify/Bloffify";
import React, { useEffect, useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [storage, setStorage] = useState(localStorage.getItem("bluffifyUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (storage) {
      navigate("/bloffify");
    } else {
      navigate("/");
    }
  }, [storage, navigate]);
  return (
    <Routes>
      <Route exact path="/" element={<Login setStorage={setStorage} />} />
      <Route
        exact
        path="/bloffify"
        element={<Bloffify storage={storage} setStorage={setStorage} />}
      />
    </Routes>
  );
}

export default App;
