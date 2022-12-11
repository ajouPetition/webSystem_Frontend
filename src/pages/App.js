import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../style/init.css';
import Home from './Home';
import Login from './Login/login';
import Mypage from './Mypage/mypage';
import PetitionDetail from './PetitionDetail';
import PetitionList from './PetitionList';
import PetitionCompletedList from './PetitionCompletedList';
import PetitionWrite from './PetitionWrite';
import Signup from './Signup/signup';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getUser = () => {
      cookies.token
        ? axios
            .get(
              'http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/auth/payload',
              {
                headers: { authorization: cookies.token },
              }
            )
            .then((result) => {
              setUser(result.data.data.username);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error);
              removeCookie('token');
            })
        : setIsLoading(false);
    };
    getUser();
  }, [cookies.token]);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <NavigationBar user={user} />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route
              path="/login"
              exact
              element={
                user ? (
                  <Navigate to={'/mypage'} replace={true} />
                ) : (
                  <Login setCookie={setCookie} />
                )
              }
            ></Route>
            <Route
              path="/login/signup"
              exact
              element={
                user ? <Navigate to={'/mypage'} replace={true} /> : <Signup />
              }
            ></Route>
            <Route path="/petition" exact element={<PetitionList />}></Route>
            <Route
              path="/petitionCompleted"
              exact
              element={<PetitionCompletedList />}
            ></Route>
            <Route
              path="/petition/write"
              exact
              element={
                user ? (
                  <PetitionWrite user={user} />
                ) : (
                  <Navigate to={'/login'} replace={true} />
                )
              }
            ></Route>
            <Route
              path="/mypage"
              exact
              element={
                user ? (
                  <Mypage user={user} removeCookie={removeCookie} />
                ) : (
                  <Navigate to={'/login'} replace={true} />
                )
              }
            ></Route>
            <Route
              path="/petition/detail/:id"
              exact
              element={<PetitionDetail user={user} />}
            ></Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
