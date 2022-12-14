import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../../style/Login.module.css';

const Login = ({ setCookie }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onLoginhandler = () => {
    axios
      .post(
        'http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/login',
        {
          username: username,
          password: password,
        }
      )
      .then((data) => {
        if (data.data.status === 'success') {
          alert('로그인 성공');
          // cookie 저장
          setCookie('token', data.data.token);
          // 로그인 성공 후 홈 화면으로
          navigate('/');
        } else {
          alert('로그인 실패');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('로그인 실패');
      });
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
            onChange={onUsernameHandler}
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
          회원가입은{' '}
          <a className={style.href} href={'/login/signup'}>
            여기
          </a>
          에서 할 수 있습니다.
        </div>
      </section>
    </div>
  );
};

export default Login;
