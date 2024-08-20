import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import "./Recipes.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import axios from 'axios';
import { BASE_IMG_URL, CATEGORY_URL, FAVOURITE_URL, GETALLTAG, RECIPES_URL } from '../../../../constant/Api';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import {toast } from 'react-toastify';
import Nodate from '../../../Shared/Nodate/Nodate';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../../Context/Authcontext';
import AddRecipy from '../AddRecipy/AddRecipy';
import Loading from '../../../../Loading/Loading';
export default function Recipieslist() {
  //usecontext
  let{loginData}=useContext(AuthContext)
  //navagite
  const nav=useNavigate()
  //usestate recipe
  const [recipy, setrecipy] = useState([])
  // //usestate delete
  const [id, setid] = useState([])
  // //token
  const token=localStorage.getItem("token")
  //tag
  const [tag, settag] = useState([])
  //pagination
  const [arrayofpages, setarrayofpages] = useState([])
  //loading
  const [loading, setLoading] = useState(false);
  //searchname
  const [searchname, setsearchname] = useState("")
  //searchname
  const [searchtagId, setsearchtagId] = useState("")
  //searchname
  const [searchCategory, setsearchCategory] = useState("")
  //modale
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setid(id)
    setShow(true)
  };
  //Tag
  const getallTags=async()=>{
    try {
        let res=await axios.get(GETALLTAG,{headers:{
            Authorization:`Bearer ${token}`
        }})
        settag(res.data)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

//Category list
  const[categoryList,setcategoryList]=useState([])
  const getcategoryList= async ()=>{
    setLoading(true)
  try {
    let res=await axios.get(CATEGORY_URL.getList,{headers:{
      Authorization:`Bearer ${token}`
    }})
    setcategoryList(res.data.data)
    console.log(res.data.data)
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false)
  }
  }

  //Function 
  const getRecipes=async(pageNo,pagesize,nameInput,tagInput,categoryInput)=>{
    try {
      let res=await axios.get(RECIPES_URL.getList,{headers:{
        Authorization:`Bearer ${token}`
      },
      params:{pageSize:pagesize,pageNumber:pageNo,name:nameInput,tagId:tagInput,categoryId:categoryInput}
    })
    setarrayofpages(Array(res.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setrecipy(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Favourite
  const AddFavourite=async(id)=>{
    try {
      let res=await axios.post(FAVOURITE_URL.addFavourite,{"recipeId":id},{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  }


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
      toast.error("Delete not Successfully")
      handleClose()

    }
  }

  // const UpdateItem=async()=>{
  //   try {
  //     let res=await axios.put(RECIPES_URL.update(id),{headers:{
  //       Authorization:`Bearer ${token}`
  //     }})
  //     getRecipes()
  //     toast.success("Delete Successfully")
  //     handleClose()
  //   } catch (error) {
  //     toast.error("Delete not Successfully")
  //     handleClose()

  //   }
  // }

  const searchNameElement=(input)=>{
    setsearchname(input.target.value)
    getRecipes(1,5,input.target.value,searchtagId,searchCategory)
  }
  const searchTagElement=(input)=>{
    setsearchtagId(input.target.value)
    getRecipes(1,5,searchname,input.target.value,searchCategory)
  }
  const searchCategoryElement=(input)=>{
    setsearchCategory(input.target.value)
    getRecipes(1,5,searchname,searchtagId,input.target.value)
  }


    // Useeffect
    useEffect(()=>{
      getRecipes(1,5,"")
      getallTags()
      getcategoryList()
    },[])

  


  return (
<>


  <Header
    title={"Recipes List"}
    description={"You can now add your items that any user can order from the Application and you can edit them."}
    imgUrl={users}
    type={"Users"}
  />

  <div className="title d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-3 my-3">
    <div className="title-info mb-3 mb-md-0">
      <h2 className="fs-4">Recipe Table Details</h2>
      <p className="fs-6 text-muted">You can check all details</p>
    </div>
    <div className="btn">
      {loginData?.userGroup !== "SystemUser" && (
        <button className='btn btn-success' onClick={() => nav("/dashboard/AddRecipy")}>Add New Recipe</button>
      )}
    </div>
  </div>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <DeleteConfirmation deleteItem={"Recipes"} />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="border border-danger text-danger" onClick={DeleteItem}>
        Delete item
      </Button>
    </Modal.Footer>
  </Modal>

  <div className="table-container p-3">
  <div className="row mb-3 justify-content-center">
    <div className="col-12 col-md-4 mb-2">
      <input
        className="form-control"
        style={{ height: "40px" }}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={searchNameElement}
      />
    </div>
    <div className="col-12 col-md-4 mb-2">
      <Form.Select aria-label="Select Tag" onClick={searchTagElement}>
        <option value="">Select Tag</option>
        {tag.map((item, index) => (
          <option key={index} value={item.id}>{item.name}</option>
        ))}
      </Form.Select>
    </div>
    <div className="col-12 col-md-4 mb-2">
      <Form.Select aria-label="Select Category" onClick={searchCategoryElement}>
        <option value="">All categories</option>
        {categoryList.map((item, index) => (
          <option key={index} value={item.id}>{item.name}</option>
        ))}
      </Form.Select>
    </div>
  </div>

  {loading&&<Loading/>}

    {recipy.length <= 0 ? <Nodate /> : (
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              {loginData?.userGroup === "SuperAdmin" && <th scope="col"></th>}
            </tr>
          </thead>
          <tbody>
            {recipy.map((RCP, index) => (
              <tr key={index}>
                <td>{RCP.name}</td>
                <td>
                  {RCP.imagePath ? (
                    <img className='img-recipe img-fluid' src={`${BASE_IMG_URL}/${RCP.imagePath}`} alt="Recipe" />
                  ) : (
                    <img className='img-recipe img-fluid' src="/path/to/default/image.png" alt="No Data" />
                  )}
                </td>
                <td>{RCP.price}</td>
                <td>{RCP.description}</td>
                <td>{RCP.tag.name}</td>
                {loginData?.userGroup==="SuperAdmin"? 
                <td>
                <Dropdown>
                  <Dropdown.Toggle variant="light" className='Dropdown_Toggle'>
                    <i className="fa-solid fa-ellipsis"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="#/action-1">
                      <i className="fa-regular fa-eye text-success mx-2"></i>View
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/dashboard/Recipy_edit/${RCP.id}`} state={{ AddRecipy: RCP, type: "edit" }}>
                      <i className="fa-regular fa-edit text-success mx-2"></i>Update
                    </Dropdown.Item>

                    {loginData?.userGroup !== "SystemUser" && (
                      <Dropdown.Item onClick={() => handleShow(RCP.id)} href="#/action-3">
                        <i className="fa-solid fa-trash text-success mx-2"></i>Delete
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              :
              <td>
                <i className="fa-solid fa-heart text-danger"onClick={()=>AddFavourite(RCP.id)}></i>
              </td>
                }

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <div className="pagination-container mt-3">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {arrayofpages.map((pageNo) => (
          <li key={pageNo} className="page-item" onClick={() => getRecipes(pageNo, 3)}>
            <a className="page-link" href="#">{pageNo}</a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</>


  )
}
