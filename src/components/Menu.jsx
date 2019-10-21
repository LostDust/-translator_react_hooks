import React, { useContext } from "react";
import styles from "./Menu.less";
import { reduxContext } from "../store.js";

function Menu() {
  const { store, has, input, output, list, alertList } = useContext(
    reduxContext
  );
  console.log(list);


  function changeStore(e, key) {
    const action = {
      type: "UPDATE",
      value: e.target.value
    };
    key.dispatch(action);

    console.log(list.value);
    const result = list.value[e.target.value].some(item => {
      return item.from == input.value;
    });
    has.dispatch({
      type: "UPDATE",
      value: result ? true : false
    });
  }
  function addItem() {
    if (!input.value || !output.value) return;
    if (has.value) return;

    const newList = Object.assign({}, list.value);
    newList[store.value].push({ from: input.value, to: output.value });
    list.dispatch({ type: "UPDATE", value: newList });
    has.dispatch({ type: "UPDATE", value: true });

    const id = new Date().getTime();
    const newAlert = Object.assign([], alertList.value);
    newAlert.push({ content: "添加成功", id });
    alertList.dispatch({ type: "UPDATE", value: newAlert });
    setTimeout(() => {
      const newAlert = Object.assign([], alertList.value);
      newAlert.shift();
      alertList.dispatch({ type: "UPDATE", value: newAlert });
    }, 2000);
  }

  return (
    <section className={styles.menu}>
      <ul>
        <li>
          <span>收藏到</span>
        </li>
        <li>
          <select value={store.value} onChange={e => changeStore(e, store)}>
            <option>public</option>
            <option>local</option>
          </select>
        </li>
        <li>
          <img
            src={`http://203.195.141.131:3100/static/png/star${
              has.value ? "-active" : ""
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
