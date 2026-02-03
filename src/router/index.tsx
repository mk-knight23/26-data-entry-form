import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import Home from '../pages/Home';
import Stats from '../pages/Stats';
import Settings from '../pages/Settings';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    { index: true, element: <Home /> },
    { path: 'stats', element: <Stats /> },
    { path: 'settings', element: <Settings /> }
  ]
}]);

export default function Router() { return <RouterProvider router={router} />; }
