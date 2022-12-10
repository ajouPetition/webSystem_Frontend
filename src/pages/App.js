import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(cookies.load('userid'));
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/login/signup" exact element={<Signup />}></Route>
        <Route path="/petition" exact element={<PetitionList />}></Route>
        <Route
          path="/petitionCompleted"
          exact
          element={<PetitionCompletedList />}
        ></Route>
        <Route
          path="/petition/write"
          exact
          element={user ? <PetitionWrite /> : <Login />}
        ></Route>
        <Route path="/mypage" exact element={<Mypage />}></Route>
        <Route
          path="/petition/detail/:id"
          exact
          element={<PetitionDetail />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
