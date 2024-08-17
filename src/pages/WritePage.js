import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../components/Category"
import Button from "../components/Button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { WriteApi } from "../api/WriteApi";
import {CategoryApi} from "../api/CategoryApi";

const dormitoryNames = {
  dormitory3: "3동",
  dormitory4: "4동",
  dormitory5: "5동",
  myoungdeok: "명덕",
  myounghyun: "명현",
};

const WritePage = () => {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [inputTitleCount, setInputTitleCount] = useState(0);
  const [inputCount, setInputCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const maxContentsLength = 500;
  const maxTitleLength = 20;
  const navigate = useNavigate();
  const {name} = useParams();
  const location = useLocation();
  const { total } = location.state || {};

  const onTextareaContentsHandler = (event) => {
    const value = event.target.value;
    if (value.length <= maxContentsLength) {
      setContents(value);
      setInputCount(value.length);
    }
  };

  const onTextareaTitlesHandler = (event) => {
    const value = event.target.value;
    if (value.length <= maxTitleLength) {
      setTitle(value);
      setInputTitleCount(value.length);
    }
  };



  const handleSubmit = async () => {
    try {
      const response = await WriteApi({
        total: total,
        title: title,
        content: contents,
        name: name,
      });
      console.log("게시글 작성 성공:", response);
      navigate(`/dormitory/${name}`)
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await CategoryApi();
        setCategoryData(data.data.categoryResponseDto);
      } catch (error) {
        console.error("카테고리 get 실패:", error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <WrapperWrapper>
      <AllWrapper>
        <Wrapper>
          <DormitoryBox>
            <DormitoryTitle>{dormitoryNames[name]}</DormitoryTitle>
          </DormitoryBox>
          <TitleBox>
            <Title>제목</Title>
            <TitleTitle>
              <TitleWrite 
              placeholder="제목을 입력해주세요(최대 20자)"
              maxLength={20}
              onChange={onTextareaTitlesHandler}
              value={title}
              />
              <CountBox>
                <Count>{inputTitleCount}/20자</Count>
              </CountBox>
            </TitleTitle>
          </TitleBox>
          <CategoryBox>
            <Title>카테고리</Title>
            <CategoryWrapper>
              {categoryData.map((data, index)=>(
                <Category key={index}>{data.category}</Category>
              ))}
            </CategoryWrapper>
          </CategoryBox>
          <ContentsBox>
            <Title>내용</Title>
            <Box>
            <Contents 
            placeholder="내용을 입력해주세요(최대 500자)"
            onChange={onTextareaContentsHandler}
            maxLength={500}
            value={contents}
            >
            </Contents>
              <CountBox>
                <Count>{inputCount}/500자</Count>
              </CountBox>
            </Box>
          </ContentsBox>
          <ButtonBox>
            <Button onClick={()=>navigate(`/dormitory/${name}`)}>취소</Button>
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
  width: 70%;
  height: 100vh;
  display: flex;
  align-items: center;
  margin-bottom: 12vh;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 80%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 5.5vh;
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

const TitleTitle = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  padding-left:10px;
  height: 6vh;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrite = styled.input`
  outline: none;
  border: none;
  width: 85%;
  margin-left: 1.1%;
  background-color: transparent;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    font-size: 16px;
  }

  &:hover{
    outline: none;
  }
`;

const CategoryBox = styled.div`

`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 1.85vw;
  width: 100%;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  height: 40vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-bottom: 1vh;
`;

const Contents = styled.textarea`
  width: 95%;
  height: 33vh;
  margin: 2.5%;
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;

  &:hover{
    outline: none;
  }
`;

const CountBox = styled.div`
  margin-right: 3.8%;
`

const Count = styled.p`
  font-size: 17px;
  color: ${({theme})=>theme.colors.gray};
  white-space: nowrap;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2vw;
  justify-content: end;
`;


export default WritePage;
