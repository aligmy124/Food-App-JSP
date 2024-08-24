import React, { useCallback, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { CATEGORY_URL, GETALLTAG, RECIPES_URL } from '../../../../constant/Api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { json, useLocation, useNavigate } from 'react-router-dom';
import UsebeforunLoad from '../../../../Hooks/UsebeforunLoad';
export default function AddRecipy() {
  //nav
  const nav=useNavigate()
    let{
        register, 
        handleSubmit,
        getValues,
        reset,
        formState:{errors},
        }=useForm()
    //Location
    const location=useLocation()
    const status=location.state?.type==="edit"
    const recipeData=location.state?.AddRecipy
    console.log(location)

    //Update

    const [Tagid, setTagid] = useState("")
    const [categoryId, setcategoryId] = useState("")

    //token
    const token=localStorage.getItem("token")
    //usestate
    const [tag, settag] = useState([])
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

    //GetCategoty
    const[categoryList,setcategoryList]=useState([])
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

  // Append
const appendFormdata = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId); 
    formData.append("price", data.price);  
    formData.append("recipeImage", data.recipeImage[0]);
    formData.append("description", data.description);  
    formData.append("categoriesIds", data.categoriesIds);
    return formData;
  }
  

  const createRecipy=async(data)=>{
    let recipyData=appendFormdata(data)
    try {
        let res=await axios(
          {
            method:status?"put":"post",
            url:status?RECIPES_URL.update(recipeData.id):RECIPES_URL.create,data:recipyData,headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )
        console.log(res)
        console.log(data)
        toast.success("Add successfully")
        nav("/dashboard/RecipiesList")
    } catch (error) {
        console.log(error)
        toast.error("Add not successfully")
        
    }
  }
  useEffect(()=>{
    const orderCategory=async()=>{
      await getallTags()
      await getcategoryList()
      const storedData=JSON.parse(localStorage.getItem("recipy-data"))
      await reset(storedData)
    }
    orderCategory()

    if(status&&recipeData){
      setTagid(recipeData.tag.id)
      setcategoryId(recipeData.category[0].id)
    }
    },[])

    const beforeunLoad=useCallback(()=>{
      localStorage.setItem("recipy-data",JSON.stringify(getValues()))
    })
    UsebeforunLoad(beforeunLoad)




  return (
<>
  <div style={{backgroundColor:"rgba(240, 255, 239, 1)"}} className="title mx-2 my-2 px-3 px-md-5 d-flex flex-column flex-md-row justify-content-between align-items-center">
    <div className="title-info">
      <h2 className="text-dark font-weight-bold fs-4 fs-md-3">Fill the <span className='text-success'>Recipes</span>!</h2>
      <p onClick={() => nav()} className="text-dark fs-6 fs-md-5">You can now fill the meals easily using the table and form. Click here and fill it with the table!</p>
    </div>
    <div className="btn mt-3 mt-md-0">
      <button className='btn btn-success'>Fill Recipes <i className="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>

  <form className='container w-75 mx-auto p-3 p-md-5' onSubmit={handleSubmit(createRecipy)}>
  <div className="mb-3">
  <InputGroup>
    <Form.Control
      style={{ backgroundColor: "#f8f9fa" }}
      type="text"
      placeholder="Recipe Name"
      aria-label="name"
      aria-describedby="basic-addon1"
      {...register("name", {
        required: "Name is required"
      })}
      defaultValue={status ? recipeData.name : ""}
    />
  </InputGroup>
  {errors.name && <p className="text-danger">{errors.name.message}</p>}
</div>
    <div className="mb-3">
      <Form.Select
        aria-label="Default select example"
        style={{backgroundColor:"#f8f9fa"}}
        {...register("tagId", {
          required: "Tag is required"
        })}
        value={Tagid}
        onChange={(e)=>setTagid(e.target.value)}
      >
        <option value="">Select Tag</option>
        {tag.map((item, index) => (
          <option key={index} value={item.id}>{item.name}</option>
        ))}
      </Form.Select>
      {errors.tagId && <p className='text-danger'>{errors.tagId.message}</p>}
    </div>

    <div className="mb-3">
      <InputGroup>
        <Form.Control
          style={{backgroundColor:"#f8f9fa"}}
          type='text'
          placeholder="Price"
          aria-label="price"
          aria-describedby="basic-addon3"
          {...register("price", {
            required: "Price is required"
          })}
          defaultValue={status?recipeData.price:""}
        />
      </InputGroup>
      {errors.price && <p className='text-danger'>{errors.price.message}</p>}
    </div>

    <div className="mb-3">
      <Form.Select
        {...register("categoriesIds", {
          required: "Categories are required"
        })}
        value={categoryId}
        onChange={(e)=>setcategoryId(e.target.value)}

        aria-label="Default select example"
        style={{backgroundColor:"#f8f9fa"}}
      >
        {categoryList.map((item, index) => (
          <option key={index} value={item.id}>{item.name}</option>
        ))}
      </Form.Select>
      {errors.categoriesIds && <p className='text-danger'>{errors.categoriesIds.message}</p>}
    </div>

    <div className="mb-3">
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{height: '100px', backgroundColor:"#f8f9fa"}}
          {...register("description", {
            required: "Description is required"
          })}
          defaultValue={status?recipeData.description:""}
        />
      </FloatingLabel>
      {errors.description && <p className='text-danger'>{errors.description.message}</p>}
    </div>

    <Form.Group controlId="formFile" className="my-4" style={{position: 'relative'}}>
      <Form.Label style={{
        display: 'block',
        padding: '10px',
        border: '2px dashed rgba(0, 128, 0, 0.5)',
        backgroundColor: 'rgba(240, 255, 239, 1)',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#28a745',
        fontSize: '18px'
      }}>
        Drag & Drop or <span style={{textDecoration: 'underline'}}>Choose an Item Image to Upload</span>
        <Form.Control type="file" {...register("recipeImage", {
          required: "Image is required"
        })} style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer'
        }} />
      </Form.Label>
      {errors.recipeImage && <p className='text-danger'>{errors.recipeImage.message}</p>}
    </Form.Group>

    <div className="d-flex flex-column flex-md-row justify-content-md-end mt-4">
      <button onClick={() => {
        nav(-1);
        localStorage.removeItem("recipy-data")
      }} type="button" className="btn btn-outline-success me-md-3 mb-3 mb-md-0">Cancel</button>
      <button type="submit" className="btn btn-success">Save</button>
    </div>
  </form>
</>

  )
}