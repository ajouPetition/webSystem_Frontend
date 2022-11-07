import { createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import PetitionList from './PetitionList';
import PetitionWrite from './PetitionWrite';

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
]);

export default router;
