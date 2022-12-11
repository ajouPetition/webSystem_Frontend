import React from 'react';
import cookies from 'react-cookies';

const CookieSave = ({ username, token }) => {
  // const expires = 60;
  const expires = new Date();
  // 년도 설정, 현재의 년도를 가져와 +10을 해서 2032가 됨
  expires.setFullYear(expires.getFullYear() + 10);

  cookies.save(username, token, {
    path: '/',
    expires,
  });
  //cookies 데이터 가져오기
  //console.log(cookies.load('usreid')); // token 값

  // 쿠키 기한
  return <p>react-cookie Save</p>;
};

export default CookieSave;
