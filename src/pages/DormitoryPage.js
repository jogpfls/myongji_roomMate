import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import List from "../components/List";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import SearchImg from "../images/search.svg";
import { fetchDormitoryPosts } from "../api/DormitoryApi";
import CountChoseBox from "../components/CountChoseBox";

const dormitoryNames = {
  dormitory3: "3동",
  dormitory4: "4동",
  dormitory5: "5동",
  myoungdeok: "명덕",
  myounghyun: "명현",
};

const DormitoryPage = () => {
  const { name } = useParams();
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [choseModal, setChoseModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDormitoryPosts(name).then((boardDtoList) => {
      setPosts(boardDtoList);
    });
  }, [name]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    setFilteredSearch(search);
  };

  const openModal = () => {
    setChoseModal(true);
  };

  const closeModal = () => {
    setChoseModal(false);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filteredSearch.toLowerCase())
  );

  const handleNavigate = (post) => {
    const path = `/dormitory/${name}/room/${post.id}`;
    navigate(path);
  };

  if (!posts) {
    return (
      <LoadingContainer>
        <Loading />
        <LoadingText>loading</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Background>
      <Wrapper>
        <TitleBox>
          <Title>{dormitoryNames[name]}</Title>
          <HighSearchBox>
            <SearchBox>
              <Search
                onChange={handleSearchChange}
                value={search}
                placeholder="찾고 싶은 방을 검색해보세요!"
              ></Search>
              <SearchButton
                src={SearchImg}
                alt="검색"
                onClick={handleSearchClick}
              />
            </SearchBox>
            {name === "dormitory3" || name === "myounghyun" ? (
              <Button onClick={openModal}>글쓰기</Button>
            ) : (
              <Button
                name={name}
                onClick={() => navigate(`/dormitory/${name}/write`)}
              >
                글쓰기
              </Button>
            )}
          </HighSearchBox>
        </TitleBox>
        <BottomWrapper>
          <ListWrapper>
            {filteredPosts.map((post) => (
              <List
                key={post.id}
                title={post.title}
                contents={post.content}
                search={filteredSearch}
                status={post.status}
                date={post.createdAt}
                total={post.total}
                category={post.categoryList}
                current={post.current}
                gender={post.gender}
                onClick={() => handleNavigate(post)}
              />
            ))}
          </ListWrapper>
        </BottomWrapper>
      </Wrapper>
      {choseModal && <CountChoseBox name={name} closeModal={closeModal} />}
    </Background>
  );
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LoadingContainer = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  justify-content: center;
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.lightBlue};
  border-top: 2px solid ${({ theme }) => theme.colors.deepBlue};
  border-right: 2px solid ${({ theme }) => theme.colors.deepBlue};
  animation: ${rotate} 1.8s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.deepBlue};
  text-transform: uppercase;
  animation: ${fadeInOut} 2s linear infinite;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: 4.5vh 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 15vh;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.title}
  font-size: 45px;
`;

const HighSearchBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray2};
  width: 90%;
  height: 40px;
  border-radius: 8px;
  padding: 0 1.8vh;
  margin-right: 2vh;

  &:hover {
    outline: none;
  }
`;

const Search = styled.input`
  border: none;
  outline: none;
  width: 80%;

  &:hover {
    outline: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 15px;
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
  width: 30px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
`;

export default DormitoryPage;
