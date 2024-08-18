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
import Protectedroutes from "./Modules/Shared/Components/Protectedroutes/Protectedroutes"
import AddRecipy from './Modules/Recipies/Components/AddRecipy/AddRecipy'
import Verfiy_register from './Modules/Authentication/Components/VerfiyCode/Verfiy_register'
import AddUsers from './Modules/Users/Components/AddUsers/AddUsers'
import Favourite from './Modules/Recipies/Components/Favourite/Favourite'
function App() {

  
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login  /> },
        { path: "register", element: <Register /> },
        { path: "Verfiy_register", element: <Verfiy_register /> },
        { path: "login", element: <Login /> },
        { path: "forget-password", element: <Forgetpassword /> },
        { path: "reset-password", element: <Resetpass /> },
      ],
    },
    {
      path: "dashboard",
      element:
      <Protectedroutes>
        <MasterLayout/>
      </Protectedroutes>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home/> },
        { path: "RecipiesList", element: <RecipiesList /> },
        { path: "AddRecipy", element: <AddRecipy /> },
        { path: "CategoriesList", element:<CategoriesList/> },
        { path: "UsersList", element: <UsersList /> },
        { path: "Add_User", element: <AddUsers /> },
        { path: "Favourite", element: <Favourite/> },
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
