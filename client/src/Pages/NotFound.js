import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return <Main>Page Not Found</Main>;
};

export default NotFound;

const Main = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: auto auto;
`;
