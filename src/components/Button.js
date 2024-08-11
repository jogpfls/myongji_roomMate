import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, bgc }) => {
  return (
    <div>
      <Btn onClick={onClick} bgc={bgc}>
        {children}
      </Btn>
    </div>
  );
};
const Btn = styled.button`
  width: 160px;
  height: 55px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor || props.theme.colors.blue2};
  color: white;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;
export default Button;
