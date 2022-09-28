import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {AiOutlineMinusCircle} from "react-icons/ai";
import styled from "styled-components";
import { incrementQuantity, decrementQuantity, removeItem} from '../redux/featuers/cartSlice'

const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + " ...";
  }
  return str;
};

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

  console.log(cart)

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    })
    return {totalPrice, totalQuantity}
  }

  if (cart.length === 0) {
    return <h1>your cart is empty</h1>
  }

  return (
    <Main>

      <ProductDiv className={"product_div"}>
        {
          cart?.map((product, index) => {
            return (
              <Product key={index}>
                <Link key={index} to={`/product/${product.id}`}>
                  <div className={"image"}>
                    {
                      product.imageFile ?
                        <img src={process.env.REACT_APP_IMAGE_PATH + product.imageFile} alt={"prod"}/>
                        :
                        <img src={"/assets/product/no__product.png"} alt={"prod"}/>
                    }
                  </div>
                </Link>

                <div className={"product_detail"}>
                  <h3>{excerpt(product.title, 60)}</h3>
                  <div className={"price"}>
                    <h3>₹{Number(product.price) + Number(product.price * 11.1 / 100)}</h3>
                    <h4>₹{product.price}</h4>
                    <p>10% off</p>
                    <p>1 coupon & 6 offers applied</p>
                  </div>
                  <label>Seller: <span>KARTZONE RETAILERS</span></label>
                </div>

                <div className={"delivery"}>
                  {/*<p>Delivery by Tue Oct 4 | Free₹ <span>40</span></p>*/}
                  <p>Delivery by Tomorrow | Free <span>₹40</span></p>

                  <div>
                    <div className={"buttons"} onClick={(e) => e.stopPropagation()}>
                      <div>
                        <button onClick={() => dispatch(decrementQuantity(product.id))}>
                          <AiOutlineMinusCircle/>
                        </button>
                        <p>{product.quantity}</p>
                        <button onClick={() => dispatch(incrementQuantity(product.id))}>
                          <AiOutlinePlusCircle/>
                        </button>
                      </div>

                      <h3 onClick={() => dispatch(removeItem(product.id))}>Remove</h3>
                    </div>
                  </div>
                </div>

              </Product>
            )
          })
        }
      </ProductDiv>

      <CheckoutDiv className={"checkout_div"}>
        <div className={"header"}>
          <p>PRICE DETAILS</p>
        </div>
        <div className={"calculation"}>
          <div>
            <p>Price ({getTotal().totalQuantity} items)</p>
            <p>₹{getTotal().totalPrice}</p>
          </div>
          <div>
            <p>5% Discount</p>
            <p>-₹{getTotal().totalPrice * 5/100}</p>
          </div>
          <div>
            <p>Coupons for you</p>
            <p>-₹150</p>
          </div>
          <div>
            <p>Delivery Charges</p>
            <p>FREE</p>
          </div>
        </div>
        <div className={"total"}>
          <p>Total Amount</p>
          <p>₹{getTotal().totalPrice - getTotal().totalPrice * 5/100 -150}</p>
        </div>
        <div className={"save"}>
          <p>You will save ₹{getTotal().totalPrice * 5/100+150} on this order</p>
        </div>
      </CheckoutDiv>

    </Main>
  );
};

export default Cart;

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  //background-color: lightpink;

  a {
    text-decoration: none;
  }
`

const ProductDiv = styled.div`
{
  width: 70%;
  height: auto;
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3), -2px -2px 1px rgba(0, 0, 0, 0.1);
  padding: 1%;
}
`

const CheckoutDiv = styled.div`
{
  width: 28%;
  height: 10%;
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3), -2px -2px 1px rgba(0, 0, 0, 0.1);
  padding: 1%;

  .header {
    p {
      color: #525252;
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 3%;
    }

    border-bottom: .5px solid lightgray;
  }

  .calculation {
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;

      p {
        font-size: 20px;
        font-weight: 500;
        color: #3d3d3d;

        &:nth-child(2) {
          color: #5db45d;
        }
      }

      &:nth-child(1) {
        p {
          &:nth-child(2) {
            color: #3d3d3d;
          }
        }
      }
    }
  }

  .total {
    padding: 15px 0;
    border-top: .5px solid lightgray;
    border-bottom: .5px solid lightgray;


    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 22px;
      font-weight: 600;
    }

  }

  .save {
    padding: 10px 0 0 0;
    color: #55a155;
    font-weight: 600;
  }
}
`

const Product = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  //background-color: lightpink;
  margin: 0 25px 25px 0;

  .image {
    //height: auto;
    width: 200px;
    max-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: lightgreen;

    img {
      max-width: 150px;
      max-height: 150px;
      //width: 100%;
      //height: 100%;
    }

    &:hover {
      transform: scale(1.015);
    }
  }

  .product_detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    padding: 0 0 0 20px;
    //background-color: lightpink;
    width: 100%;

    .price {
      display: flex;
      align-items: flex-end;

      h3 {
        text-decoration: line-through;
        color: darkgrey;
      }

      h4 {
        color: black;
        padding-left: 10px;
        font-weight: 600;
      }

      p {
        color: #5db45d;
        padding-left: 10px;
        font-weight: 500;

        &:nth-child(1) {
          padding-left: 10px;
        }
      }
    }
  }

  .delivery {
    p {
      white-space: nowrap;
    }

    span {
      text-decoration: line-through;
    }
  }

  h3, h4, label {
    white-space: nowrap;
    text-decoration: none;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    //padding: 10px 0 0 0;
    text-decoration: none;
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

  .buttons {
    display: flex;
    align-items: center;
    padding: 5px 0;
    justify-content: space-between;

    p {
      font-size: 20px;
      padding: 0 10px;
    }

    h3 {
      //padding-left: 20px;
      font-size: 20px;
      color: black;
      color: darkred;
      cursor: pointer;

      &:hover {
        color: #be0000;
      }
    }

    div {
      display: flex;
      align-items: center;
    }

    button {
      border: none;
      outline: none;
      background-color: #ffffff;
      color: black;
      font-size: 25px;
      cursor: pointer;
      padding: 5px 0 0 0;

      &:nth-child(2) {
        background-color: darkred;
        background-color: white;
      }
    }
  }


`