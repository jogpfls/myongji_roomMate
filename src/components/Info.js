import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserCategories,
  addUserCategory,
  deleteUserCategory,
} from "../api/MyApi";

const Info = ({ isEditing }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const response = await getUserCategories();
        const categories = response.data.categoryResponseDto.map(
          (category) => ({
            id: category.id,
            label: category.category,
          })
        );
        setItems(categories);
      } catch (error) {
        console.error("info 목록을 가져오는데 실패했습니다.", error);
      }
    };

    fetchUserCategories();
  }, []);

  const addItem = async () => {
    if (isSubmitting) return;
    if (newItem.trim()) {
      setIsSubmitting(true);
      try {
        await addUserCategory(newItem.trim());
        const response = await getUserCategories();
        const categories = response.data.categoryResponseDto.map(
          (category) => ({
            id: category.id,
            label: category.category,
          })
        );
        setItems(categories);
        setNewItem("");
      } catch (error) {
        console.error("Info 추가에 실패했습니다.", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const removeItem = async (index) => {
    const categoryId = items[index].id;
    try {
      await deleteUserCategory(categoryId);
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    } catch (error) {
      console.error("카테고리를 삭제하는 데 실패했습니다.", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 10) {
      setNewItem(inputText);
      setCount(inputText.length);
    }
  };

  return (
    <BoxListContainer>
      <ItemsContainer>
        {items.length === 0 ? (
          <>
            <BoxItem status="보기" >
              <SquareBox isPlaceholder />
              <PlaceholderLabel>ex. 비흡연자 선호</PlaceholderLabel>
            </BoxItem>
            <BoxItem>
              <SquareBox isPlaceholder />
              <PlaceholderLabel>ex. 청결중요</PlaceholderLabel>
            </BoxItem>
            <BoxItem>
              <SquareBox isPlaceholder />
              <PlaceholderLabel>ex. 아침형인간</PlaceholderLabel>
            </BoxItem>
          </>
        ) : (
          items.map((item, index) => (
            <BoxItem key={index}>
              <SquareBox>
                {isEditing && (
                  <RemoveButton onClick={() => removeItem(index)}>
                    X
                  </RemoveButton>
                )}
              </SquareBox>
              <Label>{item.label}</Label>
            </BoxItem>
          ))
        )}
      </ItemsContainer>
      {isEditing && (
        <AddItemContainer>
          <InputBox>
            <Input
              type="text"
              value={newItem}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="새 항목 추가"
            />
            <Count>{count}/10</Count>
          </InputBox>
          <AddButton onClick={addItem}>추가</AddButton>
        </AddItemContainer>
      )}
    </BoxListContainer>
  );
};

export default Info;

const BoxListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  gap: 3% 6%;
  justify-content: flex-start;
  align-content: flex-start;
  margin-top: 1vh;
  margin-left: 1px;

  @media (max-width: 1070px) {
    display: inline;
    flex-wrap: none;
    gap: none;
  }
`;

const BoxItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-basis: ${({status})=>status !== "보기" && "calc(50% - 1.1vw)"};
  

  @media (max-width: ${({theme})=>theme.breakpoints.tablet}) {
    flex-basis: none;
  }
`;

const SquareBox = styled.div`
  width: 23px;
  height: 23px;
  background-color: ${(props) =>
    props.isPlaceholder ? props.theme.colors.gray2 : props.theme.colors.blue2};
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
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`;

const PlaceholderLabel = styled(Label)`
  color: ${(props) => props.theme.colors.gray};
`;

const AddItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 73vw;
    margin-bottom: 1vh;
  }
`;

const InputBox = styled.div`
  width: 19.3vw;
  padding:8px 0;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.deepBlue2};
  margin-right: 10px;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 75%;
    border-radius: 10px;
    margin-right: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 75%;
    border-radius: 10px;
  }
`;

const Input = styled.input`
  font-size: 16px;
  outline: none;
  padding-left: 8px;
  width: 15vw;

  &:hover{
    outline: none;
  }
`;

const Count = styled.p`
  font-size: 13px;
  margin-right: 8px;
`;

const AddButton = styled.button`
  width: 6vw;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.deepBlue2};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 12vw;
    border-radius: 10px;
    white-space: nowrap;
  }
`;
