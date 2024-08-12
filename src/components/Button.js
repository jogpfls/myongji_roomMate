import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, bgc, hoverColor }) => {
  return (
    <div>
      <Btn onClick={onClick} bgc={bgc} hoverColor={hoverColor}>
        {children}
      </Btn>
    </div>
  );
};
const Btn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 7px;
  background-color: ${(props) => props.bgc || props.theme.colors.blue2};
  color: white;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover{
    background-color: ${(props)=>props.hoverColor || props.theme.colors.blue2C};
  }
`;
export default Button;
