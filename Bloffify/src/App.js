import Login from "./Components/Login/Login";
import Bloffify from "./Components/Bloffify/Bloffify";
import React, { useEffect, useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import "./App.css";
import { createStore } from "redux";
import allReducers from "./store/reducers/index";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

function App() {
  const store = createStore(allReducers, composeWithDevTools());
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
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<Login setStorage={setStorage} />} />
        <Route
          exact
          path="/bloffify"
          element={<Bloffify setStorage={setStorage} />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
