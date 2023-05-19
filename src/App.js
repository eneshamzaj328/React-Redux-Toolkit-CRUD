import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

import RootLayout from './Pages/Root';
import HomePage from './Pages/Home';
import UsersPage from './Pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <h1 className="block mt-40 text-neutral-700 text-2xl font-bold text-center">404 Not Found. <Link to='/' className="block mt-4 text-xl underline font-sans text-sky-700">Back to Home {'>'}</Link></h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'users',
        element: <UsersPage />,
      }
    ]
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;