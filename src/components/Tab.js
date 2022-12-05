import React from 'react';
import style from '../style/Tab.module.css';

const Tab = ({ navigate, currentType, currentOrderBy, item }) => {
  const onClickSetOrderType = (event) => {
    const {
      target: { id },
    } = event;
    navigate(`?page=1&type=${currentType}&orderBy=${id}`);
  };
  return (
    <li
      onClick={onClickSetOrderType}
      id={item.id}
      className={`${style.tab} ${
        currentOrderBy === item.id && style.selectedTab
      }`}
    >
      {item.tabName}
    </li>
  );
};

export default Tab;
