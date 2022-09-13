import React from 'react';
import styled from 'styled-components'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination, Navigation} from "swiper";
import CategoryProducts from "../components/Category";

const Home = () => {

  return (
    <Section>

      <Category>
        {
          [...Array(10)].map((item, index) => {
            return (
              <Box key={index}>
                <img src={"/assets/home/category.webp"} alt={"img"}/>
                <label>Mobiles</label>
              </Box>
            )
          })
        }

      </Category>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
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

      <CategoryProducts />
      {/*<CategoryProducts type={"Home"}/>*/}


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
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  //background: lightpink;

  img {
    height: 90%;
    width: auto;
  }
`