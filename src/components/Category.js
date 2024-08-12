import React, { useState } from "react";
import styled from "styled-components";

const Category = ({ children, onClick, bgc }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) onClick();
  };

  return (
    <div>
      <CaBox onClick={handleClick} bgc={bgc} isSelected={isSelected}>
        # {children}
      </CaBox>
    </div>
  );
};

const CaBox = styled.div`
  width: 120px;
  height: 32px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isSelected
      ? props.bgc || props.theme.colors.blue2
      : props.theme.colors.lightBlue};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 15px;
`;

export default Category;
