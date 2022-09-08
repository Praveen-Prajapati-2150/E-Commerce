import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {HeaderStyled} from "./styles/Header.styled";
import {FaShoppingCart} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
// import {BiSearchAlt} from 'react-icons/lo'
import {Input} from "./styles/Input.styled";
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../redux/featuers/authslice";
import decode from 'jwt-decode'


const Header = () => {
  const {user} = useSelector((state) => ({...state.auth}))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = user?.token

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout())
    }
  }

  const handleLogout = () => {
    dispatch(setLogout())
  }

  return (
    <HeaderStyled>
      <div className={"left_side"}>
        <Link to={"/"}>
          <h1>KartZone</h1>
        </Link>
      </div>

      <div className={"Input"}>
        {/*<BiSearchAlt/>*/}
        <input type={"text"} placeholder={"Search for products and category"}/>
      </div>

      <div className={"right_side"}>
        {user?.result?._id &&
          <Link to={"/dashboard"}>Dashboard</Link>
        }
        {user?.result?._id ?
          <Link to={"/login"} onClick={() => handleLogout()}>Logout</Link>
          :
          <>
            <Link to={"/login"}>LogIn</Link>
            <Link to={"/Signup"}>SignUp</Link>
          </>
        }
        {user?.result?._id && (
          <Link to={"/"}>
            <CgProfile/>
            <p>{user?.result?.name.toUpperCase()}</p>
          </Link>
        )}
        {user?.result?._id &&
          <Link to={"/cart"}>
            <FaShoppingCart/>
            <p>Cart</p>
          </Link>
        }
      </div>

    </HeaderStyled>
  );
};

export default Header;