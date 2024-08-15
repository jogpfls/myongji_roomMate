import React, { useEffect, useState } from "react";
import styled from "styled-components";

const List = ({ search, title, status, onClick, contents, date, total }) => {
  const [maxLength, setMaxLength] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setMaxLength(100);
      } else {
        setMaxLength(200);
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
              <Title>{title}</Title>
            </div>
            <ContentsBox>
              <Contents>{truncateText(contents, maxLength)}</Contents>
            </ContentsBox>
            <TextBox>
              <CategoryBox>
                <Category>#흡연안함</Category>
                <Category>#4인실</Category>
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
                  <Count>1/{total} 모집 중..</Count>
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
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  height: 100%;
  margin-left: 1vw;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.text4}
  font-size: 25px;
`;

const TextBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

const ContentsBox = styled.div`
  width: 95%;
  height: 11vh;
  display: flex;
  align-items: center;
`;

const Contents = styled.p`
  font-size: 16px;
`;

const CategoryBox = styled.div`
  display: flex;
  gap: 1vw;
`;

const Category = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 15px;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 15px;
`;

const RightBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default List;
