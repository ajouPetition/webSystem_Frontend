import { createBrowserRouter } from 'react-router-dom';

import Home from './home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export default router;
