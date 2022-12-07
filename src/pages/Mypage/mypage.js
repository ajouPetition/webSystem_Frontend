import React from "react";
import style from "../../style/Mypage.module.css";
const Mypage = (props) => {
  return (
    <div className={style.section}>
      <div className={style.optionbar}>
        <div className={`${style.username}`}>유저 이름</div>
        <div className={`${style.myWrtie} ${style.option}`}>내가 쓴 글</div>
        <div className={`${style.myAgree} ${style.option}`}>동의한 글</div>
        <div className={`${style.signout} ${style.option}`}>로그아웃</div>
        <div className={`${style.deleteAccount} ${style.option}`}>
          계정 탈퇴
        </div>
      </div>
      <div className={style.info}></div>
    </div>
  );
};

export default Mypage;
