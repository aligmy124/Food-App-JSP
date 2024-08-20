import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_IMG_URL, BASE_USERS, USERS_URL } from '../../../../constant/Api';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import Nodate from '../../../Shared/Nodate/Nodate';
import Loading from '../../../../Loading/Loading';

export default function UsersList() {
  const token = localStorage.getItem("token")
  const nav = useNavigate()
  const [show, setShow] = useState(false);
  const [userId, setuserId] = useState(false);
  const [ArrayofPages, setArrayofPages] = useState([])
  const [searchname, setsearchname] = useState("")
  const [searchemail, setsearchemail] = useState("")
  const [searchcountry, setsearchcountry] = useState("")
  const [usersLogged, setusersLogged] = useState([])
  // loading
  const [loading, setloading] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setuserId(id)
    setShow(true)
  };

  const getUsers = async (pageNo, pagesize, username, email, country, groups) => {
    setloading(true)
    try {
        let res = await axios.get(USERS_URL.getUsers, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                pageNumber: pageNo,
                pageSize: pagesize,
                userName: username,
                email: email,
                country: country,
                groups: groups  
            }
        })
        setArrayofPages(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        console.log(res.data.data)
        setusersLogged(res.data.data)
    } catch (error) {
        console.log(error);
    }
    finally{
      setloading(false)
    }
}


  const DeleteItem = async () => {
    try {
      let res = await axios.delete(USERS_URL.delete(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUsers = usersLogged.filter(user => user.id !== userId);
      setusersLogged(updatedUsers);
      toast.success("Delete Successfully");
      handleClose();
    } catch (error) {
      toast.error("Delete not Successfully");
      handleClose();
      console.log(error);
    }
  };
  

const serachByName = (input) => {
  setsearchname(input.target.value)
  getUsers(1, 50, input.target.value, searchemail, searchcountry, [1, 2])  // إضافة المعامل groups
  setloading(false)
}

const serachByEmail = (input) => {
  setsearchemail(input.target.value)
  getUsers(1, 50, searchname, input.target.value, searchcountry, [1, 2])  // إضافة المعامل groups
  setloading(false)

}
const serachByCountry = (input) => {
  setsearchcountry(input.target.value)
  getUsers(1, 50, searchname, searchemail, input.target.value, [1, 2])  // إضافة المعامل groups
  setloading(false)

}

const serachByGroup = (input) => {
  const selectedGroups = Array.from(input.target.selectedOptions, option => option.value);
  getUsers(1, 50, searchname, searchemail, searchcountry, selectedGroups);
  setloading(false)

}


useEffect(() => {
  getUsers(1, 50, searchname, searchemail, searchcountry, [1, 2]);  // استخدام القيم المطلوبة للمجموعات
}, []);



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
          <button className='btn btn-success' onClick={() => nav("/dashboard/Add_User")}>Add New Users</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Users"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="border border-danger text-danger" onClick={DeleteItem}>
            Delete item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='table-container p-3 text-center'>
        <div className="row my-2">
    <div className="col-md-3">
        <input className="form-control mr-sm-2 my-2" style={{ height: "40px" }} type="search" placeholder="Search by name" aria-label="Search" onChange={serachByName} />
    </div>
    <div className="col-md-3">
        <input className="form-control mr-sm-2 my-2" style={{ height: "40px" }} type="email" placeholder="Search by email" aria-label="Search" onChange={serachByEmail} />
    </div>
    <div className="col-md-3">
        <input className="form-control mr-sm-2 my-2" style={{ height: "40px" }} type="text" placeholder="Search by country" aria-label="Search" onChange={serachByCountry} />
    </div>
    <div className="col-md-3">
        <select className="form-control mr-sm-2 my-2" style={{ height: "40px" }} onChange={serachByGroup}>
          <option>Select role</option>
            <option value="1">Admin</option>
            <option value="2">System User</option>
        </select>
    </div>
    </div>

    {loading&&<Loading/>}

{usersLogged.length <= 0 ? <Nodate />
  :
<div className="table-responsive ">
  {
<table>
<thead>
      <tr>
        <th>userName</th>
        <th>Role</th>
        <th>Image</th>
        <th>Country</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {usersLogged.map((user, id) => (
        <tr key={id}>
          <td>{user.userName}</td>
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
                <Dropdown.Item href="#/action-1"><i style={{ cursor: "pointer" }} className="fa-regular fa-eye text-success mx-3"></i>View</Dropdown.Item>
                {user.group.name==="SystemUser" && 
                <Dropdown.Item onClick={() => handleShow(user.id)} href="#/action-3"><i style={{ cursor: "pointer" }} className="fa-solid fa-trash text-success mx-3"></i>Delete</Dropdown.Item>
                }
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
    }
</div>
  }

  </div>
  <div className="pagination-container">
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {ArrayofPages.map((pageNo) => (
        <li key={pageNo} className="page-item" onClick={() => getUsers(pageNo, 50)}>
          <a className="page-link" href="#">{pageNo}</a>
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


  </>
  )
}
