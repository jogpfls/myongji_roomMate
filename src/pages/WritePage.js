import React, { useState } from "react";
import styled from "styled-components";
import Category from "../components/Category"
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const WritePage = () => {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/room')
  }

  return (
    <WrapperWrapper>
      <AllWrapper>
        <Wrapper>
          <DormitoryBox>
            <DormitoryTitle>명덕</DormitoryTitle>
          </DormitoryBox>
          <TitleBox>
            <Title>제목</Title>
            <TitleWrite 
            placeholder="제목을 입력해주세요(최대 20자)"
            onChange={(event)=>setTitle(event.target.value)}
            />
          </TitleBox>
          <CategoryBox>
            <Title>카테고리</Title>
            <CategoryWrapper>
              <Category add="작성">흡연 안함</Category>
              <Category add="작성">4인실</Category>
              <Category add="작성">2인실</Category>
              <Category add="작성">여자</Category>
              <Category add="작성">남자</Category>
              <Category add="작성">+ 추가</Category>
            </CategoryWrapper>
          </CategoryBox>
          <ContentsBox>
            <Title>내용</Title>
            <Contents 
            placeholder="내용을 입력해주세요(최대 500자)"
            onChange={(event) => setContents(event.target.value)}
            />
          </ContentsBox>
          <ButtonBox>
            <Button onClick={()=>navigate('/dormitory')}>취소</Button>
            {title === '' || contents === ''? 
            <Button 
            bgc={({theme})=>theme.colors.blue3}
            hoverColor={({theme})=>theme.colors.blue3}
            >작성하기</Button> : 
            <Button onClick={()=>handleSubmit()}>작성하기</Button>}
          </ButtonBox>
        </Wrapper>
      </AllWrapper>
    </WrapperWrapper>
  );
};

const WrapperWrapper = styled.div`
  display: flex;
  justify-content: center;

`;

const AllWrapper = styled.div`
  width: 75%;
  height: 95vh;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DormitoryBox = styled.div`
  display: flex;
  justify-content: center;
`;

const DormitoryTitle = styled.p`
  ${({theme})=>theme.fonts.title}
  font-size: 40px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.text4}
  font-size: 20px;
  margin-bottom: 7px;
  margin-left: 8px;
`;


const TitleWrite = styled.input`
  background-color: ${({theme})=>theme.colors.lightBlue};
  padding-left:10px;
  height: 6vh;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 20px;

  &:hover{
    outline: none;
  }
`;

const CategoryBox = styled.div`

`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 2vw;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.input`
  background-color: ${({theme})=>theme.colors.lightBlue};
  padding-left:10px;
  height: 40vh;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 20px;

  &:hover{
    outline: none;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2vw;
  justify-content: end;
`;


export default WritePage;
