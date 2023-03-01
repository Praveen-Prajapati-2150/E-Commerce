import React from 'react';
import { Input } from '../components/styles/Input.styled';
import {
  Section,
  Box,
  Heading,
  CenterDiv,
  Button,
} from '../components/styles/Auth.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/featuers/authslice';
import { toast } from 'react-toastify';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  // const {loading, error} = useSelector((state) => ({...state.auth}))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const HandleChange = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(signin({ formValue, toast, navigate }));
    }
  };

  const googleLogin = (e) => {
    window.open(
      `${process.env.REACT_APP_DEV_URL}/auth/google/callback`,
      '_self'
    );
  };

  return (
    <Section>
      <Box>
        <Heading>Login</Heading>
        {/* <form autoComplete="off"> */}
        <label>Username</label>
        <Input
          type={'email'}
          value={email}
          name={'email'}
          onChange={OnInputChange}
          placeholder={'enter your username'}
          autocomplete="off"
        />
        <label>Password</label>
        <Input
          type={'password'}
          value={password}
          name={'password'}
          onChange={OnInputChange}
          placeholder={'enter your password'}
          autocomplete="off"
        />
        <CenterDiv>
          <Button onClick={HandleChange}>Login</Button>
        </CenterDiv>

        <CenterDiv>
          <label>
            Register if don't register, click to go{' '}
            <Link to={'/signup'}>SignUp</Link> page
          </label>
        </CenterDiv>

        <CenterDiv>
          <Button onClick={googleLogin}>Google Login</Button>
        </CenterDiv>
        {/* </form> */}
      </Box>
    </Section>
  );
};

export default Login;
