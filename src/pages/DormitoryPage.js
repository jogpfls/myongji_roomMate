import React, { useState } from "react";
import styled from "styled-components";
import List from "../components/List";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import SearchImg from "../images/search.svg";

const DormitoryPage = () => {
  const [search, setSearch] = useState('');
  const [filteredSearch, setFilteredSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchClick = () => {
    setFilteredSearch(search);
  };

  return (
    <Background>
      <Wrapper>
        <TitleBox>
          <Title>명덕</Title>
          <SearchBox>
          <Search 
              onChange={handleSearchChange} 
              value={search}
              placeholder="찾고 싶은 방을 검색해보세요!"></Search>
              <SearchButton src={SearchImg} alt="검색" onClick={handleSearchClick}/>
              <Button onClick={() => navigate("/write")}>글쓰기</Button>
          </SearchBox>
        </TitleBox>
        <BottomWrapper>
          <ListWrapper>
            <List title="♀ 흡연 안하는 룸메 구해요" search={filteredSearch}/>
            <List title="♀ 일찍 잠자는 사람 구해요" search={filteredSearch}/>
            <List title="♀ 담배 X" search={filteredSearch}/>
            <List title="♀ 흡연 X" search={filteredSearch}/>
            <List title="♀ 흡연 X" search={filteredSearch}/>
            <List title="♀ 코골이 X" search={filteredSearch}/>
            <List title="♀ 같이 친해져요~" search={filteredSearch}/>
            <List title="♀ 같이 친해져요~" search={filteredSearch}/>
            <List title="♀ 같이 친해져요~" search={filteredSearch}/>
            <List title="♀ 같이 친해져요~" search={filteredSearch}/>
            <List title="♀ 흡연 X" search={filteredSearch} status="모집완료"/>
            
          </ListWrapper>
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
  width: 70%;
  margin: 4.5vh 0;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 15vh;
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.title}
  font-size: 45px;
`;

const SearchBox = styled.div`
position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Search = styled.input`
  background-color: ${({theme})=>theme.colors.white};
  border: solid 1px ${({theme})=>theme.colors.gray2};
  width: 84%;
  height: 40px;
  border-radius: 8px;
  outline: none;
  padding: 0 1.8vh;

  &:hover{
    outline: none;
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
  position: absolute;
  right: 14.5%;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ListWrapper = styled.div`
  width: 100%;
  margin: 1vh 0;
  display: flex;
  flex-direction: column;
`;

export default DormitoryPage;
