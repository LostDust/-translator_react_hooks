import React, { useContext } from "react";
import styles from "./Menu.less";
import { reduxContext } from "../store.js";

function Menu() {
  const { store, has, input, output, list, alertList, dispatch } = useContext(
    reduxContext
  );

  function changeStore(e, key) {
    dispatch[key]({ type: "UPDATE", value: e.target.value });

    const result = list[e.target.value].some(item => {
      return item.from == input;
    });
    dispatch.has({ type: "UPDATE", value: result ? true : false });
  }
  function addItem() {
    if (!input || !output) return;
    if (has) return;

    const newList = Object.assign({}, list);
    newList[store].push({ from: input, to: output });
    dispatch.list({
      type: "UPDATE",
      value: newList,
      save: store === "public"
    });
    if (store === "local") localStorage.setItem(input, output);
    dispatch.has({ type: "UPDATE", value: true });

    const id = new Date().getTime();
    const newAlert = Object.assign([], alertList);
    newAlert.push({ content: "添加成功", id });
    dispatch.alertList({ type: "UPDATE", value: newAlert });
    setTimeout(() => {
      const newAlert = Object.assign([], alertList);
      newAlert.shift();
      dispatch.alertList({ type: "UPDATE", value: newAlert });
    }, 2000);
  }

  return (
    <section className={styles.menu}>
      <ul>
        <li>
          <span>收藏到</span>
        </li>
        <li>
          <select value={store} onChange={e => changeStore(e, "store")}>
            <option>public</option>
            <option>local</option>
          </select>
        </li>
        <li>
          <img
            src={`http://203.195.141.131:3100/static/png/star${
              has ? "-active" : ""
            }.png`}
            onClick={addItem}
          />
        </li>
        <div></div>
      </ul>
    </section>
  );
}

export default Menu;
