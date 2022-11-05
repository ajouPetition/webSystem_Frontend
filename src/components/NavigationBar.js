import style from '../style/NavigationBar.module.css';

const NavigationBar = () => {
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
                <a href={`/login`}>로그인</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
