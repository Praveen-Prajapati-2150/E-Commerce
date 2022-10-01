import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {getProduct, getRelatedProducts} from "../redux/featuers/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaShoppingCart} from 'react-icons/fa'
import {GiElectric} from 'react-icons/gi'
import styled from 'styled-components'
import {AiFillStar} from 'react-icons/ai'
import {MdLabel} from 'react-icons/md'
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {addToCart} from "../redux/featuers/cartSlice";


const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + " ...";
  }
  return str;
};

const SingleProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams();
  const {user} = useSelector((state) => ({...state.auth}))
  const {product, relatedProducts, loading} = useSelector((state) => ({...state.product}))
  const [category, setCategory] = useState(product.category)
  const [productDetails, setProductDetails] = useState({
    id: "",
    quantity: 1,
    price: 0,
  })
  const [userId, setUserId] = useState("")
  const user_ = JSON.parse(localStorage.getItem("profile"))


  useEffect(() => {
    if (id) {
      dispatch(getProduct(id))
    }
  }, [id])

  useEffect(() => {
    setCategory(product.category)
  }, [product])

  useEffect(() => {
    dispatch(getRelatedProducts(category))
    productDetails.id = product._id
    productDetails.price = Number(product.price)
    if (user_) {
      setUserId(user_.result._id)
    }
    if (user) {
      setUserId(user.result._id)
    }
  }, [category, id, product])

  // console.log(userId)
  // console.log("productDetails", productDetails)
  // console.log("cart", cart)
  console.log("relatedProducts", relatedProducts)
  console.log("relatedProducts.length", relatedProducts.length)

  function AddToCart() {
    // dispatch(addProductToCart({userId, productDetails, toast}))
    console.log("add to cart called")
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      imageFile: product.imageFile,
      price: product.price,
      description: product.description
    }))
  }


  return (
    <Main>
      <div className={"left_div"}>
        <div className={"image"}>
          {
            product.imageFile ?
              <img src={process.env.REACT_APP_IMAGE_PATH + product.imageFile} alt={"prod"}/>
              :
              <img src={"/assets/product/no__product.png"} alt={"prod"}/>
          }
        </div>
        <div className={"buttons"}>
          <button onClick={() => {
            AddToCart()
          }}><FaShoppingCart className={"icon"}/> ADD TO CART
          </button>
          <button
            onClick={() => {
              AddToCart()
              navigate("/cart")
            }}
          ><GiElectric className={"icon1"}/> BUY NOW
          </button>
        </div>
      </div>

      <div className={"right_div"}>
        <>
          <p className={"title"}>{product.title}</p>
          <button>4.4 <AiFillStar className={"icon"}/></button>

          <div className={"price"}>
            <h4>₹{product.price}</h4>
            <h5>₹{Math.round(Number(product.price) + Number(product.price * 11.1 / 100))}</h5>
            <h6>10% off</h6>
          </div>

          <div className={"offers"}>
            <h1>Available Offer</h1>
            <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Bank Offer </span>5% Cashback on
              Flipkart
              Axis Bank CardT&</p>
            </div>
            <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Partner Offer </span>Buy this product
              and
              get upto ₹500 off on
              Flipkart
              FurnitureKnow More</p></div>
            <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Partner Offer </span>Purchase this
              product &
              win a surprise
              cashback
              coupon for The Big Billion Days Sale 2022Know More</p></div>
            <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Partner Offer </span>Sign up for
              Flipkart
              Pay Later and get
              Flipkart
              Gift Card worth upto ₹1000*Know More</p></div>
          </div>

          <p className={"warranty"}>3 Years Warranty</p>
          <div className={"description"}>
            <p>Description</p>
            <p className={"description_"}>{product.description}</p>
          </div>

        </>

        {
          relatedProducts.length !== 0 ?
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {
                relatedProducts?.map((prod, index) => {
                    if (loading) return <h3>loading</h3>
                    return (
                      <SwiperSlide key={index}>
                        <Link to={`/product/${prod._id}`}>
                          <Product>
                            <div className={"image"}>
                              {
                                prod.imageFile ?
                                  <img src={process.env.REACT_APP_IMAGE_PATH + prod.imageFile} alt={"prod"}/>
                                  :
                                  <img src={"/assets/product/no__product.png"} alt={"prod"}/>
                              }
                            </div>
                            <h3>{excerpt(prod.title, 20)}</h3>
                            <h4>From ₹{Math.round(prod.price)}</h4>
                            <label>
                              {excerpt(prod.description, 25)}
                            </label>
                          </Product>
                        </Link>
                      </SwiperSlide>
                    )
                  }
                )

              }

            </Swiper>
            :
            null
        }

      </div>


    </Main>
  );
};

