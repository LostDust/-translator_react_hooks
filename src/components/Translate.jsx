import React, { useContext, useState } from "react";
import styles from "./Translate.less";
import { reduxContext } from "../store.js";

function Translate() {
  const { input, output, has, list, store } = useContext(reduxContext);

  const [fromType, setFromType] = useState("英文");
  const [toType, setToType] = useState("中文");

  function changeStore(e, key, value) {
    const action = {
      type: "UPDATE",
      value: e.target.value
    };
    value.dispatch(action);
  }
  function changeValue(e, key) {
    eval(`set${key}("${e.target.value}")`);
  }
  function translation() {
    if (!input) return;
    let [from, to] = [fromType, toType];
    switch (from) {
      case "英文":
        from = "en";
        break;
      case "其他":
        from = "auto";
    }
    switch (to) {
      case "中文":
        to = "zh";
        break;
      case "英文":
        to = "en";
    }
    fetch(
      `http://203.195.141.131:3100/api?q=${input.value}&from=${from}&to=${to}`
    )
      .then(res => res.text())
      .then(msg => {
        output.dispatch({ type: "UPDATE", value: msg });
      });

    const result = list.value[store.value].some(item => {
      return item.from == input.value;
    });
    has.dispatch({
      type: "UPDATE",
      value: result ? true : false
    });
  }

  return (
    <section className={styles.translate}>
      <textarea
        rows="4"
        value={input.value}
        onChange={e => changeStore(e, "input", input)}
      ></textarea>
      <div id={styles["form-group"]}>
        <div>
          <span>From：</span>
          <select onChange={e => changeValue(e, "FromType")} value={fromType}>
            <option>英文</option>
            <option>其他</option>
          </select>
        </div>
        <div>
          <span>To：</span>
          <select onChange={e => changeValue(e, "ToType")} value={toType}>
            <option>中文</option>
            <option>英文</option>
          </select>
        </div>
        <div>
          <button onClick={() => translation()}>翻译</button>
        </div>
      </div>
      <textarea
        rows="4"
        value={output.value}
        onChange={e => changeStore(e, "output", output)}
      ></textarea>
    </section>
  );
}

export default Translate;
