import React, { useContext } from "react";
import styles from "./Table.less";
import { reduxContext } from "../store.js";

function Table(props) {
  const { list, alertList } = useContext(reduxContext);
  const nowStore = props.location.search.slice(1).split("=")[1];

  function play(index) {
    document.querySelector(`tbody tr:nth-child(${index + 1}) audio`).play();
  }
  function notFind(index) {
    document.querySelector(
      `tbody tr:nth-child(${index + 1}) [alt=play-circle]`
    ).style.visibility = "hidden";
  }
  function removeItem(index) {
    const newList = Object.assign({}, list.value);
    newList[nowStore].splice(index, 1);
    list.dispatch({
      type: "UPDATE",
      value: newList
    });

    const id = new Date().getTime();
    const newAlert = Object.assign([], alertList.value);
    newAlert.push({ content: "删除成功", id });
    alertList.dispatch({
      type: "UPDATE",
      value: newAlert
    });
    setTimeout(() => {
      const newAlert = Object.assign([], alertList.value);
      newAlert.shift();
      alertList.dispatch({
        type: "UPDATE",
        value: newAlert
      });
    }, 2000);
  }
  function alertInfo() {
    alert("Test");
  }

  return (
    <section className={styles.table}>
      <table cellSpacing="0">
        <thead>
          <tr>
            <td>No</td>
            <td>From</td>
            <td>To</td>
            <td>Menu</td>
          </tr>
        </thead>
        <tbody>
          {list.value[nowStore] &&
            list.value[nowStore].map((item, index) => {
              return (
                <tr key={item.from}>
                  <td>{index + 1}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>
                    <audio
                      src={`http://203.195.141.131:3100/static/media/${item.from}.mp3`}
                      onError={() => notFind(index)}
                    ></audio>
                    <img
                      src="http://203.195.141.131:3100/static/png/play-circle.png"
                      alt="play-circle"
                      onClick={() => play(index)}
                    />
                    <img
                      src="http://203.195.141.131:3100/static/png/close-circle.png"
                      alt="close-circle"
                      onClick={() => removeItem(index)}
                    />
                    <img
                      src="http://203.195.141.131:3100/static/png/tool.png"
                      alt="message"
                      onClick={alertInfo}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