export default SingleProduct;


const Main = styled.div`
  width: 100%;
  display: flex;
  padding: 0 5% 5% 5%;

  .left_div {
    width: 45%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2% 0;

    .image {
      width: 500px;
      height: 450px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      //background-color: lightgray;

      img {
        //width: auto;
        //max-width: 450px;
        //height: 400px;
        height: auto;
        width: auto;
        //width: 300px;
        //height: 500px;
        //height: 500px;
      }
    }

    .buttons {
      //width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5% 0 5% 0;
      width: 70%;

      button {
        width: 48%;
        background-color: #ff8306;
        padding: 20px 0;
        outline: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 1.2rem;
        cursor: pointer;

        .icon {
          height: 20px;
          width: 20px;
          margin: 0 10px 0 0;
        }

        .icon1 {
          height: 20px;
          width: 20px;
          margin: 0 10px 0 0;
        }

        &:nth-child(1) {
          background-color: #ffd006;
        }

        &:hover {
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .right_div {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: #ffffff;
    padding: 2% 2% 0 0;
    //background-color: lightpink;

    //overflow-y: scroll;

    .title {
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .description {
      display: flex;
      align-items: flex-start;
      padding: 20px 0 0 0;

      p {
        font-size: 1.2rem;
        font-weight: 500;
        color: darkgray;
      }

      .description_ {
        color: black;
        padding-left: 20px;
        font-size: 1rem;
        font-weight: 400;
      }
    }


    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 6px;
      border: none;
      outline: none;
      background-color: green;
      color: white;
      border-radius: 4px;
      margin: 10px 0 0 0;
      font-size: 1rem;

      .icon {
        margin: 0 0 0 5px;
        color: yellow;
      }
    }

    .price {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 8px 0;

      h4 {
        font-size: 1.7rem;
        font-weight: 550;
      }

      h5 {
        font-size: 1.2rem;
        padding-left: 5px;
        text-decoration: line-through;
        color: darkgrey;
        font-weight: 500;
      }

      h6 {
        font-size: 1rem;
        padding-left: 5px;
        color: #008f00;
      }
    }

    .offers {
      padding-top: 8px;
      //background-color: lightgreen;

      h1 {
        font-size: 1.2rem;
        padding: 0 0 5px 0;
        display: flex;
        align-items: center;
        font-weight: 600;
        color: #3a3a3a;
      }

      .offer__p {
        display: flex;
        align-items: flex-start;

        .icon {
          width: 20px;
          height: 15px;
          color: green;
          margin: 5px 0 0 0;
        }

        p {
          font-size: 1.05rem;
          padding: 0 0 0 5px;
          //white-space: nowrap;

          span {
            font-weight: 600;
          }
        }
      }
    }

    .warranty {
      font-size: 1.2rem;
      padding: 10px 0 0 0;
      font-weight: 600;
    }

    .swiper {
      width: 100%;
      height: 80%;
      background-color: #ffffff;
      margin: 30px 0 0 0;
      padding: 20px 10px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        text-decoration: none;
        //width: 300px;
        //background: #345be0;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

        a {
          text-decoration: none;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          text-decoration: none;
          //background-color: green;
        }
      }
    }

  }
`

const Product = styled.div`
  //padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  //background-color: lightpink;

  .image {
    //height: auto;
    max-width: 300px;
    max-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: lightgreen;

    img {
      max-width: 300px;
      max-height: 200px;
      //width: 100%;
      //height: 100%;
    }

    &:hover {
      transform: scale(1.015);
    }
  }

  h3, h4, label {
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    color: black;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    padding: 10px 0 0 0;
    text-decoration: none;
  }

  h4 {
    font-size: 1.1rem;
    color: #4b8f4b;
    font-weight: 400;
    padding: 5px 0 0 0;
  }

  label {
    font-size: 0.9rem;
    color: #a2a2a2;
    padding: 5px 0 0 0;
  }
`
