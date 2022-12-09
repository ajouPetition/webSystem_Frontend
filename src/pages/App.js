import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import "../style/init.css";
import Home from "./Home";
import Login from "./Login/login";
import Mypage from "./Mypage/mypage";
import PetitionDetail from "./PetitionDetail";
import PetitionList from "./PetitionList";
import PetitionWrite from "./PetitionWrite";
import Signup from "./Signup/signup";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/login/signup" exact element={<Signup />}></Route>
        <Route path="/petition" exact element={<PetitionList />}></Route>
        <Route path="/petition/write" exact element={<PetitionWrite />}></Route>
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
