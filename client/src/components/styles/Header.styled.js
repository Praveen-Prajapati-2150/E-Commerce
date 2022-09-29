import React from 'react';
import styled from 'styled-components'

export const HeaderStyled = styled.header`
          height: 10vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
            //background-color: ${({bg}) => bg};
            // background-color: ${(props) => props.bg};
          background-color: ${({theme}) => theme.colors.header};
          padding: 0 20px;
          position: sticky;
          top: 0px;
          left: 0;
          z-index: 100;

          .left_side {
            display: flex;
            align-items: center;
            justify-content: center;

            a {
              color: white;
              text-decoration: none;
            }

          }

          .Input {
            display: flex;
            align-items: center;
            background-color: white;
            justify-content: space-between;
            border-radius: 4px;
            width: 20%;
            padding: 0 5px;

            input {
              width: 100%;
              outline: none;
              border: none;
              padding: 10px 10px;
              margin: 0 0 0 0;
              border-radius: 4px;
            }

            button {
              border: none;
              outline: none;
              color: darkblue;
              background-color: white;
              font-size: 20px;
              padding: 6px;
              border-radius: 4px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover {
                color: green;
              }
            }
          }

          .right_side {
            display: flex;
            align-items: center;

            a, p {
              color: white;
              text-decoration: none;
              padding: 0 0 0 10px;
              display: flex;
              align-items: center;
            }

            p {
              padding-left: 4px;
            }

            .cart_no {
              background-color: orangered;
              color: white;
              border-radius: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 4px;
              margin-left: 4px;
            }

          }

  `
;

