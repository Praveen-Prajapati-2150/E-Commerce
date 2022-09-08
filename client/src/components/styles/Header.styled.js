import React from 'react';
import styled from 'styled-components'

export const HeaderStyled = styled.header`
          height: 10vh;
          //width: 100%;
          padding: 8px 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
            //background-color: ${({bg}) => bg};
            // background-color: ${(props) => props.bg};
          background-color: ${({theme}) => theme.colors.header};
          padding: 0 20px;

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
            input {
              width: 120%;
              outline: none;
              border: none;
              padding: 10px 10px;
              margin: 0 0 0 20px;
              border-radius: 4px;
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

          }

  `
;

