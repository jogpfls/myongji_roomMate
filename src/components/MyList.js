import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyList = ({ id, dormitory, title, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const lowerCaseDormitory = dormitory.toLowerCase();
    navigate(`/dormitory/${lowerCaseDormitory}/room/${id}`);
  };

  return (
    <AllWrapper onClick={handleClick}>
      <Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <DateBox>
          <Date>{formatDate(date)}</Date>
        </DateBox>
      </Wrapper>
    </AllWrapper>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [datePart] = dateString.split("T");
  return datePart ? datePart.replace(/-/g, ".") : "";
};

const AllWrapper = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  width: 25vw;
  height: 7vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 28vw;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
  }
`;

const TitleWrapper = styled.div`
  margin-left: 10px;
`;

const Title = styled.p`
  margin: 0;
`;

const DateBox = styled.div`
  height: 100%;
  margin-right: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: end;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 15px;
  margin: 0;

  @media (max-width: ${({theme})=>theme.breakpoints.tablet}){
    display: none;
  }
`;

export default MyList;
