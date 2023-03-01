import { useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Login from './Pages/Login';
import GlobalStyles from './components/styles/Global';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signup from './Pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/featuers/authslice';
import { setAdmin } from './redux/featuers/adminSlice';
import SingleProduct from './Pages/SingleProduct';
import DashboardHome from './Pages/DashboardHome';
import AddProduct from './Pages/AddProduct';
import SearchProducts from './Pages/SearchProducts';
import Cart from './Pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import NotFound from './Pages/NotFound';
import CategoryProducts from './Pages/CategoryProducts';
import AdminAuth from './Pages/AdminAuth';
// import Navbar from './components/HeaderNav';
// import AdminPanel from './Pages/AdminPanel';

const theme = {
  colors: {
    header: 'darkBlue',
    body: '#fff',
    footer: 'lightGrey',
    para: 'lightGrey',
  },
};

const Appp = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

function App() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const admin = JSON.parse(localStorage.getItem('adminProfile'));

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setAdmin(admin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async() => {
    try{

    } catch(err) {
      
    }
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Appp>
          <ToastContainer autoClose={500} />
          <Header />
          {/*<Navbar />*/}

          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/product/:id'} element={<SingleProduct />} />
            <Route
              path={'/product/category/:category'}
              element={<CategoryProducts />}
            />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route
              path={`/product/search/:searchQuery`}
              element={<SearchProducts />}
            />
            <Route
              path={'/admin'}
              element={
                <AdminPrivateRoute>
                  <Dashboard />
                  {/* <AdminPanel /> */}
                </AdminPrivateRoute>
              }
            >
              {/* <Route path={'/admin'} element={<AdminAuth />} /> */}
              <Route path={'/admin/products'} element={<DashboardHome />} />
              <Route path={'/admin/add_product'} element={<AddProduct />} />
              <Route path={'/admin/update_tour/:id'} element={<AddProduct />} />
            </Route>

            {/* <Route
              path={'/dashboard'}
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path={'/dashboard'} element={<DashboardHome />} />
              <Route path={'/dashboard/add_product'} element={<AddProduct />} />
              <Route
                path={'/dashboard/update_tour/:id'}
                element={<AddProduct />}
              />
            </Route> */}

            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </Appp>
      </ThemeProvider>
    </Router>
  );
}

export default App;
