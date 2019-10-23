import React, { useReducer, useEffect } from "react";
import { reduxContext, reducer, initStore } from "./store.js";

function Provider({ children }) {
  const store = {};
  const storeDispatch = {};
  Object.keys(initStore).forEach(item => {
    const [value, dispatch] = useReducer(reducer, initStore[item]);
    store[item] = value;
    storeDispatch[item] = dispatch;
  });
  store.dispatch = storeDispatch;

  useEffect(() => {
    fetch(`http://203.195.141.131:3100/database/`)
      .then(res => res.json())
      .then(msg => {
        const newList = Object.assign({}, store.list);
        newList.public = msg;
        const action = {
          type: "UPDATE",
          value: newList
        };
        store.dispatch.list(action);
      });
  }, []);

  return (
    <reduxContext.Provider value={store}>{children}</reduxContext.Provider>
  );
}

export default Provider;
