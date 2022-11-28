import { createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import PetitionList from './PetitionList';
import PetitionWrite from './PetitionWrite';
import PetitionDetail from './PetitionDetail/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
