import React from "react";
import styled from "styled-components";

const Category = ({ children }) => {

  return (
    <div>
      <CaBox>
        # {children}
      </CaBox>
    </div>
  );
};

const CaBox = styled.div`
  max-width: 105px;
  width: 10vw;
  min-width: 95px;
  height: 32px;
  border-radius: 20px;
  background-color:${({theme})=>theme.colors.lightBlue};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 15px;
`;

export default Category;
