import React, { useState } from "react";
import styled from "styled-components";
import List from "../components/List";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const DormitoryPage = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Background>
      <Wrapper>
        <TitleBox>
          <Title>명덕</Title>
          <SearchWrapper>
            <div>
              <Search 
              onChange={handleSearchChange} 
              value={search}
              placeholder="찾고 싶은 방을 검색해보세요!"/>
              <SearchButton>검색</SearchButton>
            </div>
          </SearchWrapper>
        </TitleBox>
        <BottomWrapper>
          <ListWrapper>
            <List title="♀ 흡연 안하는 룸메 구해요" search={search}/>
            <List title="♀ 일찍 잠자는 사람 구해요" search={search}/>
            <List title="♀ 담배 X" search={search}/>
            <List title="♀ 흡연 X" search={search}/>
            <List title="♀ 흡연 X" search={search}/>
            <List title="♀ 코골이 X" search={search}/>
            <List title="♀ 같이 친해져요~" search={search}/>
          </ListWrapper>
          <Button onClick={() => navigate("/write")}>글쓰기</Button>
        </BottomWrapper>
      </Wrapper>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 60vw;
  height: 48vw;
  margin: 3.8vw 0;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 8vw;
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.text5}
`;

const SearchWrapper = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  width: 60vw;
  height: 3.5vw;
  border-radius: 0.7vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.input`
  background-color: ${({theme})=>theme.colors.white};
  border: none;
  width: 38vw;
  height: 2.3vw;
  border-radius: 0.5vw;
  outline: none;
  padding: 0 0.8vw;

  &:hover{
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: ${({theme})=>theme.colors.blue2};
  ${({theme})=>theme.fonts.text5}
  font-size: 1.15vw;
  color: ${({theme})=>theme.colors.white};
  width: 5vw;
  height: 2.3vw;
  border-radius: 0.5vw;
  margin-left: 1vw;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({theme})=>theme.colors.blue2C};
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ListWrapper = styled.div`
  width: 60vw;
  height: 30vw;
  margin: 3vw 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1vw;
    background-color: white;
    }

  &::-webkit-scrollbar-thumb {
    background-color:${({theme})=>theme.colors.gray};
  }

  &::-webkit-scrollbar-track {
    background-color:${({theme})=>theme.colors.gray2};
  }

`;

export default DormitoryPage;
