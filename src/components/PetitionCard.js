import React from "react";
import style from "../style/PetitionCard.module.css";

const PetitionCard = ({ type, title }) => {
  return (
    <li className={style.cardWrap}>
      <div className={style.contentDiv}>
        <div className={style.postType}>{type}</div>
        <div className={style.postTitle}>{title}</div>
      </div>
      <div className={style.aggrementDiv}></div>
    </li>
  );
};

export default PetitionCard;
