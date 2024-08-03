import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from "./Modules/Shared/Components/AuthLayout/AuthLayout"
import Login from './Modules/Authentication/Components/Login/Login'
import Register from './Modules/Authentication/Components/Register/Register'
import Forgetpassword from './Modules/Authentication/Components/Forgetpassword/Forgetpassword'
import Resetpass from './Modules/Authentication/Components/Resetpass/Resetpass'
import MasterLayout from './Modules/Shared/Components/MasterLayout/MasterLayout'
import Home from './Modules/Home/Components/Home/Home'
import UsersList from './Modules/Users/Components/UsersList/UsersList'
import NotFound from './Modules/Shared/Components/NotFound/NotFound'
import CategoriesList from './Modules/Categories/Components/CategoriesList/CategoriesList'
import RecipiesList from './Modules/Recipies/Components/RecipiesList/RecipiesList'
import { ToastContainer } from 'react-toastify'
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgetpassword", element: <Forgetpassword /> },
        { path: "reset", element: <Resetpass /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "RecipiesList", element: <RecipiesList /> },
        { path: "CategoriesList", element:<CategoriesList/> },
        { path: "UsersList", element: <UsersList /> },
      ],
    },
  ])

  return (
    <>
    <ToastContainer />
    <RouterProvider router={routes} />
    </>
    
  )
}

export default App
