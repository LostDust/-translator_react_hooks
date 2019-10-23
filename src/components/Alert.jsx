import React, { useContext } from "react";
import { reduxContext } from "../store.js";
import styles from "./Alert.less";

function Alert() {
  const { alertList } = useContext(reduxContext);

  return (
    <section className={styles.alert}>
      <ul>
        {alertList.map(item => {
          return (
            <li key={item.id}>
              <p>{item.content}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Alert;
