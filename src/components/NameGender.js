import React from 'react';
import styled from 'styled-components';

const NameGender = ({closeModal}) => {

  const handleSubmit = () => {
    closeModal();
  }
  return (
    <Background>
      <Wrapper>
        <Box>
        <InputFilledBox>
        <TitleBox>
          <Title>이름</Title>
          <InputFilled>
          </InputFilled>
        </TitleBox>
        <div>
          <TitleBox>
            <Title>성별</Title>
            <BtnBox>
              <BtnW>♀ 여성</BtnW>
              <BtnM>♂ 남성</BtnM>
            </BtnBox>
          </TitleBox>
        </div>
        </InputFilledBox>
        <ButtonBox>
        <InfoText>성별은 한번 설정하고 난 뒤 수정할 수 없습니다.</InfoText>
          <Submit onClick={handleSubmit}>제출</Submit>
        </ButtonBox>
        </Box>
      </Wrapper>
    </Background>
  );
};

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.colors.white};
  width: 50vw;
  height: 30vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 2vh 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 1.2vh;

`;

const InputFilledBox = styled.div`
  width: auto;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5vh;
  margin-bottom: 0.5vh;
`;

const InputFilled = styled.input`
  background-color: ${({theme})=>theme.colors.gray3};
  width: 36vw;
  height: 7vh;
  border-radius: 7px;
  padding-left: 2vw;
  
  outline: none;
  &:hover{
    outline: none;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 36vw;
  justify-content: space-between;
`;

const BtnW = styled.button`
  ${({theme})=>theme.fonts.default};
  width: 17vw;
  height: 6vh;
  border-radius: 7px;
  background-color: ${({theme})=>theme.colors.lightBlue};

  &:hover{
    background-color: #FFEBEB;
  }
`;

const BtnM = styled.button`
  ${({theme})=>theme.fonts.default};
  width: 17vw;
  height: 6vh;
  border-radius: 7px;
  background-color: ${({theme})=>theme.colors.lightBlue};

  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlueC};
  }
`;

const TitleBox = styled.div`
  display: flex;
  gap: 2vw;
`;

const Title = styled.p`
  color: ${({theme})=>theme.colors.deepBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({theme})=>theme.fonts.text4}
  font-size: 20px;
`;

const InfoText = styled.p`
  ${({theme})=>theme.fonts.text4};
  font-size: 13px;
  color: ${({theme})=>theme.colors.red};
  margin-bottom: 0.7vh;
  margin-left: 0.8vw;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Submit = styled.button`
  ${({theme})=>theme.fonts.default};
  width: 10vw;
  height: 5vh;
  border-radius: 7px;
  background-color: ${({theme})=>theme.colors.gray2};

  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlueC};
  }
`;

export default NameGender;