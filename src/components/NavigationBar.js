import style from '../style/NavigationBar.module.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ user }) => {
  const navigate = useNavigate();
  const goToMypage = (event) => {
    // cookies.remove("userid", { path: "/" });
    navigate('/mypage');
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div>
            <a className={style.logo} href={`/`}>
              AJOU PETITION
            </a>
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
              <li className={style.link}>
                <a href={`/petitionCompleted`}>종료된 청원</a>
              </li>
            </ul>
          </div>
          <div className={style.user}>
            <ul>
              <li className={style.link}>
                {user === '' ? (
                  <a href={`/login`}>로그인</a>
                ) : (
                  <button className={style.button} onClick={goToMypage}>
                    내 정보
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
