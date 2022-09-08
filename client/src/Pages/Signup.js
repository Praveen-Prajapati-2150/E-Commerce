import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {Input} from '../components/styles/Input.styled'
import {Section, Box, Heading, CenterDiv, Button} from '../components/styles/Auth.styled'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {register} from "../redux/featuers/authslice";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Label = styled.label`
  color: ${({theme}) => theme.colors.para};
`

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}


const Signup = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {loading, error} = useSelector((state) => ({...state.auth}));
  const {firstName, lastName, email, password, confirmPassword} = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    error && console.log(error)
  }, [error])

  const onInputChange = (e) => {
    let {name, value} = e.target
    setFormValue({...formValue, [name]: value})
  }

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      window.alert("password is not matching")
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({formValue, toast, navigate}))
    }
  }

  return (
    <Section>
      <Box>
        <Heading>SignUp</Heading>

        <label>FirstName</label>
        <Input type={"text"} value={firstName} label={"firstName"} name={"firstName"} onChange={onInputChange}
               placeholde={"enter your username"}/>

        <label>LastName</label>
        <Input type={"text"} value={lastName} name={"lastName"} onChange={onInputChange}
               placeholde={"enter your username"}/>

        <label>Email</label>
        <Input type={"email"} value={email} name={"email"} onChange={onInputChange} placeholde={"enter your username"}/>

        <label>Password</label>
        <Input type={"password"} value={password} name={"password"} onChange={onInputChange}
               placeholde={"enter your password"}/>

        <label>Confirm Password</label>
        <Input type={"password"} value={confirmPassword} name={"confirmPassword"} onChange={onInputChange}
               placeholde={"enter your password"}/>

        <CenterDiv>
          <Button onClick={() => handleSubmit()}>SignUp</Button>
        </CenterDiv>

        <CenterDiv>
          <label>Already Registered, click to go <Link to={"/login"}>Login</Link> page</label>
        </CenterDiv>
      </Box>
    </Section>
  );
};

export default Signup;