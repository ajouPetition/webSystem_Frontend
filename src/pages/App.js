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
import cookies from 'react-cookies';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

function App() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    const getUser = () => {
      cookies.load('token')
        ? axios
            .get('http://localhost:8080/api/users/auth/payload', {
              headers: { authorization: cookies.load('token') },
            })
            .then((result) => {
              setUser(result.data.data.username);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error)
              setIsLoading(false);
            })
        : setIsLoading(false);
    };
    getUser();
  }, []);

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
                user ? <Navigate to={'/mypage'} replace={true} /> : <Login />
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
                  <Mypage user={user} />
                ) : (
                  <Navigate to={'/login'} replace={true} />
                )
              }
            ></Route>
            <Route
              path="/petition/detail/:id"
              exact
              element={<PetitionDetail user={user}/>}
            ></Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
