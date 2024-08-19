import React from "react";
import styled from "styled-components";

const DormitoryCategory = ({ children }) => {

  return (
    <div>
      <CaBox>
        # {children}
      </CaBox>
    </div>
  );
};

const CaBox = styled.div`
  width: auto;
  color: ${({theme})=>theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 5px;
  padding: 3px 5px;
  font-size: 16px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    font-size: 15px;
  }
`;

export default DormitoryCategory;
