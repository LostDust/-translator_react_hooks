import React, { useContext, useState } from "react";
import styles from "./Translate.less";
import { reduxContext } from "../store.js";

function Translate() {
  const { input, output, list, store, dispatch } = useContext(reduxContext);

  const [fromType, setFromType] = useState("英文");
  const [toType, setToType] = useState("中文");

  function changeStore(e, key) {
    const action = {
      type: "UPDATE",
      value: e.target.value
    };
    dispatch[key](action);
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
      `http://203.195.141.131:3100/api?q=${input}&from=${from}&to=${to}`
    )
      .then(res => res.text())
      .then(msg => {
        dispatch.output({ type: "UPDATE", value: msg });
      });

    const result = list[store].some(item => {
      return item.from == input;
    });
    dispatch.has({
      type: "UPDATE",
      value: result ? true : false
    });
  }

  return (
    <section className={styles.translate}>
      <textarea
        rows="4"
        value={input}
        onChange={e => changeStore(e, "input")}
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
        value={output}
        onChange={e => changeStore(e, "output")}
      ></textarea>
    </section>
  );
}

export default Translate;
