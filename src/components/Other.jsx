import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import RouteView from "../router.jsx";

function Other(props) {
  return (
    <section>
      <p>I&#x27;m other~</p>
      <Router>
        <Link to="/other/child">child</Link>
        <span> || </span>
        <Link to="/other/null">null</Link>
        <RouteView {...props} />
      </Router>
    </section>
  );
}

export default Other;
