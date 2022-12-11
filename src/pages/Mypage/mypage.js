import React, { useState, useEffect } from 'react';
import style from '../../style/Mypage.module.css';
import axios from 'axios';
import PetitionCard from '../../components/PetitionCard';
const Mypage = ({ user, removeCookie }) => {
  const [myWrite, setMyWrite] = useState([]);
  const [myAgree, setMyAgree] = useState([]);
  const [totalpage, setTotalPage] = useState();
  const [page, setPage] = useState({
    num: 1,
    state: "write",
  });

  const getWrite = async () => {
<<<<<<< Updated upstream
=======
    console.log("page num : ", page);
    if (page.state == "agree") {
      setPage((current) => {
        let newPage = { ...current };
        newPage.num = 1;
        newPage.state = "write";
        return newPage;
      });
    }
>>>>>>> Stashed changes
    await axios
      .get(
        `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/posts`,
        {
          params: {
            username: user,
            startAt: 3 * (page.num - 1),
            limit: 3,
          },
        }
      )
      .then((data) => {
        setMyWrite(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    await axios
      .get(
        `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/posts`,
        {
          params: {
            username: user,
            startAt: 0,
            limit: 100,
          },
        }
      )
      .then((data) => {
        if (data.data.length % 3 === 0) {
          setTotalPage(parseInt(data.data.length / 3));
        } else {
          setTotalPage(parseInt(data.data.length / 3) + 1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const writeHandler = (event) => {
    setMyAgree([]);
    getWrite();
  };

  const getAgree = async () => {
    if (page.state == "write") {
      setPage((current) => {
        let newPage = { ...current };
        newPage.num = 1;
        newPage.state = "agree";
        return newPage;
      });
    }
    await axios
      .get(
        `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/agree`,
        {
          params: {
            username: user,
            startAt: 3 * (page.num - 1),
            limit: 3,
          },
        }
      )
      .then((data) => {
        setMyAgree(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    await axios
      .get(
        `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/agree`,
        {
          params: {
            username: user,
            startAt: 0,
            limit: 100,
          },
        }
      )
      .then((data) => {
        if (data.data.length % 3 === 0) {
          setTotalPage(parseInt(data.data.length / 3));
        } else {
          setTotalPage(parseInt(data.data.length / 3) + 1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const agreeHandler = (event) => {
    setMyWrite([]);
    getAgree();
  };

  const logoutHandler = (event) => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      removeCookie('token');
      alert('로그아웃되었습니다.');
      window.location.replace('/');
    }
  };

  const deleteAccountHandler = (event) => {
    const pwd = prompt('비밀번호를 입력하세요.');
    axios
      .delete(
        `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/delete`,
        {
          data: {
            username: user,
            password: pwd,
          },
        }
      )
      .then((data) => {
        if (typeof data.data.error == 'undefined') {
          alert('탈퇴되었습니다.');
          removeCookie('token');
          window.location.replace('/');
        } else {
          alert(data.data.error);
        }
      })
      .catch((err) => console.error('err : ', err));
  };
  const onPageHandler = (event) => {
    // setPage(event.target.innerText);
    setPage((current) => {
      let newPage = { ...current };
      newPage.num = event.target.innerText;
      return newPage;
    });
  };

  useEffect(() => {
    if (myAgree.length === 0) {
      getWrite();
    } else {
      getAgree();
    }
  }, [page.num]);
  return (
    <div className={style.section}>
      <div className={style.optionbar}>
        <div className={`${style.username}`}>{user}</div>
        <div
          className={page.state == "write" ? style.active : style.option}
          onClick={writeHandler}
        >
          내가 쓴 글
        </div>
        <div
          className={page.state == "agree" ? style.active : style.option}
          onClick={agreeHandler}
        >
          동의한 글
        </div>
        <div className={`${style.option}`} onClick={logoutHandler}>
          로그아웃
        </div>
        <div className={`${style.option}`} onClick={deleteAccountHandler}>
          계정 탈퇴
        </div>
      </div>
      <div className={style.data}>
        <div className={style.info}>
          {myWrite.map((data) => {
            const today = new Date();
            const date = new Date(data.date);
            const dueDate = new Date(
              new Date(data.date).setDate(new Date(data.date).getDate() + 60)
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
              new Date(data.date).setDate(new Date(data.date).getDate() + 60)
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
                className={
                  page.num == page_num + 1 ? style.currentPage : style.extrPage
                }
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
