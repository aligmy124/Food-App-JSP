import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast } from 'react-toastify';
import axios from 'axios';
import { BASE_IMG_URL, BASE_USERS, USERS_URL } from '../../../../constant/Api';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
export default function UsersList() {

  //token
  const token=localStorage.getItem("token")
  //Models
  const [show, setShow] = useState(false);
  const [userId, setuserId] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setuserId(id)
    setShow(true)
  } ;
//Users
  const [usersLogged, setusersLogged] = useState([])

  //function

  const getUsers=async()=>{
    try {
      let res=await axios.get(USERS_URL.getUsers,{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(res)
      setusersLogged(res.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  //delete user
  const DeleteItem = async () => {
    try {
      let res = await axios.delete(USERS_URL.delete(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getUsers(); // Refresh the users list after deletion
      toast.success("Delete Successfully");
      handleClose(); // Close the modal after deletion
    } catch (error) {
      toast.error("Delete not Successfully");
      console.log(error);
    }
  };
  

  //useeffect
  useEffect(()=>{
    getUsers()
  },[])



  return (
    <>
    <Header
    title={"Users List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imgUrl={users}
    type={"Users"}
    />
    <div className="title d-flex justify-content-between px-3">
          <div className="title-info">
            <h2>Users Table Details</h2>
            <p>You can check all details</p>
          </div>
          <div className="btn">
            <button className='btn btn-success'>Add New Users</button>
          </div>
        </div>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Users"}/>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="border border-danger text-danger" onClick={DeleteItem}>
            Delete item
          </Button>
        </Modal.Footer>
      </Modal>



<div className='table-container p-3 text-center'>
    <table className="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {usersLogged.map((user, index) => (
                <tr key={index}>
                    <td>{user.group.name}</td>
                    <td>{user.imagePath ? <img className='img-recipe' src={`${BASE_IMG_URL}/${user.imagePath}`} alt="img" /> : <img className='img-recipe' src="/path/to/default/image.png" alt="No Data" />}</td>
                    <td>{user.country}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <Dropdown>
                      <Dropdown.Toggle variant="light" className='Dropdown_Toggle'>
                      <i className="fa-solid fa-ellipsis"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item href="#/action-1"><i style={{cursor:"pointer"}} className="fa-regular fa-eye text-success mx-3"></i>View</Dropdown.Item>
                      <Dropdown.Item href="#/action-2"><i style={{cursor:"pointer"}} className="fa-solid fa-pen-to-square text-success mx-3"></i>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleShow(user.id)}  href="#/action-3"><i style={{cursor:"pointer"}} className="fa-solid fa-trash text-success mx-3"></i>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                      </Dropdown>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


    </>
  )
}
