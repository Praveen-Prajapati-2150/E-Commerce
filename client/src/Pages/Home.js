import React from 'react';
import styled from 'styled-components'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Navigation} from "swiper";
import CategoryProducts from "../components/Category";
import {Link} from 'react-router-dom'

const categories = [
  {
    src: "/assets/home/fashion.webp",
    label: "Fashion"
  }, {
    src: "/assets/home/home.webp",
    label: "Home"
  }, {
    src: "/assets/home/electronics.webp",
    label: "Electronics"
  }, {
    src: "/assets/home/appliances.webp",
    label: "Appliances"
  }, {
    src: "/assets/home/travel.webp",
    label: "Travel"
  }, {
    src: "/assets/home/beauty.webp",
    label: "Beauty"
  }, {
    src: "/assets/home/grocery.webp",
    label: "Grocery"
  },
]

const Home = () => {

  return (
    <Section>

      <Category>
        {
          categories?.map((item, index) => {
            return (
              <Box>
                <Link key={index} to={`/product/category/${item.label}`}>
                  <img src={item.src} alt={"img"}/>
                </Link>
                <label>{item.label}</label>
              </Box>
            )
          })
        }
      </Category>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={"/assets/home/car_1.webp"} alt={"car_1"}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/assets/home/car_2.webp"} alt={"car_1"}/>
        </SwiperSlide>
      </Swiper>

      {/*<CategoryProducts />*/}
      <CategoryProducts category={"Electronics"}/>
      <CategoryProducts category={"Home"}/>
      <CategoryProducts category={"Fashion"}/>


    </Section>
  );
};

export default Home;


const Section = styled.div`
  height: 100%;
  width: 100%;
  //background: lightseagreen;

  .swiper {
    width: 100%;
    height: 300px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

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
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
`

const Category = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  //background: lightseagreen;
`

const Box = styled.div`
  height: 80%;
  width: auto;
  padding: 10px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;

  a{
    text-decoration: none;
  }
  //background: lightpink;

  img {
    height: 90%;
    width: 70px;

    &:hover {
      transform: scale(1.02);
    }
  }
`