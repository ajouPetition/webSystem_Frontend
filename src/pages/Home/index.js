import cookies from "react-cookies";

const Home = () => {
  const temp = () => {
    console.log(cookies.load("userid"));
  };
  return <button onClick={temp}></button>;
};

export default Home;
