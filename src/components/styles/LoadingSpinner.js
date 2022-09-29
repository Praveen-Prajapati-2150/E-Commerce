import React from 'react';
import styled from 'styled-components'

export const Spinner = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 50px;
  border: 3.5px solid;
  border-color: white;
  border-top: 3.5px solid;
  border-top-color: darkblue;
  margin: 0 0 0 0;
  
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const dot = styled.div`
  height: 3.5px;
  width: 2px;
  background-color: red;
  border: 1px solid green;
`

const LoadingSpinner = () => {
  return (
    <div>
      <Spinner>
        {/*<p></p>*/}
      </Spinner>
      {/*<dot/>*/}
    </div>
  );
};

export default LoadingSpinner;