import React, {useEffect} from 'react';
import {Box, Button, CenterDiv, Heading} from "../components/styles/Auth.styled";
import {Input} from "../components/styles/Input.styled";
import LoadingSpinner from "../components/styles/LoadingSpinner";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {useState} from "react";
import {createProduct, updateProduct} from "../redux/featuers/productSlice";
import {toast} from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, userProducts} = useSelector((state) => ({...state.product}))
  const {user} = useSelector((state) => ({...state.auth}))
  const userId = user?.result?._id;
  const path = useLocation().pathname

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageFile: ""
  })

  console.log(productData)

  const [title, setTitle] = useState("dummy text")
  const [description, setDescription] = useState("dummy text dummy text dummy text")
  const [price, setPrice] = useState(123)
  const [category, setCategory] = useState("Home")
  const [imageFile, setImageFile] = useState(null)

  const {id} = useParams()

  // console.log({title, description, price, imageFile})

  useEffect(() => {
    if (path !== "/dashboard/add_product") {
      setTitle(productData.title)
      setDescription(productData.description)
      setPrice(productData.price)
      setCategory(productData.category)
      // setImageFile(productData.imageFile)
    }
  }, [productData])


  useEffect(() => {
    if (id) {
      const singleProduct = userProducts.find((product) => product._id === id)
      console.log("singleProduct", singleProduct)
      setProductData({...singleProduct})
    }
  }, [id])

  const imageUpload = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    console.log("called")
    e.preventDefault()
    if (title && description && price && category) {
      const formValue = new FormData();
      if (imageFile) {
        formValue.append('imageFile', imageFile, imageFile.name)
      }
      // {imageFile && formValue.append('imageFile', imageFile, imageFile.name)}
      formValue.append('title', title)
      formValue.append('description', description)
      formValue.append('price', price)
      formValue.append('category', category)
      formValue.append('creator', userId)

      if (!id) {
        dispatch(createProduct({formValue, toast, navigate}))
      } else {
        console.log("update")
        dispatch(updateProduct({id, formValue, toast, navigate}))
      }

      for (let pair of formValue.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
    }
  }

  return (
    <Box>
      <Heading>{id ? "Update Product" : "Add Product"}</Heading>

      <label>Title</label>
      <Input type={"text"} value={title} label={"title"} name={"title"} onChange={(e) => setTitle(e.target.value)}
             placeholder={"enter your username"}/>

      <label>Description</label>
      <Input type={"text"} value={description} name={"description"} onChange={(e) => setDescription(e.target.value)}
             placeholder={"enter your username"}/>

      <label>Price</label>
      <Input type={"number"} value={price} name={"price"} onChange={(e) => setPrice(e.target.value)}
             placeholder={"enter your username"}/>

      <label>Category</label>
      <select value={category} name={"category"} onChange={(e) => setCategory(e.target.value)}>
        <option selected disabled>Category</option>
        <option value={"Grocery"}>Grocery</option>
        <option value={"Mobiles"}>Mobiles</option>
        <option value={"Fashion"}>Fashion</option>
        <option value={"Electronics"}>Electronics</option>
        <option value={"Home"}>Home</option>
        <option value={"Appliances"}>Appliances</option>
        <option value={"Travel"}>Travel</option>
        <option value={"Beauty"}>Beauty</option>
      </select>


      <label>ImageFile</label>
      <Input type={"file"} name={"imageFile"} onChange={imageUpload}/>

      <CenterDiv>
        <Button onClick={handleSubmit}>
          {
            id ?
              <>{loading ? <LoadingSpinner/> : "Update Product"}</>
              :
              <>{loading ? <LoadingSpinner/> : "Add Product"}</>
          }
        </Button>
      </CenterDiv>

    </Box>

  );
};

export default AddProduct;