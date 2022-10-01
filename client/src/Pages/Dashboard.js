import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import {useLocation} from 'react-router-dom';

const Links = [
  {
    name: "Home",
    path: "/dashboard"
  }, {
    name: "Add Product",
    path: "/dashboard/add_product"
  },
  // {
  //   name: "Update Products",
  //   path: "/dashboard/:id"
  // }, {
  //   name: "Delete Products",
  //   path: "/dashboard/add_product"
  // },
]


const Dashboard = () => {
  const location = useLocation().pathname
  // const path = location.pathname

  console.log(location)

  return (
    <Dashboard_>

      <AdminSideBar>
        {
          Links?.map((link, index) => {
            return (
              <Link className={location===link.path && "active_link"} to={`${link.path}`}>{link.name}</Link>
            )
          })
        }
      </AdminSideBar>

      <DashboardRight>
        <Outlet/>
      </DashboardRight>

    </Dashboard_>
  );
};

export default Dashboard;


const Dashboard_ = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
`
const AdminSideBar = styled.div`
  height: 100%;
  width: 20%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  padding: 20px 10px;
  //background-color: darkblue;
  
  .active_link{
    background-color: darkblue;
    color: white;
  }

  a {
    color: darkblue;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 6px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    transition: 0.4s;
    //background-color: rgba(176, 176, 255, 0.58);
    border: 2px solid darkblue;
    margin: 10px 0;

    &:hover {
      background-color: rgba(176, 176, 255, 0.58);
      background-color: darkblue;
      color: white;
    }
  }
`

const DashboardRight = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;

  select {
    outline: none;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin: 4px 0 8px 0;
    padding: 8px 8px;
    color: grey;
  }
`