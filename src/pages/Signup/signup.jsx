import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../../style/Signup.module.css';

const Signup = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState();

  const onUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onPasswordCheckHandler = (event) => {
    setPasswordCheck(event.target.value);
  };

  const onSignupHandler = (event) => {
    axios

      .post(
        'http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/register',
        {
          // .post("localhost:8080/api/users/register", {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        if (response.data.status === 'success') {
          alert('회원가입 성공');
          navigate('/');
        } else {
          alert('User name이 중복되었습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={style.root}>
      <section className={style.login}>
        <div className={style.title}>회원가입</div>
        <div className={style.section}>
          <label>User name</label>
          <input
            type="text"
            className={style.input}
            placeholder="User name"
            onChange={onUsernameHandler}
            required
          />
          <label>Password</label>
          <input
            type="password"
            className={style.input}
            placeholder="Password"
            minLength="8"
            maxLength="15"
            onChange={onPasswordHandler}
            required
          />
          <label>Password Check</label>
          <input
            type="password"
            className={style.input}
            placeholder="Password Check"
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
