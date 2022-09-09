import React, {useEffect} from 'react';
import styled from 'styled-components'
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Navigation} from "swiper";
import {Button} from "./styles/Button.styled";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../redux/featuers/productSlice";
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'


const CategoryList = styled.div`
  //height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 10px;
  background-color: #fff;
  //background-color: #e58c8c;
  margin: 20px 0;
  border-radius: 2px;

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  .heading {
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    padding: 15px 25px;
    border-bottom: 1px solid #dedede;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

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
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

    .swiper-slide {
      text-align: center;
      font-size: 18px;
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

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        //background-color: green;
      }
    }
  }




`
const Product = styled.div`
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //background-color: lightpink;

  .image {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: lightgreen;

    &:hover {
      transform: scale(1.02);
    }
  }

  h3, h4, label {
    text-align: center;
    white-space: nowrap;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    padding: 10px 0 0 0;
  }

  h4 {
    font-size: 1.1rem;
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

const Category = () => {
  const {products, loading, error} = useSelector((state) => ({...state.product}))
  const dispatch = useDispatch()

  console.log("products", products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    toast.error(`${error}`)
    console.log(error)
  }, [error])

  return (
    <CategoryList>

      <div className={"heading"}>
        <div>
          <h2>Best of Electronics</h2>
          <p>Best of Electronics</p>
        </div>
        <div>
          <Link to={'/product/Best_of_Electronics'}>
            <Button>View All</Button>
          </Link>
        </div>
      </div>

      <Swiper
        slidesPerView={6.5}
        spaceBetween={20}
        pagination={{
          // clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >

        {
          products?.map((prod, index) => {
              if (loading) return <h3>loading</h3>
              return (
                <SwiperSlide key={index}>
                  <Product>
                    <div className={"image"}>
                      {
                        prod.imageFile ?
                          <img src={process.env.REACT_APP_IMAGE_PATH + prod.imageFile} alt={"prod"}/>
                          :
                          <img src={"/assets/product/no__product.png"} alt={"prod"}/>
                      }
                    </div>
                    <h3>{prod.title}</h3>
                    <h4>From {prod.price}</h4>
                    <label>{prod.description}</label>
                  </Product>
                </SwiperSlide>
              )
            }
          )
        }

      </Swiper>

    </CategoryList>
  );
};

export default Category;
