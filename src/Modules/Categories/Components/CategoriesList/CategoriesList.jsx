import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import { CATEGORY_URL } from '../../../../constant/Api'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation'
import {toast } from 'react-toastify';
import Nodate from '../../../Shared/Nodate/Nodate'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import Loading from '../../../../Loading/Loading';
export default function CategoriesList({deleteItem}) {
  //loading
  const [loading, setLoading] = useState(false);
  //Register
  let{
    register, 
    handleSubmit,
    setValue,
    formState:{errors},
    }=useForm()

    //pagination
    const [arrayofPages, setarrayofPages] = useState([])

    //filter
    const [search, setsearch] = useState("")

  //modules
  const [show, setShow] = useState(false);
  const [Catid, setCatid] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setCatid(id)
    setShow(true)
  };


  // update
  const [showupdate, setShowupdate] = useState(false);
  const handleupdateClose = () => setShowupdate(false);
  const handleupdateShow = (id) =>{
    setValue("name",null)
    setCatid(id)
    setShowupdate(true)
  };


  //Model Add
  const [AddCat,setAddCat]=useState([])
  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => {
    setValue("name",null)
    setShowAdd(true)
  };


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
      toast.error("Delete not Successfully")
      handleClose()

    }

  }
  //Update
  const UpdateItem=async(data)=>{
    try {
      let res=await axios.put(CATEGORY_URL.update(Catid),data,{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(res)
      getcategoryList()
      toast.success("Update Successfully")
      handleupdateClose()
    } catch (error) {
      handleupdateClose()
    }
  }


  const token=localStorage.getItem("token")
  const[categoryList,setcategoryList]=useState([])

  //GetCategoty
  
  const getcategoryList= async (pageNo,pageSize,nameInput)=>{
    setLoading(true)
    try {
      let res=await axios.get(CATEGORY_URL.getList,{headers:{
        Authorization:`Bearer ${token}`
      },
      params:{pageNumber:pageNo,pageSize:pageSize,name:nameInput}
    })
      setarrayofPages(Array(res.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setcategoryList(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getcategoryList(1,3,"")
  },[])

  // AddCategory
  const Addcategory=async(data)=>  {
    setLoading(false)
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

  // SearchElement


  const Searchelement=(input)=>{
    setsearch(input.target.value)
    getcategoryList(1,3,input.target.value)
    setLoading(false)
  }



  return (
<>
  <Header
    title={"Categories List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imgUrl={users}
    type={"Users"}
  />

  <div className="container">
    {/* Title and Button */}
    <div className="d-flex justify-content-between align-items-center my-4 flex-column flex-md-row">
    <div className="title-info">
      <h2 className="h4">Category Table Details</h2>
      <p>You can check all details</p>
    </div>
    <button className="btn btn-success mt-3 mt-md-0" onClick={handleAddShow}>Add New Category</button>
  </div>

    {/* Models Edit */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <DeleteConfirmation deleteItem={"category"} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="border border-danger text-danger" onClick={DeletItem}>
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Models Add */}
    <Modal show={showAdd} onHide={handleAddClose}>
      <Modal.Header closeButton>Add Category</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(Addcategory)}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Category name"
              aria-label="Category"
              aria-describedby="basic-addon1"
              {...register("name", { required: "name is required" })}
            />
          </InputGroup>
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <Modal.Footer>
            <Button type="submit" className="bg-success w-100">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>

    {/* Update */}
    <Modal show={showupdate} onHide={handleupdateClose}>
      <Modal.Header closeButton>Update Category</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(UpdateItem)}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Category name"
              aria-label="Category"
              aria-describedby="basic-addon1"
              {...register("name", { required: "name is required" })}
            />
          </InputGroup>
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <Modal.Footer>
            <Button type="submit" className="bg-success w-100">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>

    {loading&&<Loading/>}

    {/* Table and Search */}
    <div className="table-responsive">
      <div className="input-search my-2">
        <input
          className="form-control"
          type="search"
          placeholder="Search here"
          aria-label="Search"
          onChange={Searchelement}
        />
      </div>
      {categoryList.length <= 0 ? (
        <Nodate />
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Modification Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((CAT, index) => (
              <tr key={index}>
                <td>{CAT.id}</td>
                <td>{CAT.name}</td>
                <td>{CAT.creationDate}</td>
                <td>{CAT.modificationDate}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" className="Dropdown_Toggle">
                      <i className="fa-solid fa-ellipsis"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <i className="fa-regular fa-eye text-success mx-3"></i>View
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleupdateShow(CAT.id)} href="#/action-2">
                        <i className="fa-solid fa-pen-to-square text-success mx-3"></i>Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShow(CAT.id)} href="#/action-3">
                        <i className="fa-solid fa-trash text-success mx-3"></i>Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    {/* Pagination */}
    <div className="pagination-container d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayofPages.map((pageNo) => (
            <li key={pageNo} className="page-item" onClick={() => getcategoryList(pageNo, 5)}>
              <a className="page-link" href="#">
                {pageNo}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</>



  )
}
