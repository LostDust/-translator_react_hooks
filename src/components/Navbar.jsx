import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.less";

function Navbar() {
  return (
    <section className={styles.navbar}>
      <ul>
        <li>
          <Link to="/main">翻译</Link>
        </li>
        <li>
          <span>收藏夹</span>
          <ul>
            <li>
              <Link to={`/table?store=public`}>public</Link>
            </li>
            <li>
              <Link to={`/table?store=local`}>local</Link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default Navbar;
