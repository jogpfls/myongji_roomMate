import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <AllWrapper>
      <Wrapper>
        <TitleBox>
          <LoginText>통합로그인(SSO)</LoginText>
          <IntegrationText>
            통합로그인은 한번의 로그인을 통하여 우리대학 전체 시스템에 추가 로그인 없이 이용 하실 수 있는 서비스 입니다.
          </IntegrationText>
          <IntegrationText>
            Single Sign login is a service that allows you to use our entire system without additional login through one login.
          </IntegrationText>
        </TitleBox>
        <LoginBox>
          <AllFilledBox>
            <FilledBox>
              <Text>아이디</Text>
              <InputFilledBox>
                <InputFilled 
                  placeholder="학번(601234)을 입력해주세요"
                  type="id"
                  onChange={(event)=>setId(event.target.value)}
                />
              </InputFilledBox>
            </FilledBox>
            <FilledBox>
              <Text>비밀번호</Text>
              <InputFilledBox>
                <InputFilled 
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={(event)=>setPassword(event.target.value)}
                />
              </InputFilledBox>
            </FilledBox>
          </AllFilledBox>
          {password === '' || id === ''
          ? <LoginButton status="none">로그인</LoginButton> 
          : <LoginButton onClick={()=>navigate('/')} >로그인</LoginButton>}
        </LoginBox>
      </Wrapper>
    </AllWrapper>
  );
};

const AllWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 95vh;
  background-color: ${({theme})=>theme.colors.gray3};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8vh;
  margin-top: 10vh;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 85vw;
    margin-top: 8vh;
  }
`;

const LoginText = styled.p`
  ${({theme})=>theme.fonts.title}
  font-size: 40px;
  margin-bottom: 1.5vh;
  white-space: nowrap;
`;

const IntegrationText = styled.p`
  font-size: 17px;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    font-size: 20px;
    text-align: center;
  }
`;

const LoginBox = styled.div`
  background-color: ${({theme})=>theme.colors.white};
  width: 45vw;
  height: 55vh;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6vh;
  margin-top: 3vh;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 80vw;
    height: 50vh;
    margin-top: 5vh;
  }
`;

const AllFilledBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  gap: 1.5vw;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 60vw;
    gap: 4vh;
  }
`;

const FilledBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputFilledBox = styled.div`
  display: flex;
`;

const InputFilled = styled.input`
  background-color: ${({theme})=>theme.colors.white};
  width: 30vw;
  height: 7vh;
  border: solid ${({theme})=>theme.colors.gray2} 1.5px;
  border-radius: 1vw;
  padding-left: 1vw;
  outline: none;

  &::placeholder{
    color: ${({theme})=>theme.colors.gray};
    ${({theme})=>theme.fonts.default};
    font-size: 1.8vh;
  }

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 60vw;
  }
`;

const Text = styled.div`
  ${({theme})=>theme.fonts.text4};
  font-size: 2vh;
  width: 10vw;
  padding-left: 0.5vw;
  margin-bottom: 0.5vh;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: auto;
  }
`;

const LoginButton = styled.button`
  background-color: ${({theme, status})=> status === 'none' ? theme.colors.blue3 : theme.colors.deepBlue2};
  color: ${({theme})=>theme.colors.white};
  width: 30vw;
  height: 7vh;
  border-radius: 15px;
  ${({theme})=>theme.fonts.text5};
  border: none;
  outline: none;
  transition: background-color 0.2s;

  &:hover{
    background-color: ${({theme, status})=>status === 'none' ? 'none' : theme.colors.deepBlue};
  }

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 60vw;
  }
`;

export default Login;
