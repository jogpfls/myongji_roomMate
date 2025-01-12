import React, { useEffect } from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, title, message, changeName, handleName }) => {

    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onClose();
        }
      };
  
      if (isOpen) {
        window.addEventListener('keydown', handleKeyPress);
      }
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;
  
    return (
      <Overlay>
        <Content>
          <Header>
            <h2>{title}</h2>
            {changeName ? <CloseButton onClick={handleName}>&times;</CloseButton> : 
            <CloseButton onClick={onClose}>&times;</CloseButton>}
          </Header>
          <Body>
            <p>{message}</p>
          </Body>
          <Footer>
            {changeName ? <ConfirmButton onClick={handleName}>확인</ConfirmButton> : 
            <ConfirmButton onClick={onClose}>확인</ConfirmButton>}
          </Footer>
        </Content>
      </Overlay>
    );
  };

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Content = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  position: relative;
  width: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    ${(props) => props.theme.fonts.text5}
    font-size: 25px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Body = styled.div`
  margin: 20px 0;
`;

const Footer = styled.div`
  text-align: right;
`;

const ConfirmButton = styled.button`
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.blue};
`;

export default Modal;
