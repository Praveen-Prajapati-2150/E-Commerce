import {useEffect} from 'react';
import styled from 'styled-components'
import {ThemeProvider} from "styled-components";
import Login from "./Pages/Login";
import GlobalStyles from "./components/styles/Global";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Signup from "./Pages/Signup";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import {useDispatch} from "react-redux";
import {setUser} from './redux/featuers/authslice';
import SingleProduct from "./Pages/SingleProduct";
import DashboardHome from "./Pages/DashboardHome";
import AddProduct from './Pages/AddProduct'
import SearchProducts from "./Pages/SearchProducts";
import Cart from './Pages/Cart'


const theme = {
  colors: {
    header: 'darkBlue',
    body: "#fff",
    footer: "lightGrey",
    para: "lightGrey"
  },
}

const Appp = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    dispatch(setUser(user))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <Appp>
          <ToastContainer autoClose={1000}/>
          <Header/>

          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/product/:id"} element={<SingleProduct/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/signup"} element={<Signup/>}/>
            <Route path={"/cart"} element={<Cart/>}/>
            <Route path={`/product/search/:searchQuery`} element={<SearchProducts/>}/>

            <Route path={"/dashboard"} element={<Dashboard/>}>
              <Route path={"/dashboard"} element={<DashboardHome/>}/>
              <Route path={"/dashboard/add_product"} element={<AddProduct/>}/>
              <Route path={"/dashboard/update_tour/:id"} element={<AddProduct/>}/>
            </Route>
          </Routes>

        </Appp>
      </ThemeProvider>
    </Router>
  );
}

export default App;
