import React, { useEffect, useState } from "react";
import styled from "styled-components";

const List = ({
  search,
  title,
  status,
  onClick,
  contents,
  date,
  total,
  category,
  current,
  gender,
}) => {
  const [maxLength, setMaxLength] = useState(12);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [datePart] = dateString.split(" ");
    return datePart.replace(/-/g, ".");
  };

  let visibleCategoriesCount;
  if (viewportWidth <= 600) {
    visibleCategoriesCount = 1;
  } else if (viewportWidth <= 820) {
    visibleCategoriesCount = 2;
  } else if (viewportWidth <= 1150) {
    visibleCategoriesCount = 3;
  } else {
    visibleCategoriesCount = 4;
  }

  return (
    <div>
      {title.includes(search) && (
        <Wrapper
          status={status}
          onClick={status !== "모집완료" ? onClick : null}
        >
          <LeftBox>
            <div>
              {gender === "FEMALE" && (
                <FemaleTitle>
                  <span>♀</span> {title}
                </FemaleTitle>
              )}
              {gender === "MALE" && (
                <MaleTitle>
                  <span>♂</span> {title}
                </MaleTitle>
              )}
            </div>
            <ContentsBox>
              <Contents>{truncateText(contents, maxLength)}</Contents>
            </ContentsBox>
            <TextBox>
              <CategoryBox>
                {category
                  .slice(0, visibleCategoriesCount)
                  .map((data, index) => (
                    <Category key={index}>#{data}</Category>
                  ))}
                {category.length > visibleCategoriesCount && (
                  <Ellipsis>#···</Ellipsis>
                )}
              </CategoryBox>
              <Date>{formatDate(date)}</Date>
            </TextBox>
          </LeftBox>
          <RightBox>
            <ChatTextBox status={status}>
              {status === "모집완료" ? (
                <ChatText>모집 완료</ChatText>
              ) : (
                <>
                  <Count>
                    {current}/{total} 모집 중..
                  </Count>
                  <ChatText>채팅방 입장하기</ChatText>
                </>
              )}
            </ChatTextBox>
          </RightBox>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme, status }) =>
    status === "모집완료" ? theme.colors.gray3 : theme.colors.white};
  width: 100%;
  height: 25vh;
  border-radius: 10px;
  display: flex;
  cursor: ${({ status }) => (status === "모집완료" ? "" : "pointer")};
  transition: background-color 0.2s;
  margin-bottom: 2.3vh;
  border: solid 1px ${({ theme }) => theme.colors.gray2};

  &:hover {
    background-color: ${({ theme, status }) =>
      status === "모집완료" ? "none" : theme.colors.lightBlue};
    border: ${({ status }) => (status === "모집완료" ? "" : "none")};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 18vh;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  height: 100%;
  padding: 3vh 0 3vh 2vw;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5vh 3vw;
    width: 100%;
  }
`;

const FemaleTitle = styled.p`
  ${({ theme }) => theme.fonts.text4}
  font-size: 25px;
  span {
    font-size: 30px;
    color: red;
    margin-right: 5px;
    padding-top: 10px;
  }
`;

const MaleTitle = styled.p`
  ${({ theme }) => theme.fonts.text4}
  font-size: 25px;
  span {
    font-size: 30px;
    color: blue;
    margin-right: 5px;
  }
`;

const TextBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ContentsBox = styled.div`
  width: 95%;
  height: 11vh;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 6vh;
    width: 60%;
  }
`;

const Contents = styled.p`
  font-size: 16px;
`;

const CategoryBox = styled.div`
  display: flex;
  gap: 1vw;
  width: 65%;
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
  width: 28%;
  display: flex;
  justify-content: end;
`;

const RightBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ChatTextBox = styled.div`
  background-color: ${({ theme, status }) =>
    status === "모집완료" ? theme.colors.gray2 : "#F7FAFF"};
  height: 90%;
  width: 90%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ status }) => !status && "none"};
  }
`;

const Count = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 15px;
  margin-bottom: 5px;
`;

const ChatText = styled.p`
  ${({ theme }) => theme.fonts.text4};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 25px;
`;

const Ellipsis = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray};
`;

export default List;
