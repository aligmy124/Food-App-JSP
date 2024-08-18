import Header from '../../../Shared/Components/Header/Header'
import freepik from "../../../../assets/img/freepik.png"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../../Context/Authcontext'
export default function Home() {
  let {loginData}=useContext(AuthContext)
  const nav=useNavigate()
  return (
    <>
    <Header 
    title={`welcome ${loginData?.userName}`}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    imgUrl={freepik}
    type={"home"}
    />
    <div style={{backgroundColor:"rgba(240, 255, 239, 1)"}} className="title mx-2 px-5 d-flex justify-content-between align-items-center">
      <div className="title-info">
        <h2 style={{color:"rgba(31, 38, 62, 1)",fontSize:"24px",fontWeight:"600"}}>Fill the <span className='text-success'>Recipes</span> !</h2>
        <p style={{maxWidth:"440px",color:"rgba(31, 38, 62, 1)",fontSize:"16px"}}>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <div className="btn">
        <button onClick={()=>nav("/dashboard/AddRecipy")} className='btn btn-success'>Fill Recipes <i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
    </>
  )
}
