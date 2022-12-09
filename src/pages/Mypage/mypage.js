import React, { useEffect, useState } from "react";
import style from "../../style/Mypage.module.css";
import cookies from "react-cookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetitionCard from "../../components/PetitionCard";
const Mypage = (props) => {
  const navigate = useNavigate();
  const [myWrite, setMyWrite] = useState([]);
  const [myAgree, setMyAgree] = useState([]);
  const [pagenum, setPagenum] = useState();
  const [page, setPage] = useState(1);

  const getWrite = async () => {
    await axios
      .get(`http://localhost:8080/api/users/posts`, {
        params: {
          username: `${cookies.load("userid")}`,
          startAt: 3 * (page - 1),
          limit: 3 * page,
        },
      })
      .then((data) => {
        setMyWrite(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`http://localhost:8080/api/users/posts`, {
        params: {
          username: `${cookies.load("userid")}`,
          startAt: 0,
          limit: 100,
        },
      })
      .then((data) => {
        if (data.data.length % 3 == 0) {
          setPagenum(parseInt(data.data.length / 3));
        } else {
          setPagenum(parseInt(data.data.length / 3) + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const writeHandler = (event) => {
    setMyAgree([]);
    getWrite();
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
    await axios
      .get(`http://localhost:8080/api/users/agree`, {
        params: {
          username: `${cookies.load("userid")}`,
          startAt: 0,
          limit: 3,
        },
      })
      .then((data) => {
        if (data.data.length % 3 == 0) {
          setPagenum(parseInt(data.data.length / 3));
        } else {
          setPagenum(parseInt(data.data.length / 3) + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const agreeHandler = (event) => {
    setMyWrite([]);
    getAgree();
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
  const pageHandler = (event) => {
    console.log(event.target.innerText);
    setPage(event.target.innerText);
  };

  useEffect(() => {
    if (myAgree.length === 0) {
      getWrite();
    } else {
      getAgree();
    }
  }, [page]);
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
        <ul className={style.data}>
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
        </ul>
        <div className={style.pagenumber}>
          {Array(pagenum)
            .fill()
            .map((_, num) => (
              <button
                key={num}
                className={style.pagebutton}
                onClick={pageHandler}
              >
                {num + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
