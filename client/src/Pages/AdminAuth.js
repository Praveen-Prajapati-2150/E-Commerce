import React from 'react';
import { Input } from '../components/styles/Input.styled';
import {
  Section,
  Box,
  Heading,
  CenterDiv,
  Button,
} from '../components/styles/Auth.styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { adminSignin, adminSignup } from '../redux/featuers/adminSlice';

const initialState = {
  username: '',
  password: '',
};

const AdminAuth = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { username, password } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const AdminLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(adminSignin({ formValue, toast, navigate }));
    }
  };

  const AdminSignup = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(adminSignup({ formValue, toast, navigate }));
    }
  };

  console.log(formValue);

  return (
    <Section>
      <Box>
        <Heading>Admin Login</Heading>
        {/* <form autoComplete="off"> */}
        <label>Username</label>
        <Input
          type={'email'}
          name={'username'}
          value={username}
          onChange={OnInputChange}
          placeholder={'enter your username'}
          autocomplete="off"
        />
        <label>Password</label>
        <Input
          type={'password'}
          name={'password'}
          value={password}
          onChange={OnInputChange}
          placeholder={'enter your password'}
          autocomplete="off"
        />
        <CenterDiv>
          <Button onClick={AdminLogin}>Login</Button>
        </CenterDiv>
        <CenterDiv>
          <Button onClick={AdminSignup}>Signup</Button>
        </CenterDiv>

        {/* <CenterDiv>
          <label>
            Register if don't register, click to go{' '}
            <Link to={'/signup'}>SignUp</Link> page
          </label>
        </CenterDiv> */}
        {/* </form> */}
      </Box>
    </Section>
  );
};

export default AdminAuth;
