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
              <div className={style.imgDiv}>
                <img alt="like" src={likeIcon} />
              </div>
              <div className={style.countText}>
                {cnt !== null ? `${cnt}명` : "0명"}
              </div>
            </div>
            <div className={style.ratio}>{cnt !== null ? `${cnt*10}%` : "0%"}</div>
          </div>
          <div className={style.progressBarDiv}>
            <div className={style.progressBar}>
              <div
                style={{
                  width: (cnt===null ? `0%`: (cnt>10?'100%': `${cnt*10}%`)),
                  height: "20px",
                  backgroundColor: "#132d5a",
                  borderRadius: "4px",
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
            <p>{dDay > 0 ? `D- ${dDay}` : `D- 0`}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PetitionCard;
