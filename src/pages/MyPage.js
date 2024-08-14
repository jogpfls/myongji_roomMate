import React, { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "../components/Button";
import MyList from "../components/MyList";
import next from "../images/next.svg";
import back from "../images/back.svg";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const listWrapperRef = useRef(null);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleNext = () => {
    if (listWrapperRef.current) {
      const scrollAmount = window.innerWidth * 0.26;
      listWrapperRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleBack = () => {
    if (listWrapperRef.current) {
      const scrollAmount = window.innerWidth * 0.26;
      listWrapperRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container>
      <LRBox>
        <Left>
          <Title>개인정보</Title>
          <TBox>
            <Profile>
              <Img></Img>
              <Name>김희수</Name>
            </Profile>
            <Info>
              소속: 정보통신공학과 <br />
              구분: ICT학부
              <br />
              학년: 4
            </Info>
          </TBox>
          <Title>내가 쓴 글</Title>
          <BBox>
            <WriteList>
            <Back src={back} alt="화살표" onClick={handleBack} />
              <ListWrapper ref={listWrapperRef}>
                <MyList title="흡연"/>
                <MyList title="나나나"/>
              </ListWrapper>
              <Next src={next} alt="화살표" onClick={handleNext}/>
            </WriteList>
          </BBox>
        </Left>
        <Right>
          <Title>INFO</Title>
          <LBox>
            <BoxList isEditing={isEditing} />
          </LBox>
        </Right>
      </LRBox>
      <BtnBox>
        {isEditing && <CancelButton onClick={handleCancel}>취소</CancelButton>}
        <Button
          onClick={() => setIsEditing(!isEditing)}
          bgc={isEditing ? theme.colors.deepBlue2 : theme.colors.blue2}
        >
          {isEditing ? "저장하기" : "수정하기"}
        </Button>
      </BtnBox>
    </Container>
  );
};

const BoxList = ({ isEditing }) => {
  const [items, setItems] = useState([
    { label: "금연" },
    { label: "아침형인간" },
    { label: "결벽증" },
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { label: newItem }]);
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <BoxListContainer>
      <ItemsContainer>
        {items.map((item, index) => (
          <BoxItem key={index}>
            <SquareBox>
              {isEditing && (
                <RemoveButton onClick={() => removeItem(index)}>X</RemoveButton>
              )}
            </SquareBox>
            <Label>{item.label}</Label>
          </BoxItem>
        ))}
      </ItemsContainer>
      {isEditing && (
        <AddItemContainer>
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="새 항목 추가"
          />
          <AddButton onClick={addItem}>추가</AddButton>
        </AddItemContainer>
      )}
    </BoxListContainer>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
  height: 95vh;
`;

const LRBox = styled.div`
  width: 100%;
  min-height: 600px;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
`;

const Left = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  margin-left: 13px;
  ${(props) => props.theme.fonts.text4}
  font-size: 27px;
`;

const TBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 70%;
  min-height: 300px;
  background-color: ${(props) => props.theme.colors.white};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  width: 100%;
  padding: 30px;
`;

const Profile = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Img = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const Name = styled.div`
  margin-top: 10px;
`;
const Info = styled.div`
  width: 60%;
  line-height: 1.5em;
`;

const BBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 30%;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 100%;
  min-height: 450px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: -6vh;
`;

const BoxListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const BoxItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const SquareBox = styled.div`
  width: 23px;
  height: 23px;
  background-color: ${(props) => props.theme.colors.blue2};
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  width: 23px;
  height: 23px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.colors.blue2};
  color: white;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue2C};
  }
`;

const Label = styled.div`
  margin-left: 10px;
  font-size: 20px;
`;

const AddItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.deepBlue2};
  margin-right: 10px;
`;

const AddButton = styled.button`
  width: 6vw;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.deepBlue2};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: ${(props) => props.theme.colors.white};
`;

const WriteList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72%;
  position: relative;
`;

const Back = styled.img`
  width: 30px;
  position: absolute;
  cursor: pointer;
  z-index: 999;
  left: -14%;
`;

const ListWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  gap: 1vw;
  scroll-behavior: smooth;
`;

const Next = styled.img`
  width: 30px;
  position: absolute;
  left: 105%;
  cursor: pointer;
  z-index: 999;
`;

export default MyPage;
