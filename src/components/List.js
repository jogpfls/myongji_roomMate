import React, { useEffect, useState } from "react";
import styled from "styled-components";
import full from "../images/fullStar.svg";

const List = ({
  search,
  title,
  onClick,
  contents,
  date,
  total,
  category,
  current,
  gender,
  like,
}) => {
  const [maxLength, setMaxLength] = useState(12);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [status, setStatus] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      if (window.innerWidth <= 480) {
        setMaxLength(50);
      } else {
        setMaxLength(100);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(()=>{
    if(total === current){
      setStatus(true);
    }
  },[total, current])

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [datePart] = dateString.split("T");
    return datePart ? datePart.replace(/-/g, ".") : "";
  };

  let visibleCategoriesCount;
  if(viewportWidth <=480){
    visibleCategoriesCount = 1;
  }else if (viewportWidth <= 630) {
    visibleCategoriesCount = 2;
  } else if (viewportWidth <= 850) {
    visibleCategoriesCount = 3;
  } else if (viewportWidth <= 1150) {
    visibleCategoriesCount = 4;
  } else {
    visibleCategoriesCount = 6;
  }

  const truncateCategory = (category) => {
    if (category.length > 5) {
      return category.slice(0, 5) + "...";
    }
    return category;
  };

  return (
    <div>
      {title.includes(search) && (
        <Wrapper
          status={status}
          onClick={!status ? onClick : null}
        >
          <AllBox>
            <TopBox>
              <LeftBox>
              {gender === "FEMALE" && (
                <FemaleTitle status={status}>
                  <span>♀</span> {title}
                </FemaleTitle>
              )}
              {gender === "MALE" && (
                <MaleTitle status={status}>
                  <span>♂</span> {title}
                </MaleTitle>
              )}
              <ChatTextBox status={status}>
              {status ? (
                <Count status={status}>({current}/{total}) 채팅 인원이 가득 찼습니다.</Count>
              ) : (
                <>
                  <Count>
                    {current}/{total} 채팅 중..
                  </Count>
                </>
              )}
            </ChatTextBox>
              </LeftBox>
              {like && <Star src={full} ></Star>}
            </TopBox>
            <ContentsBox>
              <Contents>{truncateText(contents, maxLength)}</Contents>
            </ContentsBox>
            <TextBox>
              <CategoryBox>
                {category
                  .slice(0, visibleCategoriesCount)
                  .map((data, index) => (
                    <Category key={index}>#{truncateCategory(data)}</Category>
                  ))}
                {category.length > visibleCategoriesCount && (
                  <Ellipsis>#···</Ellipsis>
                )}
              </CategoryBox>
              <Date>{formatDate(date)}</Date>
            </TextBox>
          </AllBox>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme, status }) =>
    status ? theme.colors.gray3 : theme.colors.white};
  width: 100%;
  height: 25vh;
  border-radius: 10px;
  display: flex;
  cursor: ${({ status }) => (status ? "" : "pointer")};
  transition: background-color 0.2s;
  margin-bottom: 2.3vh;
  border: solid 1px ${({ theme }) => theme.colors.gray2};

  &:hover {
    background-color: ${({ theme, status }) =>
      status ? "none" : theme.colors.lightBlue};
    border: ${({ status }) => (status ? "" : "none")};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 18vh;
  }
`;

const AllBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 3vh 2vw;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5vh 3vw;
    width: 100%;
  }
`;

const TopBox = styled.div`
  display: flex;
  width: 99%;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  width: 90%;
  display: flex;
  gap: 1.5vw;
  align-items: center;
`;

const FemaleTitle = styled.p`
  ${({ theme }) => theme.fonts.text4}
  font-size: 25px;
  white-space: nowrap;
  span {
    font-size: 30px;
    margin-right: 5px;
    color : ${({theme, status})=> status ? theme.colors.gray : "red"};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const MaleTitle = styled.p`
  ${({ theme }) => theme.fonts.text4}
  font-size: 25px;
  span {
    font-size: 30px;
    color: ${({theme, status})=> status ? theme.colors.gray : "blue"};
    margin-right: 5px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const ChatTextBox = styled.div`
  height: 2.3vh;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-top: 1.3vh;
  padding: 0 0.5vw;
  background-color: ${({theme, status})=>status ? theme.colors.gray2 : theme.colors.lightBlue};
`;

const Count = styled.p`
  color: ${({ theme, status }) =>status ? "black" :  theme.colors.gray};
  font-size: 13px;
  white-space: nowrap;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ContentsBox = styled.div`
  width: 93%;
  height: 11vh;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 6vh;
  }
`;

const Contents = styled.p`
  font-size: 16px;
`;

const CategoryBox = styled.div`
  display: flex;
  gap: 1vw;
  width: 70%;
`;

const Category = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 15px;
  margin-right: 2vh;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 15px;
`;

const Ellipsis = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray};
`;

const Star = styled.img`
  width: 31px;
`;

export default List;
