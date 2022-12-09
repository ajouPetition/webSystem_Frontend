import React from "react";
import style from "../style/PetitionCard.module.css";
import likeIcon from "../assets/images/like.png";

const PetitionCard = ({ type, title, date, dueDate, dDay, postID, cnt }) => {
  return (
    <li className={style.cardWrap}>
      <div className={style.contentDiv}>
        <a href={`/petition/detail/${postID}`}>
          <div className={style.postType}>{type}</div>
          <div className={style.postTitle}>{title}</div>
        </a>
      </div>
      <div className={style.aggrementDiv}>
        <div className={style.ratioDiv}>
          <div className={style.caption}>
            <div className={style.count}>
              <img alt="like" src={likeIcon} />
              <div className={style.countText}>
                {cnt !== null ? `${cnt}명` : "0명"}
              </div>
            </div>
            <div className={style.ratio}>{cnt !== null ? `${cnt}%` : "0%"}</div>
          </div>
          <div className={style.progressBarDiv}>
            <div className={style.progressBar}>
              <div
                style={{
                  width: `${cnt * 0.9}%`,
                  height: "20px",
                  backgroundColor: "#132d5a",
                  borderRadius: "3px",
                }}
              ></div>
            </div>
          </div>
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
