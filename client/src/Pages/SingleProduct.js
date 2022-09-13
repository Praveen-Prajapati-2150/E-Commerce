import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {getProduct} from "../redux/featuers/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaShoppingCart} from 'react-icons/fa'
import {FcElectricity} from 'react-icons/fc'
import {GiElectric} from 'react-icons/gi'
// import {SiFastapi} from 'react-icons/fast'
import styled from 'styled-components'
import {AiFillStar} from 'react-icons/ai'
import {MdLabel} from 'react-icons/md'


const SingleProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams();
  const {product} = useSelector((state) => ({...state.product}))

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id))
    }
  }, [id])

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
          <button><FaShoppingCart className={"icon"}/> ADD TO CART</button>
          <button><GiElectric className={"icon1"}/> BUY NOW</button>
        </div>
      </div>

      <div className={"right_div"}>
        <p className={"title"}>{product.title}</p>
        <p className={"description"}>{product.description}</p>
        <button>4.4 <AiFillStar className={"icon"}/></button>

        <div className={"price"}>
          <h4>₹{product.price}</h4>
          <h5>₹35,99944%</h5>
          <h6>off</h6>
        </div>

        <div className={"offers"}>
          <h1>Available Offer</h1>
          <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Bank Offer </span>5% Cashback on Flipkart
            Axis Bank CardT&</p>
          </div>
          <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Partner Offer </span>Buy this product and
            get upto ₹500 off on
            Flipkart
            FurnitureKnow More</p></div>
          <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Partner Offer </span>Purchase this product &
            win a surprise
            cashback
            coupon for The Big Billion Days Sale 2022Know More</p></div>
          <div className={"offer__p"}><MdLabel className={"icon"}/><p><span>Partner Offer </span>Sign up for Flipkart
            Pay Later and get
            Flipkart
            Gift Card worth upto ₹1000*Know More</p></div>
        </div>

        <p className={"warranty"}>3 Years Warranty</p>
      </div>

    </Main>
  );
};

export default SingleProduct;


const Main = styled.div`
  //background-color: lightpink;
  height: auto;
  width: 100%;
  display: flex;
  padding: 0 5%;
  //align-items: center;
  //justify-content: center;

  .left_div {
    width: 50%;
    height: 100%;
    //background-color: lightgreen;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2% 0%;


    .image {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;

      img {
        width: 70%;
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
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: #ffffff;
    padding: 2% 2% 0 0;

    .title {
      font-size: 1.9rem;
      font-weight: 600;
    }

    .description {
      font-size: 1.8rem;
      font-weight: 500;
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
      align-items: center;
      justify-content: center;
      padding: 8px 0;

      h4 {
        font-size: 1.5rem;
        font-weight: 650;
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
          font-size: 1rem;
          padding: 0 0 0 5px;
          //white-space: nowrap;

          span {
            font-weight: 600;
          }
        }
      }
    }
    
    .warranty{
      font-size: 1rem;
      padding: 5px 0;
      font-weight: 600;
    }
  }
`

