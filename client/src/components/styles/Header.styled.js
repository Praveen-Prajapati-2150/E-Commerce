import styled from 'styled-components';

export const HeaderStyled = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //background-color: ${({ bg }) => bg};
  // background-color: ${(props) => props.bg};
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 20px;
  position: sticky;
  top: 0px;
  left: 0;
  z-index: 100;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px 0px;
    //flex-direction: column;
    position: relative;
  }

  
  .left_side {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      position: relative;
      padding: 0 0 0 10px;
    }
    
    a {
      color: white;
      text-decoration: none;
    }
  }

  .Input_center {
    display: flex;
    align-items: center;
    background-color: white;
    justify-content: space-between;
    border-radius: 4px;
    width: 20%;
    padding: 0 5px;

    @media (max-width: 768px) {
      display: none;
    }

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

    @media (max-width: 768px) {
      display: none;
    }

    a,
    p {
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

  .mobile_view {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 0 10px;
    width: 100%;

    // position: absolute;

    .Input_center {
      display: flex;
      align-items: center;
      background-color: white;
      justify-content: space-between;
      border-radius: 4px;
      width: 100%;
      padding: 5px 0px;

      // @media (max-width: 768px) {
      //   display: none;
      // }

      input {
        width: 100%;
        outline: none;
        border: none;
        padding: 2px 10px;
        margin: 0 0 0 0;
        border-radius: 4px;
      }

      button {
        border: none;
        outline: none;
        color: darkblue;
        background-color: white;
        font-size: 20px;
        padding: 2px 10px;
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
      flex-direction: column;
      width: 100%;

      // @media (max-width: 768px) {
      //   display: none;
      // }

      a,
      p {
        color: white;
        text-decoration: none;
        padding: 0 0 0 10px;
        display: flex;
        align-items: center;
        padding: 8px 0 0 0;
        width: auto;
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
  }
`;

export const NavBarToggle = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  position: relative;
  padding: 0 10px 0 0;
  
  @media(min-width: 768px){
    display: none;
  }
  
  p {
    border: 1.7px solid white;
    margin: 4px 0;
    width: 35px;
    background-color: white;
    border-radius: 100px;
  }

  .cross {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 20px 0 0;

    p {
      // margin: -10px 0;
      position: absolute;
      transform: rotate(45deg);
      // transform-origin: left;
      width: 30px;

      &:nth-child(2) {
        transform: rotate(-45deg);
        // transform-origin: right;
      }
    }
  }
`;


export const MobileView = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 10px;
  width: 100%;
  position: absolute;
  z-index: 100;
  background: rgba(255, 255, 255, 0.55);
  background-color: darkblue;
  margin: 35vh 0 0 0;

  // position: absolute;

  .Input_center {
    display: flex;
    align-items: center;
    background-color: white;
    justify-content: space-between;
    border-radius: 4px;
    width: 100%;
    padding: 5px 0px;

    // @media (max-width: 768px) {
    //   display: none;
    // }

    input {
      width: 100%;
      outline: none;
      border: none;
      padding: 2px 10px;
      margin: 0 0 0 0;
      border-radius: 4px;
    }

    button {
      border: none;
      outline: none;
      color: darkblue;
      background-color: white;
      font-size: 20px;
      padding: 2px 10px;
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
    flex-direction: column;
    width: 100%;

    // @media (max-width: 768px) {
    //   display: none;
    // }

    a,
    p {
      color: white;
      text-decoration: none;
      padding: 0 0 0 10px;
      display: flex;
      align-items: center;
      padding: 8px 0 0 0;
      width: auto;
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
`;
