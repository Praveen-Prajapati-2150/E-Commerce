import React, {useEffect} from 'react';
import styled from 'styled-components'
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Navigation} from "swiper";
import {Button} from "./styles/Button.styled";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../redux/featuers/productSlice";
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + " ...";
  }
  return str;
};


const Category = ({category}) => {
  const {products, loading, error} = useSelector((state) => ({...state.product}))
  const dispatch = useDispatch()

  console.log("products", products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    // toast.error(`${error}`)
    console.log(error)
  }, [error])

  return (
    <CategoryList>
      <div className={"container"}>
        <div className={"heading"}>
          <div>
            <h2>Best of {category}</h2>
            <p>Best of {category}</p>
          </div>
          <div>
            <Link to={`/product/category/${category}`}>
              <Button>View All</Button>
            </Link>
          </div>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >

          {
            products?.map((prod, index) => {
                if (loading) return null
                if (prod.category === category)
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
                          <h4>From ₹{prod.price}</h4>
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

      </div>
    </CategoryList>
  );
};

export default Category;


const CategoryList = styled.div`
  //height: 300px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
  //background-color: #d95454;
  margin: 30px 0;
  border-radius: 2px;

  //box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #dbdbdb,
      -2px -2px 5px #ffffff;

    .heading {
      height: 20%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      padding: 15px 25px;
      border-bottom: 1px solid #dedede;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      //box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

      p {
        color: #8f8f8f;
      }

      h2 {
        font-weight: 600;
      }
    }

    .swiper {
      width: 100%;
      height: 80%;
      background-color: #ffffff;
      padding: 20px 20px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

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
  //background-color: lightpink;
  text-decoration: none;
  //margin: 5px 5px 0 0;

  .image {
    //height: auto;
    //max-width: 300px;
    max-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: lightgreen;

    img {
      //max-width: 90px;
      width: auto;
      max-height: 200px;
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
    font-size: 0.9rem;
    color: #5db45d;
    font-weight: 400;
    padding: 5px 0 0 0;
  }

  label {
    font-size: 0.9rem;
    color: #a2a2a2;
    padding: 5px 0 0 0;
  }


`