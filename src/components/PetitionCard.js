import React from "react";
import style from "../style/PetitionCard.module.css";

const PetitionCard = ({ type, title, date, dueDate, dDay }) => {
  return (
    <li className={style.cardWrap}>
      <div className={style.contentDiv}>
        <div className={style.postType}>{type}</div>
        <div className={style.postTitle}>{title}</div>
      </div>
      <div className={style.aggrementDiv}>
        <div className={style.ratioDiv}>

        </div>
        <div className={style.dueDiv}>
          <div className={style.dueDateDiv}>
            <div className={style.dueDateHeader}>동의 기간</div>
            <div className={style.dueDateFooter}>{`${date}~${dueDate}`}</div>
          </div>
          <div className={style.dDay}>
            <p>{`D- ${dDay}`}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PetitionCard;
