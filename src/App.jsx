import React, { useReducer } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import RouteView from "./router.jsx";
import { reduxContext, reducer } from "./store.js";

function App() {
  const initStore = { info: "heihei" };
  const store = {};
  Object.keys(initStore).forEach(item => {
    const [value, dispatch] = useReducer(reducer, initStore[item]);
    store[item] = { value, dispatch };
  });

  return (
    <reduxContext.Provider value={store}>
      <Router>
        <Link to="/home">home</Link>
        <span> || </span>
        <Link to="/other">other</Link>
        <RouteView></RouteView>
        {/* <RouteView {...this.props} /> 子路由 */}
      </Router>
    </reduxContext.Provider>
  );
}

export default App;
