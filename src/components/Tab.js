import React from "react";
import style from "../style/Tab.module.css";

const Tab = ({ item }) => {
  return <li className={style.tab}>{item.tabName}</li>;
};

export default Tab;
