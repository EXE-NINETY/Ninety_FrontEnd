import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/UserProfile';
import Teams from './pages/Teams';
import Tournament from './pages/Tournament';
import TeamDetail from './pages/TeamDetail';
import TournamentDetail from './pages/TournamentDetail';
import PrivateRoute from './pages/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <PrivateRoute><HomePage /></PrivateRoute> },
      { path: "/about", element: <PrivateRoute><Profile /></PrivateRoute> }, 
      { path: "/teams", element: <PrivateRoute><Teams /></PrivateRoute> }, 
      { path: "/tournaments", element: <PrivateRoute><Tournament /></PrivateRoute> }, 
      { path: "/teams/:id", element: <PrivateRoute><TeamDetail /></PrivateRoute> }, 
      { path: "/tournaments/:id", element: <PrivateRoute><TournamentDetail /></PrivateRoute> }, 
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path:"/Login",
    element: <Login />
  },
  {
    path:"/Sign-up",
    element: <SignUp />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;