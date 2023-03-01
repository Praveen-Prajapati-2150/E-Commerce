import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { Input } from '../components/styles/Input.styled';
import {
  Section,
  Box,
  Heading,
  CenterDiv,
  Button,
} from '../components/styles/Auth.styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/featuers/authslice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  imageFile: '',
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { error } = useSelector((state) => ({ ...state.auth }));
  const { firstName, lastName, email, password, confirmPassword, imageFile } =
    formValue;

  const imageUpload = (e) => {
    console.log(e.target.files[0]);
    setFormValue((prevState) => ({...prevState, imageFile: e.target.files[0] }));
    // formValue.imageFile : e.target.files[0]
  };

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  console.log(formValue);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });

    console.log(e);
  };

  const handleSubmit = () => {

    if (password !== confirmPassword) {
      window.alert('password is not matching');
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, toast, navigate }));
    }
  };

  const GoogleSignUp = () => {
    window.open(
      `${process.env.REACT_APP_DEV_URL}/auth/google/callback`,
      '_self'
    );
  }

  return (
    <Section>
      <Box>
        <Heading>SignUp</Heading>

        <label>FirstName</label>
        <Input
          type={'text'}
          value={firstName}
          label={'firstName'}
          name={'firstName'}
          onChange={onInputChange}
          placeholder={'enter your username'}
        />

        <label>LastName</label>
        <Input
          type={'text'}
          value={lastName}
          name={'lastName'}
          onChange={onInputChange}
          placeholder={'enter your username'}
        />

        <label>Email</label>
        <Input
          type={'email'}
          value={email}
          name={'email'}
          onChange={onInputChange}
          placeholder={'enter your username'}
        />

        <label>Password</label>
        <Input
          type={'password'}
          value={password}
          name={'password'}
          onChange={onInputChange}
          placeholder={'enter your password'}
        />

        <label>Confirm Password</label>
        <Input
          type={'password'}
          value={confirmPassword}
          name={'confirmPassword'}
          onChange={onInputChange}
          placeholder={'enter your password'}
        />

        <label>Profile Picture</label>
        <Input type={'file'} name={'imageFile'} onChange={imageUpload} />

        <CenterDiv>
          <Button onClick={() => handleSubmit()}>SignUp</Button>
        </CenterDiv>

        <CenterDiv>
          <label>
            Already Registered, click to go <Link to={'/login'}>Login</Link>{' '}
            page
          </label>
        </CenterDiv>

        <CenterDiv>
          <Button onClick={() => GoogleSignUp()}>Google SignUp</Button>
        </CenterDiv>
      </Box>
    </Section>
  );
};

export default Signup;
