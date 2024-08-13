import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import "./Recipes.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import axios from 'axios';
import { BASE_IMG_URL, RECIPES_URL } from '../../../../constant/Api';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import {toast } from 'react-toastify';
import Nodate from '../../../Shared/Nodate/Nodate';
import { useNavigate } from 'react-router-dom';
export default function Recipieslist() {
  //navagite
  const nav=useNavigate()
  //usestate recipe
  const [recipy, setrecipy] = useState([])
  // //usestate delete
  const [id, setid] = useState([])
  // //token
  const token=localStorage.getItem("token")
  //modale
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setid(id)
    setShow(true)
  };

  //Function 
  const getRecipes=async()=>{
    try {
      let res=await axios.get(RECIPES_URL.getList,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setrecipy(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Useeffect
  useEffect(()=>{
    getRecipes()
  },[])

  //Delete function
  const DeleteItem=async()=>{
    try {
      let res=await axios.delete(RECIPES_URL.delete(id),{headers:{
        Authorization:`Bearer ${token}`
      }})
      getRecipes()
      toast.success("Delete Successfully")
      handleClose()
    } catch (error) {
      toast.success("Delete not Successfully")
    }
  }

  


  return (
    <>
    <Header
    title={"Recipes List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imgUrl={users}
    type={"Users"}
    name={"Recipes"}
    add={"recipy"}
    />
    <div className="title d-flex justify-content-between px-3">
          <div className="title-info">
            <h2>Recipy Table Details</h2>
            <p>You can check all details</p>
          </div>
          <div className="btn">
            <button className='btn btn-success'onClick={()=>nav("/dashboard/AddRecipy")}>Add New Recipy</button>
          </div>
        </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Recipes"}/>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="border border-danger text-danger" onClick={DeleteItem}>
            Delete item
          </Button>
        </Modal.Footer>
      </Modal>


<div className="table-container p-3">
  {recipy.length<=0 ? <Nodate/> :
  <Table className="table" >
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">imagePath</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Tag</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {recipy.map((RCP,index)=>(
      <tr key={index}>
      <th scope="col">{RCP.name}</th>
      <th scope="col">{RCP.imagePath?<img className='img-recipe' src={`${BASE_IMG_URL}/${RCP.imagePath}`} alt="img" />: <img className='img-recipe' src="/path/to/default/image.png" alt="No Data" />}</th>
      <th scope="col">{RCP.price}</th>
      <th scope="col">{RCP.description}</th>
      <th scope="col">{RCP.tag.name}</th>

      <th scope="col">
      <Dropdown>
      <Dropdown.Toggle variant="light" className='Dropdown_Toggle'>
      <i className="fa-solid fa-ellipsis"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item href="#/action-1"><i style={{cursor:"pointer"}} className="fa-regular fa-eye text-success mx-3"></i>View</Dropdown.Item>
        <Dropdown.Item href="#/action-2"><i style={{cursor:"pointer"}} className="fa-solid fa-pen-to-square text-success mx-3"></i>Edit</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleShow(RCP.id)}  href="#/action-3"><i style={{cursor:"pointer"}} className="fa-solid fa-trash text-success mx-3"></i>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </th>
    </tr>))}
  </tbody>
</Table>}


</div>
</>
  )
}
