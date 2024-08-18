import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
import axios from 'axios'
import { BASE_IMG_URL, FAVOURITE_URL } from '../../../../constant/Api'
import Nodate from '../../../Shared/Nodate/Nodate'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify'
export default function Favourite() {

  const [favouriteList, setfavouriteList] = useState([])
  const [removefavourit, setremovefavourit] = useState([])
  //token
  const token=localStorage.getItem("token")
  //getList
  const getFavouriteList=async()=>{
    try {
        let res=await axios.get(FAVOURITE_URL.getList,{headers:{
            Authorization:`Bearer ${token}`
        }})
        console.log(res.data.data)
        setfavouriteList(res.data.data)
        
    } catch (error) {
        console.log(error)
    }
  }

  //Remove

  const RemoveCard=async(id)=>{
    try {
        let res=await axios.delete(FAVOURITE_URL.remove(id),{headers:{
            Authorization:`Bearer ${token}`
        }})
        getFavouriteList()
        toast.success("Delete Successfully")
    } catch (error) {
        console.log(error)
        toast.error("Delete not Successfully")
    }
  }

  //useeffect
  useEffect(() => {
    getFavouriteList()

  }, [])
  


  return (
    <>
    <Header
      title={"Favourite List"}
      description={"You can now add your items that any user can order it from the Application and you can edit"}
      imgUrl={users}
      type={"Users"}
    />
  
    {favouriteList.length <= 0 ? (
      <Nodate />
    ) : (
      <div className="container">
        <div className="row">
          {favouriteList.map((item, id) => (
            <div key={id} className="col-lg-4 col-md-6 col-sm-12 my-3">
              <Card style={{ width: '100%' }}>
                <Card.Img
                  variant="top"
                  src={`${BASE_IMG_URL}/${item.recipe.imagePath}`}
                  alt="img"
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title>{item.recipe.name}</Card.Title>
                  <Card.Text>{item.recipe.description}</Card.Text>
                  <Button variant="primary" onClick={() => RemoveCard(item.id)}>Remove</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
  
  )
}
