import React, { useReducer, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import RouteView from "./router.jsx";
import { reduxContext, reducer } from "./store.js";

import Navbar from "./components/Navbar.jsx";
import Alert from "./components/Alert.jsx";

function App() {
  const local = Object.keys(localStorage).map(item => {
    return { from: item, to: localStorage.getItem(item) };
  });
  const initStore = {
    list: { local },
    input: "hello",
    output: "",
    store: "local",
    has: false,
    alertList: []
  };
  const store = {};
  Object.keys(initStore).forEach(item => {
    const [value, dispatch] = useReducer(reducer, initStore[item]);
    store[item] = { value, dispatch };
  });

  useEffect(() => {
    fetch(`http://203.195.141.131:3100/database/`)
      .then(res => res.json())
      .then(msg => {
        const newList = Object.assign({}, store.list.value);
        newList.public = msg;
        const action = {
          type: "UPDATE",
          value: newList
        };
        store.list.dispatch(action);
      });
  }, []);

  return (
    <reduxContext.Provider value={store}>
      <Router>
        <Navbar></Navbar>
        <RouteView></RouteView>
      </Router>
      <Alert></Alert>
    </reduxContext.Provider>
  );
}

export default App;
