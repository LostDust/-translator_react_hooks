import React, { useContext } from "react";
import { reduxContext } from "../store.js";

function Home() {
  const { info } = useContext(reduxContext);
  function changeValue(e) {
    const action = {
      type: "UPDATE",
      value: "info",
      info: e.target.value
    };
    info.dispatch(action);
  }

  return (
    <div>
      <br />
      <input type="text" value={info.value} onChange={e => changeValue(e)} />
      <p>{info.value}</p>
    </div>
  );
}

export default Home;
