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
  width: 120px;
  height: 40px;
  border-radius: 7px;
  background-color: ${(props) => props.bgColor || props.theme.colors.blue2};
  color: white;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;
export default Button;
