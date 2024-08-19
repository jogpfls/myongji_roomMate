import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MapImg from "../images/map.png";
import Pin from "../images/pin.png";
import { useNavigate } from "react-router-dom";
import { fetchDormitoryCounts } from "../api/MainApi";

const dormitoryNames = {
  dormitory3: "기숙사 3동",
  dormitory4: "기숙사 4동",
  dormitory5: "기숙사 5동",
  myoungdeok: "명덕관",
  myounghyun: "명현관",
};

const dormLocations = [
  {
    id: 1,
    name: "myoungdeok",
    top: "25%",
    left: "22%",
    link: "/dormitory/myoungdeok",
  },
  {
    id: 2,
    name: "myounghyun",
    top: "47%",
    left: "18%",
    link: "/dormitory/myounghyun",
  },
  {
    id: 3,
    name: "dormitory3",
    top: "50%",
    left: "48%",
    link: "/dormitory/dormitory3",
  },
  {
    id: 4,
    name: "dormitory4",
    top: "35%",
    left: "63%",
    link: "/dormitory/dormitory4",
  },
  {
    id: 5,
    name: "dormitory5",
    top: "36%",
    left: "40%",
    link: "/dormitory/dormitory5",
  },
];

const Map = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countData = await fetchDormitoryCounts(dormLocations);
        setCounts(countData);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };

    fetchData();
  }, []);

  const handleCirClick = (path) => {
    navigate(path);
  };

  return (
    <MapContainer>
      <img src={MapImg} alt="Map" style={{ width: "100%", height: "auto" }} />
      {dormLocations.map((dorm) => (
        <DormIcon
          key={dorm.id}
          style={{ top: dorm.top, left: dorm.left }}
          title={`${dormitoryNames[dorm.name]} (${counts[dorm.name] || 0})`}
          onClick={() => handleCirClick(dorm.link)}
        >
          <p>{counts[dorm.name] || 0}</p>
        </DormIcon>
      ))}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  img {
    border-radius: 5px;
    opacity: 0.8;
  }
`;

const DormIcon = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 0, 0);
  opacity: 0.6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.5);
    opacity: 0.8;
  }

  background: url(${Pin}) no-repeat center center;
  background-size: contain;

  p {
    margin-bottom: 8px;
    font-size: 15px;
    color: red;
  }
`;

export default Map;
