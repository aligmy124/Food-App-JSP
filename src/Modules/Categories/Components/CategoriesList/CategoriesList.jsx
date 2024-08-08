import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import axios from 'axios'
import { CATEGORY_URL } from '../../../../constant/Api'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation'
import {toast } from 'react-toastify';
import Nodate from '../../../Shared/Nodate/Nodate'
export default function CategoriesList({deleteItem}) {

  //modules
  const [show, setShow] = useState(false);
  const [Catid, setCatid] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setCatid(id)
    setShow(true)
  };

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

  const token=localStorage.getItem("token")
  const[categoryList,setcategoryList]=useState([])
  const getcategoryList= async ()=>{
    try {
      let res=await axios.get(CATEGORY_URL.getList,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setcategoryList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getcategoryList()
  },[])
  return (
    <>
<Header
    title={"Categories List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imgUrl={users}
    type={"Users"}
    />
    <div className="title d-flex justify-content-between p-3">
      <div className="title-info">
        <h2>Categories Table Details</h2>
        <p>You can check all details</p>
      </div>
      <div className="btn">
        <button className='btn btn-success'>Add New Category</button>
      </div>
    </div>

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

<div className="table-container p-3">
  {categoryList.length<0 ? <Nodate/> :
  <table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">creationDate</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {categoryList.map((CAT,index)=>(
      <tr key={index}>
      <th scope="col">{CAT.id}</th>
      <th scope="col">{CAT.name}</th>
      <th scope="col">{CAT.creationDate}</th>
      <th scope="col">
      <i className="fa-solid fa-pen-to-square text-warning mx-3"></i>
      <i onClick={()=>handleShow(CAT.id)} className="fa-solid fa-trash text-danger"></i>
      </th>
    </tr>))}

  </tbody>
</table>}

</div>

    </>
  )
}
