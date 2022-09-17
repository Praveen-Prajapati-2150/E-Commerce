import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {HeaderStyled} from "./styles/Header.styled";
import {FaShoppingCart} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {BiSearchAlt} from 'react-icons/bi'
import {Input} from "./styles/Input.styled";
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../redux/featuers/authslice";
import decode from 'jwt-decode'
import {getProductsBySearch} from "../redux/featuers/productSlice";


const Header = () => {
  const {user} = useSelector((state) => ({...state.auth}))
  const [searchQuery, setSearchQuery] = useState("")

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

  const searchProducts = () => {
    if (searchQuery) {
      dispatch(getProductsBySearch({searchQuery, navigate}))
      navigate(`/product/search/${searchQuery}`);
      setSearchQuery("")
    } else {
      navigate("/")
    }
  }


  useEffect(() => {
    const keyDownHandler = event => {
      // console.log('User pressed: ', event.key);

      if (event.key === 'Enter') {
        event.preventDefault();

        // 👇️ your logic here
        searchProducts();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <HeaderStyled>
      <div className={"left_side"}>
        <Link to={"/"}>
          <h1>KartZone</h1>
        </Link>
      </div>

      <div className={"Input"}>
        <input type={"text"}
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder={"Search for products and category"}/>
        <button onClick={() => searchProducts()}>
          <BiSearchAlt/>
        </button>
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