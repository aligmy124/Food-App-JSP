import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import { BASE_CATEGORY, CATEGORY_URL } from '../../../../constant/Api'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation'
import {toast } from 'react-toastify';
import Nodate from '../../../Shared/Nodate/Nodate'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
export default function CategoriesList({deleteItem}) {

  //Register
  let{
    register, 
    handleSubmit,
    formState:{errors},
    }=useForm()

  //modules
  const [show, setShow] = useState(false);
  const [Catid, setCatid] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setCatid(id)
    setShow(true)
  };
  //Model Add
  const [AddCat,setAddCat]=useState([])
  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);


  //Delete
  const DeletItem=async ()=>{
    try {
      let res=await axios.delete(CATEGORY_URL.delete(Catid),{headers:{
        Authorization:`Bearer ${token}`
      }})
      getcategoryList()
      toast.success("Delete Successfully")
      handleClose()
    } catch (error) {
      toast.success("Delete not Successfully")
    }

  }

  //Update
  const UpdateData=async(id)=>{
    try {
      let res=await axios.get(CATEGORY_URL.update,{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const token=localStorage.getItem("token")
  const[categoryList,setcategoryList]=useState([])

  //GetCategoty
  
  const getcategoryList= async ()=>{
    try {
      let res=await axios.get(CATEGORY_URL.getList,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setcategoryList(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getcategoryList()
  },[])

  // AddCategory
  const Addcategory=async(data)=>{
    try {
      let res=await axios.post(CATEGORY_URL.create,data,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setAddCat(res)
      handleAddClose()
      getcategoryList()
      toast.success("Add Successfully")
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <>
<Header
    title={"Categories List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imgUrl={users}
    type={"Users"}
    // name={"Categories"}
    // add={"category"}
    />

    <div className="title d-flex justify-content-between px-3">
          <div className="title-info">
            <h2>Category Table Details</h2>
            <p>You can check all details</p>
          </div>
          <div className="btn">
            <button className='btn btn-success'onClick={handleAddShow}>Add New Category</button>
          </div>
        </div>

    {/* Models Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"category"}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="border border-danger text-danger" onClick={DeletItem}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* models Add */}

      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          Add Category
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(Addcategory)}>
        <InputGroup>
        <Form.Control
          type='text'
          placeholder="Category name"
          aria-label="Category"
          aria-describedby="basic-addon1"
          {...register("name",{required:"name is required"})}
        />     
      </InputGroup>
      {errors.name&&<p className='text-danger'>{errors.name.message}</p>}   
      <Modal.Footer>
          <Button type='submit' className='bg-success' onClick={Addcategory}>
            Save
          </Button>
        </Modal.Footer>
          </form>

        </Modal.Body>

      </Modal>




<div className="table-container p-3">
  {categoryList.length<=0 ? <Nodate/> :
  <table className="table">
  <thead >
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">creationDate</th>
      <th scope="col">modificationDate</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {categoryList.map((CAT,index)=>(
      <tr key={index}>
      <th scope="col">{CAT.id}</th>
      <th scope="col">{CAT.name}</th>
      <th scope="col">{CAT.creationDate}</th>
      <th scope="col">{CAT.modificationDate}</th>
      <th scope="col">
      <Dropdown>
      <Dropdown.Toggle variant="light" className='Dropdown_Toggle'>
      <i className="fa-solid fa-ellipsis"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item href="#/action-1"><i style={{cursor:"pointer"}} className="fa-regular fa-eye text-success mx-3"></i>View</Dropdown.Item>
        <Dropdown.Item href="#/action-2"><i style={{cursor:"pointer"}} className="fa-solid fa-pen-to-square text-success mx-3"></i>Edit</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleShow(CAT.id)}  href="#/action-3"><i style={{cursor:"pointer"}} className="fa-solid fa-trash text-success mx-3"></i>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </th>
    </tr>))}

  </tbody>
</table>}

</div>

    </>
  )
}
