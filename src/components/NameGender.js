import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { nameGenderApi } from '../api/MyApi';

const NameGender = ({closeModal}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (name && gender) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [name, gender]);

  const handleGenderSelect = (selectedGender) => {
    setGender(gender === selectedGender ? '' : selectedGender);
  };

  const handleSubmit = async() => {
    if (name && gender) {
      await nameGenderApi(name, gender);
      closeModal();
    } else {
      alert("이름과 성별을 모두 입력해주세요.");
    }
  };

  return (
    <Background>
      <Wrapper>
        <Box>
        <InputFilledBox>
        <TitleBox>
          <Title>이름</Title>
          <InputFilled onChange={(e)=>setName(e.target.value)}>
          </InputFilled>
        </TitleBox>
        <div>
          <TitleBox>
            <Title>성별</Title>
            <BtnBox>
              <Btn 
                selected={gender === "female"}
                onClick={() => handleGenderSelect("female")}
              >
                ♀ 여성
              </Btn>
              <Btn 
                selected={gender === "male"}
                onClick={() => handleGenderSelect("male")}
              >
                ♂ 남성
              </Btn>
            </BtnBox>
          </TitleBox>
        </div>
        </InputFilledBox>
        <div>
          <ButtonBox>
          <InfoText>성별은 한번 설정하고 난 뒤 수정할 수 없습니다.</InfoText>
            <Submit onClick={handleSubmit} status={status}>제출</Submit>
          </ButtonBox>
        </div>
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
  width: 400px;
  height: 250px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 270px;
    height: 200px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 10px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 240px;
  }
`;

const InputFilledBox = styled.div`
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 33px;
  margin-bottom: 4px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 240px;
    gap: 20px;
  }

`;

const InputFilled = styled.input`
  background-color: ${({theme})=>theme.colors.gray3};
  width: 287px;
  height: 53px;
  border-radius: 7px;
  padding-left: 18px;
  
  outline: none;
  &:hover{
    outline: none;
  }

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 200px;
    height: 45px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 287px;
  justify-content: space-between;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 200px;
  }
`;

const Btn = styled.button`
  ${({ theme }) => theme.fonts.default};
  width: 130px;
  height: 50px;
  border-radius: 7px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.lightBlueC : theme.colors.lightBlue};

    @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 90px;
    height: 40px;
    font-size: 18px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  gap: 18px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    gap: 10px;
  }
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
  margin-bottom: 5px;
  margin-left: 7px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 125px;
    margin-left: 15px;
  }

`;

const ButtonBox = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding-right: 10px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 250px;
    padding-right: 0;
  }
`;

const Submit = styled.button`
  ${({theme})=>theme.fonts.default};
  width: 100px;
  height: 40px;
  border-radius: 7px;
  background-color: ${({theme, status}) =>
    status ? theme.colors.lightBlueC : theme.colors.gray2};


  &:hover{
    background-color: ${({theme, status})=>status ? theme.colors.deepBlue2 : "none"};
    color: ${({theme, status})=>status ? theme.colors.white : "none"};
  }

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    height: 35px;
    width: 90px;
    font-size: 18px;
  }
`;

export default NameGender;