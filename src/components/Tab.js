import React from 'react';
import style from '../style/Tab.module.css';

const Tab = ({ orderType, setOrderType, item }) => {
  const onClickSetOrderType = (event) => {
    const {
      target: { id },
    } = event;
    setOrderType(id);
  };
  return (
    <li
      onClick={onClickSetOrderType}
      id={item.id}
      className={`${style.tab} ${orderType === item.id && style.selectedTab}`}
    >
      {item.tabName}
    </li>
  );
};

export default Tab;
