import { createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import Login from './Login/login';
import PetitionList from './PetitionList';
import PetitionWrite from './PetitionWrite';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'login',
    element: <Login />
  },
  {
    path: '/petition',
    element: <PetitionList />,
  },
  {
    path: '/petition/write',
    element: <PetitionWrite />,
  },
]);

export default router;
