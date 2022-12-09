import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
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

  const onLoginhandler = () => {
    console.log(email);
    console.log(password);
    axios
      .post("http://localhost:8080/api/users/login", {
        username: email,
        password: password,
      })
      .then((data) => {
        if (data.data.status === "success") {
          alert("로그인 성공");
          // cookie 저장
          const expires = new Date();
          expires.setHours(expires.getHours() + 1);
          cookies.save("userid", email, {
            path: "/",
            expires,
          });
          console.log(cookies.load("userid"));
          // 로그인 성공 후 홈 화면으로
          navigate("/");
        } else {
          alert("로그인 실패");
        }
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
            className={style.input1}
            placeholder="User name"
            onChange={onEmailHandler}
            required
          />
          <input
            type="password"
            className={style.input2}
            placeholder="Password"
            onChange={onPasswordHandler}
            required
          />
          <div className={style.btn}>
            <button className={style.btn1} onClick={onLoginhandler}>
              로그인
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
