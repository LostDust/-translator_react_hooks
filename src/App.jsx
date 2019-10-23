import React from "react";
import { HashRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import RouteView from "./router.jsx";

import Provider from "./Provider.jsx";
import Navbar from "./components/Navbar.jsx";
import Alert from "./components/Alert.jsx";

function App() {
  return (
    <Provider>
      <Router>
        <Navbar></Navbar>
        <RouteView></RouteView>
        <Alert></Alert>
      </Router>
    </Provider>
  );
}

export default App;
