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
import { useState } from 'react'
import {jwtDecode} from "jwt-decode"
import Protectedroutes from "./Modules/Shared/Components/Protectedroutes/Protectedroutes"
function App() {

  const[loginData,setloginData]=useState(null);
  const saveLoginData=()=>{
    const enodeedToken=localStorage.getItem("token")
    const decodedToken=jwtDecode(enodeedToken)
    setloginData(decodedToken)
  }



  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "forget-password", element: <Forgetpassword /> },
        { path: "reset-password", element: <Resetpass /> },
      ],
    },
    {
      path: "dashboard",
      element:
      <Protectedroutes>
        <MasterLayout loginDate={loginData} />
      </Protectedroutes>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home/> },
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
