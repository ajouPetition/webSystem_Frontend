import style from "../style/NavigationBar.module.css";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const logoutHandler = (event) => {
    cookies.remove("userid", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div>
            <span>AJOU PETITION</span>
          </div>
          <div>
            <ul>
              <li className={style.link}>
                <a href={`/`}>홈</a>
              </li>
              <li className={style.link}>
                <a href={`/petition/write`}>청원하기</a>
              </li>
              <li className={style.link}>
                <a href={`/petition`}>청원목록</a>
              </li>
            </ul>
          </div>
          <div className={style.user}>
            <ul>
              <li className={style.link}>
                {cookies.load("userid") === undefined ? (
                  <a href={`/login`}>로그인</a>
                ) : (
                  <button className={style.button} onClick={logoutHandler}>
                    로그아웃
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
