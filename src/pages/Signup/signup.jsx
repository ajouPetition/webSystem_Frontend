import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../style/Signup.module.css";

const Signup = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState();

  const onNameHandler = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const onEmailHandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  const onPasswordCheckHandler = (event) => {
    setPasswordCheck(event.target.value);
  };
  // const onCancleHandler = (event) => {
  //   navigate("/");
  // };
  const onSignupHandler = (event) => {
    axios

        .post("http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/register", {
        // .post("localhost:8080/api/users/register", {
        userID: email,
        username: name,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.root}>
      <section className={style.login}>
        <div className={style.title}>회원가입</div>
        <div className={style.section}>
          <label>이름</label>
          <input
            type="text"
            className={style.input}
            placeholder="이름"
            onChange={onNameHandler}
            required
          />
          <label>이메일</label>
          <input
            type="text"
            className={style.input}
            placeholder="이메일"
            onChange={onEmailHandler}
            required
          />
          <label>비밀번호</label>
          <input
            type="password"
            className={style.input}
            placeholder="비밀번호"
            minLength="8"
            maxLength="15"
            onChange={onPasswordHandler}
            required
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            className={style.input}
            placeholder="비밀번호 확인"
            onChange={onPasswordCheckHandler}
            required
          />
          {password === passwordcheck ? (
            <></>
          ) : (
            <div className={style.check}>비밀번호가 일치하지 않습니다.</div>
          )}
          <div className={style.btn}>
            <button className={style.btn1} onClick={onSignupHandler}>
              회원 가입
            </button>
            {/* <button className={style.btn1} onClick={onCancleHandler}>
              취소
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
