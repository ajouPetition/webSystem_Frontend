import React, { useState } from "react";
import style from "../../style/Mypage.module.css";
import cookies from "react-cookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetitionCard from "../../components/PetitionCard";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
const Mypage = (props) => {
  const navigate = useNavigate();
  const [myWrite, setMyWrite] = useState([]);
  const [myAgree, setMyAgree] = useState([]);

  const getWrite = async () => {
    await axios
      .get(`http://localhost:8080/api/users/posts`, {
        params: {
          username: `${cookies.load("userid")}`,
          startAt: 0,
          limit: 3,
        },
      })
      .then((data) => {
        // data.data.map((data) => {
        //   const today = new Date();
        //   const date = new Date(data.date).getDay();
        //   const dueDate = new Date(
        //     new Date(data.date).setDate(new Date(data.date).getDate() + 30)
        //   );
        //   const dDay = Math.ceil(
        //     (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        //   );
        //   data.dueDate = dueDate;
        //   data.dDay = dDay;
        // });
        setMyWrite(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const writeHandler = (event) => {
    setMyAgree([]);
    getWrite();
    console.log(myWrite);
  };

  const getAgree = async () => {
    await axios
      .get(`http://localhost:8080/api/users/agree`, {
        params: {
          username: `${cookies.load("userid")}`,
          startAt: 0,
          limit: 3,
        },
      })
      .then((data) => {
        setMyAgree(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const agreeHandler = (event) => {
    setMyWrite([]);
    getAgree();
    console.log(myAgree);
  };

  const logoutHandler = (event) => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      cookies.remove("userid", { path: "/" });
      alert("로그아웃되었습니다.");
      navigate("/");
    }
  };

  const deleteAccountHandler = (event) => {
    const pwd = prompt("비밀번호를 입력하세요.");
    axios
      .delete(
        `http://localhost:8080/api/users/delete/${cookies.load("userid")}`
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.section}>
      <div className={style.optionbar}>
        <div className={`${style.username}`}>{cookies.load("userid")}</div>
        <div
          className={`${style.myWrtie} ${style.option}`}
          onClick={writeHandler}
        >
          내가 쓴 글
        </div>
        <div
          className={`${style.myAgree} ${style.option}`}
          onClick={agreeHandler}
        >
          동의한 글
        </div>
        <div
          className={`${style.signout} ${style.option}`}
          onClick={logoutHandler}
        >
          로그아웃
        </div>
        <div
          className={`${style.deleteAccount} ${style.option}`}
          onClick={deleteAccountHandler}
        >
          계정 탈퇴
        </div>
      </div>
      <div className={style.info}>
        {myWrite.map((data) => {
          const today = new Date();
          const date = new Date(data.date);
          const dueDate = new Date(
            new Date(data.date).setDate(new Date(data.date).getDate() + 30)
          );
          const dDay = Math.ceil(
            (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          return (
            <PetitionCard
              key={data.postID}
              type={data.type}
              title={data.title}
              date={date.toLocaleDateString()}
              dueDate={dueDate.toLocaleDateString()}
              dDay={dDay}
              postID={data.postID}
              cnt={data.cnt}
            />
          );
        })}
        {myAgree.map((data) => {
          const today = new Date();
          const date = new Date(data.date);
          const dueDate = new Date(
            new Date(data.date).setDate(new Date(data.date).getDate() + 30)
          );
          const dDay = Math.ceil(
            (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          return (
            <PetitionCard
              key={data.postID}
              type={data.type}
              title={data.title}
              date={date.toLocaleDateString()}
              dueDate={dueDate.toLocaleDateString()}
              dDay={dDay}
              postID={data.postID}
              cnt={data.cnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mypage;
