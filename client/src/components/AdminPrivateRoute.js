import React from 'react';
import { useSelector } from 'react-redux';
// import LoadingToRedirect from './LoadingToRedirect';
import AdminAuth from '../Pages/AdminAuth';

const AdminPrivateRoute = ({ children }) => {

  const { admin } = useSelector((state) => ({ ...state.admin }));
  return admin ? children : <AdminAuth />;
};

export default AdminPrivateRoute;
