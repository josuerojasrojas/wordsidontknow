import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./styles.module.css";

const Sidebar = ({ routes }) => (
  <div className={classNames(styles.sidebar)}>
    <ul>
      {routes.map((route, index) =>
        route.sidebar ? (
          <li>
            <NavLink
              to={route.path}
              exact
              key={index}
              activeClassName={styles.active}
            >
              {route.name}
            </NavLink>
          </li>
        ) : (
          ""
        )
      )}
    </ul>
  </div>
);

export default Sidebar;
