import { createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import Login from './Login/login';
import Signup from './Signup/signup';
import PetitionList from './PetitionList';
import PetitionWrite from './PetitionWrite';
import PetitionDetail from './PetitionDetail/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/login/signup',
    element:<Signup />
  },
  {
    path: '/petition',
    element: <PetitionList />,
  },
  {
    path: '/petition/write',
    element: <PetitionWrite />,
  },
  {
    path: '/petition/detail/:id',
    element: <PetitionDetail />,
  },
]);

export default router;
