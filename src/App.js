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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Sử dụng Layout ở đây
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <Profile /> },
      { path: "/teams", element: <Teams /> },
      // { path: "products/:id", element: <ProductDetailPage /> }, // Route cho ProductDetailPage
      // { path: "flowers/:id", element: <FlowerDetailPage /> }, // Route cho FlowerDetailPage
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