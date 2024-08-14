import React from "react";
import styled from "styled-components";
import MapImg from "../images/map.png";
import Pin from "../images/pin.png";
import { useNavigate } from "react-router-dom";

const dormLocations = [
  { id: 1, name: "명덕관", top: "27%", left: "22%", link: "/dormitory/" },
  { id: 2, name: "명현관", top: "49%", left: "19%", link: "/dormitory" },
  { id: 3, name: "기숙사 3동", top: "51%", left: "48%", link: "/dormitory" },
  { id: 4, name: "기숙사 4동", top: "37%", left: "64%", link: "/dormitory" },
  { id: 5, name: "기숙사 5동", top: "37%", left: "41%", link: "/dormitory" },
];

const Map = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };
  return (
    <MapContainer>
      <img src={MapImg} alt="Map" style={{ width: "100%", height: "auto" }} />
      {dormLocations.map((dorm) => (
        <DormIcon
          key={dorm.id}
          style={{ top: dorm.top, left: dorm.left }}
          title={dorm.name}
          onClick={() => handleNavigation(dorm.link)}
        >
          <p>{dorm.id}</p>
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
