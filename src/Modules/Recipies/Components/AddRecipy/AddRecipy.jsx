import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { BASE_RECIPES, CATEGORY_URL, GETALLTAG, RECIPES_URL } from '../../../../constant/Api';
import { useForm } from 'react-hook-form';
export default function AddRecipy() {
    let{
        register, 
        handleSubmit,
        formState:{errors},
        }=useForm()
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
    formData.append("tagId", data.tagId);  // إزالة المسافة الزائدة هنا
    formData.append("price", data.price);  // إزالة المسافة الزائدة هنا
    formData.append("recipeImage", data.recipeImage);
    formData.append("description", data.description);  // إزالة المسافة الزائدة هنا
    formData.append("categoriesIds", data.categoriesIds);
    return formData;
  }
  

  const createRecipy=async(data)=>{
    let recipyData=appendFormdata(data)
    try {
        let res=await axios.post(RECIPES_URL.create, recipyData,
        {headers:{
            Authorization:`Bearer ${token}`
        }})
        console.log(res)
        console.log(data)
        
    } catch (error) {
        console.log(error)
        
    }
  }



  useEffect(()=>{
    getallTags()
    getcategoryList()
    },[])
  return (
    <>
    <div style={{backgroundColor:"rgba(240, 255, 239, 1)"}} className="title mx-2 my-2 px-5 d-flex justify-content-between align-items-center">
      <div className="title-info">
        <h2 style={{color:"rgba(31, 38, 62, 1)",fontSize:"24px",fontWeight:"600"}}>Fill the <span className='text-success'>Recipes</span> !</h2>
        <p style={{maxWidth:"440px",color:"rgba(31, 38, 62, 1)",fontSize:"16px"}}>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <div className="btn">
        <button onClick={()=>nav("/dashboard/RecipiesList")} className='btn btn-success'>Fill Recipes <i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
    <form className='w-75 m-auto p-5'onSubmit={handleSubmit(createRecipy)}>
    <div className="my-2 ">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='text'
          placeholder="Recipy Name"
          aria-label="name"
          aria-describedby="basic-addon1"
          {...register("name",{
            required:"name is required"
          })}
        />
      </InputGroup>
      {errors.name&&<p className='text-danger'>{errors.name.message}</p>}
    </div>

    <div className="my-2">
  <Form.Select 
    aria-label="Default select example"
    style={{backgroundColor:"rgba(217, 217, 217, 1)"}}
    {...register("tagId", {
      required: "tag is required"
    })}
  >
    <option value="">Select Tag</option>
    {tag.map((item, index) => (
      <option key={index} value={item.id}>{item.name}</option>
    ))}
  </Form.Select>
  {errors.tagId && <p className='text-danger'>{errors.tagId.message}</p>}
</div>


<div className="my-2">
        <InputGroup>
        <Form.Control
          style={{backgroundColor:"rgba(217, 217, 217, 1)",height:"48px"}}
          type='text'
          placeholder="Price"
          aria-label="price"
          aria-describedby="basic-addon3"
          {...register("price",{
            required:"price is required"
          })}
        />
      </InputGroup>
      {errors.price&&<p className='text-danger'>{errors.price.message}</p>}
    </div>

    <div className="my-2">
    <Form.Select
        {...register("categoriesIds",{
            required:"categoriesIds is required"
        })}
       aria-label="Default select example"style={{backgroundColor:"rgba(217, 217, 217, 1)"}}>
      {categoryList.map((item,index)=><option key={index} value={item.id}>{item.name}</option>)}
    </Form.Select>
    {errors.categoriesIds&&<p className='text-danger'>{errors.categoriesIds.message}</p>}
    </div>
    <div className="my-2">
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' , backgroundColor:"rgba(217, 217, 217, 1)"}}
          {...register("description",{
            required:"description is required"
          })}
        />
      </FloatingLabel>
      {errors.description&&<p className='text-danger'>{errors.description.message}</p>}
      </div>
      {/* <div className="my-3">
      <Form.Group controlId="formFile">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" 
        {...register("recipeImage",{
            required:"recipeImage is required"
        })}
        />
      </Form.Group>
      
      {errors.recipeImage&&<p className='text-danger'>{errors.recipeImage.message}</p>}
      </div> */}
      
      <Form.Group controlId="formFile" className="my-4" style={{ position: 'relative' }}>
        <Form.Label style={{
          display: 'block',
          padding: '10px',
          border: '2px dashed rgba(0, 128, 0, 0.5)',
          backgroundColor: 'rgba(217, 217, 217, 1)',
          borderRadius: '5px',
          textAlign: 'center',
          cursor: 'pointer',
          color: '#28a745',
          fontSize: '18px'
        }}>
          Drag & Drop or <span style={{ textDecoration: 'underline' }}>Choose a Item Image to Upload</span>
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

    <div className="d-flex justify-content-end mt-4">
      <button type="button" className="btn btn-outline-secondary me-3">Cancel</button>
      <button type="submit" className="btn btn-success">Save</button>
    </div>
    </form>
    </>
  )
}