import React from "react";
import styled from "styled-components";

const InfoPage = () => {
  return (
    <Container>
      <Title>자연생활관 입사 안내</Title>

      <Section>
        <SectionTitle>입사 자격</SectionTitle>
        <Text>
          명지대학교 자연캠퍼스에 재학 중인 학부생 및 대학원생은 누구나 생활관
          입사신청을 할 수 있습니다. 단, 휴학 중이거나 수료한 학생은 이용이
          불가능하며, 복학 및 편입생은 복학 신청을 하여 재학생으로 승인된 후에는
          입사신청을 할 수 있습니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>입사 신청 방법</SectionTitle>
        <SubSection>
          <SubSectionTitle>사생 선발 일정 확인</SubSectionTitle>
          <Text>
            생활관 홈페이지 공지사항
            <a
              href="https://dorm.mju.ac.kr/dorm/7792/subview.do"
              target="blank"
            >
              ( https://dorm.mju.ac.kr/dorm/7792/subview.do )
            </a>
            을 확인하세요
          </Text>
        </SubSection>

        <SubSection>
          <SubSectionTitle>신청기간</SubSectionTitle>
          <Text>재학생: 매 학기말 또는 해당 학기 성적 처리 후 (방학 중)</Text>
          <Text>복학생: 복학기간 첫 주 (복학 신청 후)</Text>
          <Text>신입생: 입학 일정에 따라 조정</Text>
          <Notice>
            ※ 기간은 변경될 수 있으며, 생활관 홈페이지에 별도 공고함
          </Notice>
        </SubSection>

        <SubSection>
          <SubSectionTitle>입사 신청 사이트</SubSectionTitle>
          <List>
            <ListItem>
              1. 입사신청 사이트는 입사신청 기간에만 오픈됩니다.
            </ListItem>
            <ListItem>
              2. “신청하기”를 클릭하면 입사신청을 할 수 있는 사이트로
              접속됩니다.
              <List>
                <ListItem>① 아이디와 비밀번호 입력</ListItem>
                <SubText>*[아이디] 학번 혹은 수험번호</SubText>
                <SubText>
                  *[비밀번호] 최초 사용자는 주민등록 기재된 생년월일 6자리 입력
                  후 본인 인증 절차를 거쳐 비밀번호를 변경해야함
                </SubText>
                <ListItem>② 생활관 입사 신청</ListItem>
                <ListItem>
                  ③ 입력 완료 후 저장 (본인 명의 계좌 번호 반드시 기재)
                </ListItem>
                <ListItem>
                  ④ “입사 신청이 완료되었습니다” 라는 메시지 확인
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              3. 입사신청 확인, 보증금 환불 계좌확인 및 수정은 Myiweb에서
              신청기간 내에만 가능합니다.
            </ListItem>
          </List>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>성적+거리점수 순위</SectionTitle>
        <SubSection>
          <SubSectionTitle>성적점수</SubSectionTitle>
          <Text>가장 최근 부여 받은 학기 성적 적용 (평균 평점이 아님)</Text>
        </SubSection>
        <SubSection>
          <SubSectionTitle>거리점수</SubSectionTitle>
          <Text>
            거리점수는 본인의 최초 입사신청일 이전 주소가 반영되므로, 사전에
            Myiweb 자동입력창 (개인정보)에서 주소를 미리 확인하세요. 주소가
            변경되었을 경우에는 우선 개인정보를 변경한 후에 지원서를 작성해야
            합니다.
          </Text>
          <Text>
            → 최초 입사 신청 시 주소 미변경 상태로 입사 신청할 경우 거리 점수가
            반영되지 않습니다.
          </Text>
          <Text>
            → 추후 주소를 변경하더라도 최초 입사 신청 시의 주소가 반영되어 거리
            점수는 반영되지 않음에 주의하세요.
          </Text>
          <DistanceTable>
            <TableRow>
              <TableCell>
                <p>A (1점)</p>
              </TableCell>
              <TableCell>용인 전지역</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>B (1.5점)</p>
              </TableCell>
              <TableCell>
                서울 한강이남, 수원, 성남, 이천, 광주(경기), 과천, 안양, 군포,
                의왕, 오산, 평택, 안성
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>C (2점)</p>
              </TableCell>
              <TableCell>서울 한강이북, 광명, 안산, 시흥, 하남, 화성</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>D (2.5점)</p>
              </TableCell>
              <TableCell>
                인천, 부천, 여주, 양평, 남양주, 양주, 고양, 김포, 구리, 의정부
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>E (3점)</p>
              </TableCell>
              <TableCell>
                강화, 파주, 동두천, 가평, 연천, 포천, 강원도, 충청도 이남 전지역
              </TableCell>
            </TableRow>
          </DistanceTable>
        </SubSection>
        <SubSection>
          <SubSectionTitle>우선선발</SubSectionTitle>
          <Text>장애학생 및 생활보호대상자, 차상위 계층 우선선발</Text>
          <Text>(입사신청 기간에 관리팀으로 증빙서류 제출)</Text>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>서류 제출 관련 사항</SectionTitle>
        <Text>
          증빙서류는 최근 한달 이내 발급받은 서류로, 성명 옆에 학번과 연락처를
          기재하여 제출해야 하며, 주민센터(읍,면,동사무소)에서 발급받은 서류만
          인정됩니다. 입사신청서에 기재하여야하는 은행 계좌는 환불(열쇠보증금
          등)을 위해 필요한 것으로, 반드시 본인명의계좌를 작성해야 합니다. 타인
          명의 계좌 작성 시 환불되지 않는 점 유의 바랍니다.
        </Text>
        <Text>서류 제출관련문의 ☎ 031-330-6082</Text>
      </Section>

      <Section>
        <SectionTitle>자연생활관 합격자 발표 및 등록</SectionTitle>
        <Text>홈페이지 접속하여 선발 여부 확인</Text>
        <List>
          <ListItem>
            1. 선발 일정에 맞춰 생활관 홈페이지 로그인한 후, "합격 및
            등록조회"를 눌러 확인합니다.
          </ListItem>
          <ListItem>
            2. 합격되었다면 합격자 발표 안내문을 참고하여 등록기간 내 생활관비를
            납입합니다.
          </ListItem>
          <ListItem>
            3. 생활관 홈페이지의 합격 등록 조회는 합격발표 후 조회가 가능한
            메뉴입니다.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>자연생활관 입사 순서</SectionTitle>
        <List>
          <ListItem>1. 합격 여부를 확인합니다.</ListItem>
          <ListItem>
            2. 합격자는 합격자 발표 안내문을 숙지한 후, 등록 고지서를
            출력합니다.
          </ListItem>
          <ListItem>
            3. 등록기간을 확인하여, 기간 내 해당 은행으로 고지서를 지참하고 가신
            후, 생활관비를 납부합니다.
          </ListItem>
          <Notice>
            ※ 생활관비는 고지서를 통해서만 납부 가능하며, 신용카드는 받고 있지
            않습니다.
          </Notice>
          <Notice>
            ※ 이름(학번)이 확인되지 않을 경우에는 등록기간 내 생활관비를
            납부하였더라도 합격이 취소되며, 기간 내에 등록을 하지 않을 경우에도
            합격이 자동 취소됩니다.
          </Notice>
        </List>
      </Section>

      <Section>
        <SectionTitle>입사</SectionTitle>
        <List>
          <ListItem>
            1. 등록고지서로 등록기간 내 등록을 완료하였다면 입사 일정을
            확인합니다.
          </ListItem>
          <ListItem>
            2. 입사 일정에 개인 물품을 챙겨서 본인이 합격한 건물 현관으로
            가시면, 배정된 호실 번호를 확인할 수 있습니다.
          </ListItem>
          <ListItem>
            3. 배정 호실을 확인한 후 각동 사감실에서 본인 확인 절차를 마치고
            열쇠, 시트, 휴지(추후 지급)를 지급받아 본인의 호실로 입실하여,
            비품의 파손 여부를 확인합니다.
          </ListItem>
          <ListItem>
            4. 파손된 물품이 있다면 각동 사감실로 입사 후 일주일 이내 신고하여야
            하며, 신고하지 않을 경우 추후 배상 등의 책임을 묻습니다.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>자연생활관 입사 약속</SectionTitle>
        <Text>함께하는 공동생활에서 이것만은 꼭 지켜주세요!</Text>
        <List>
          <ListItem>
            1. 배정된 호실이 마음에 들지 않을 수 있습니다. 그렇다고 임의대로
            호실을 바꿀 수 없습니다.
          </ListItem>
          <ListItem>
            2. 출입키는 생활관 내에서는 항상 소지합니다. 지급받은 출입키는
            생활관 내에서 신분증과 같은 역할을 합니다.
          </ListItem>
        </List>
      </Section>
    </Container>
  );
};

export default InfoPage;

const Container = styled.div`
  padding: 40px;
  max-width: 70%;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  margin-top: 70px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 50px;
  color: ${(props) => props.theme.colors.deepBlue};
  ${(props) => props.theme.fonts.title}
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 35px;
    width: 150px;
    margin: auto;
    margin-bottom: 40px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 15px;
  color: ${(props) => props.theme.colors.deepBlue};
  border-bottom: 1.6px solid ${(props) => props.theme.colors.deepBlue2};
  padding-bottom: 5px;
  ${(props) => props.theme.fonts.text5}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 22px;
  }
`;

const SubSection = styled.div`
  margin-bottom: 25px;
`;

const SubSectionTitle = styled.h3`
  font-size: 1.15em;
  margin-bottom: 7px;
  color: #7f8c8d;
  color: ${(props) => props.theme.colors.blue};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
    margin-bottom: 3px;
  }
`;

const Text = styled.p`
  font-size: 1em;
  line-height: 1.5em;
  color: #2c3e50;
  a {
    font-size: 0.8em;
    &:hover {
      color: ${(props) => props.theme.colors.blue2};
    }
    word-wrap: break-word;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      line-height: 1em;
      font-size: 13px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
    line-height: 1.3em;
  }
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 10px;
  color: #2c3e50;
  line-height: 1.5em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 5px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  font-size: 1em;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
    line-height: 1.3em;
  }
`;

const SubText = styled.p`
  font-size: 0.8em;
  margin-left: 20px;
  color: ${(props) => props.theme.colors.gray};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.3em;
  }
`;

const Notice = styled.p`
  font-size: 0.8em;
  color: red;
  margin-top: 5px;
  line-height: 1.2em;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.2em;
  }
`;

const DistanceTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  font-size: 0.8em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  p {
    font-weight: 500;
    ${(props) => props.theme.fonts.text5}
    font-size: 1.2em;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 12px;
      line-height: 1.2em;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.2em;
  }
`;
