import styled from 'styled-components'

export const Heading = styled.h1`
  text-align: center;
  padding: 0 0 5px 0;
  color: darkblue;
`

export const Section = styled.section`
  height: 90vh;
  //width: 100vw;
  //height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  max-width: 800px;
  min-width: 300px;
  width: 450px;
  //max-height: 400px;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
`

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 8px 24px;
  margin: 10px 0 0 0;
  //max-width: 100px;
  background-color: darkblue;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const CenterDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;

  h1 {
    color: red;

    &:hover {
      color: green;
    }
  }

  &:hover {
    //background-color: lightsalmon;
  }
`