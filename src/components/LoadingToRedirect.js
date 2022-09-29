import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && navigate("/login")

    return () => clearInterval(interval)

  }, [count, navigate])

  return (
    <Main>
      <p>Redirecting you in {count} seconds</p>
    </Main>
  );
};

export default LoadingToRedirect;

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`