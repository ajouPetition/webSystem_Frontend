import React, { useState, useEffect } from 'react';
import style from '../../style/Mypage.module.css';
import cookies from 'react-cookies';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PetitionCard from '../../components/PetitionCard';
const Mypage = ({ user }) => {
  const navigate = useNavigate();
  const [myWrite, setMyWrite] = useState([]);
  const [myAgree, setMyAgree] = useState([]);
  const [totalpage, setTotalPage] = useState();
  const [page, setPage] = useState(1);

  const getWrite = async () => {
    console.log('page num : ', page);
    await axios
      .get(`http://localhost:8080/api/users/posts`, {
        params: {
          username: `${cookies.load('userid')}`,
          startAt: 3 * (page - 1),
          limit: 3,
        },
      })
      .then((data) => {
        // console.log(data.data.le)
        setMyWrite(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`http://localhost:8080/api/users/posts`, {
        params: {
          username: user,
          startAt: 0,
          limit: 100,
        },
      })
      .then((data) => {
        console.log('data 갯수 : ', data.data.length);
        if (data.data.length % 3 === 0) {
          setTotalPage(parseInt(data.data.length / 3));
        } else {
          setTotalPage(parseInt(data.data.length / 3) + 1);
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
    console.log('page num : ', page);
    await axios
      .get(`http://localhost:8080/api/users/agree`, {
        params: {
          username: user,
          startAt: 3 * (page - 1),
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
          username: user,
          startAt: 0,
          limit: 100,
        },
      })
      .then((data) => {
        console.log('data 갯수 : ', data.data.length);

        if (data.data.length % 3 === 0) {
          setTotalPage(parseInt(data.data.length / 3));
        } else {
          setTotalPage(parseInt(data.data.length / 3) + 1);
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
    if (window.confirm('로그아웃 하시겠습니까?')) {
      cookies.remove('token', { path: '/' });
      alert('로그아웃되었습니다.');
      navigate('/');
    }
  };

  const deleteAccountHandler = (event) => {
    // const pwd = prompt("비밀번호를 입력하세요.");
    axios
      .delete(`http://localhost:8080/api/users/delete/${user}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const onPageHandler = (event) => {
    console.log('clicked page num ', event.target.innerText);
    setPage(event.target.innerText);
  };

  useEffect(() => {
    // if (myAgree === []) {
    //   getWrite();
    // } else {
    //   getAgree();
    // }
    if (myWrite.length === 0) {
      getAgree();
    } else {
      getWrite();
    }
  }, [page]);
  return (
    <div className={style.section}>
      <div className={style.optionbar}>
        <div className={`${style.username}`}>{user}</div>
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
      <div className={style.data}>
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
        <div>
          {Array(totalpage)
            .fill()
            .map((_, page_num) => (
              <button
                key={page_num + 1}
                className={style.pageBtn}
                onClick={onPageHandler}
              >
                {page_num + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
