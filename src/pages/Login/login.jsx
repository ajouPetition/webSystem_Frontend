import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../style/Login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailHandler = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const onCancleHandler = (event) => {
    navigate("/");
  };

  const onLoginhandler = () => {
    console.log(email);
    console.log(password);
    axios
      .post("//localhost:3000/api/users/auth", {
        username: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.root}>
      <section className={style.login}>
        <div className={style.title}>로그인</div>
        <div className={style.section}>
          <input
            type="text"
            className={style.input}
            placeholder="이메일"
            onChange={onEmailHandler}
            required
          />
          <input
            type="password"
            className={style.input}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
            required
          />
          <div className={style.btn}>
            <button className={style.btn1} onClick={onLoginhandler}>
              로그인
            </button>
            <button className={style.btn1} onClick={onCancleHandler}>
              취소
            </button>
          </div>
        </div>
        <div>
          회원가입은{" "}
          <a className={style.href} href={"/login/signup"}>
            여기
          </a>
          에서 할 수 있습니다.
        </div>
      </section>
    </div>
  );
};

export default Login;
