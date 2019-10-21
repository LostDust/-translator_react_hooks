import React from "react";
import Translate from "./Translate.jsx";
import Menu from "./Menu.jsx";

function Main() {
  return (
    <section className="main" style={{ marginTop: "30px" }}>
      <Translate></Translate>
      <Menu></Menu>
    </section>
  );
}

export default Main;
