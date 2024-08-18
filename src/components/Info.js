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
    if (newItem.trim()) {
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
        console.error("Info추가에 실패했습니다.", error);
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
      addItem();
    }
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
            onKeyDown={handleKeyDown}
            placeholder="새 항목 추가"
          />
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 73vw;
    margin-bottom: 1vh;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.deepBlue2};
  margin-right: 10px;
  outline: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 75%;
    border-radius: 10px;
  }
`;

const AddButton = styled.button`
  width: 6vw;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.deepBlue2};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 12vw;
    border-radius: 10px;
    white-space: nowrap;
  }
`;
