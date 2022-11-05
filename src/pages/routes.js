import { createBrowserRouter } from 'react-router-dom';

import Home from './home/Home';
import Petition from './home/Petition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/petition',
    element: <Petition />,
  },
]);

export default router;
