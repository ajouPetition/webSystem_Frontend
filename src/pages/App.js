import { RouterProvider } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import "../style/init.css";

import router from "./routes";

const App = () => {
  return (
    <>
      <NavigationBar />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
