import axios from 'axios';
import React, { useState } from 'react';
import style from '../../style/Login.module.css';

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailHandler = (event) => {
    console.log(event.target.value);
    setEmail(event);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value)
}
  

  return (
    <div className={style.root}>

    <section className={style.login}>
      <div className={style.title}>로그인</div>
      <div className={style.section}>
        <input
          type="text"
          className={style.input}
          placeholder='이메일'
          onChange={onEmailHandler}
          required/>
        <input 
          type="password"
          className={style.input}
          placeholder="비밀번호"
          onChange={onPasswordHandler}
          required />
        <div className={style.btn}>
          <button className={style.btn1} >로그인</button>
          <button className={style.btn1} >취소</button>
        </div>
      </div>
      <p>회원가입은 <a className={style.href} href={'/login/signup'}>여기</a>에서 할 수 있습니다.</p>
    </section>
    </div>
    
  );
}

export default Login;
