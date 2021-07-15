import React from "react";
import styled from "styled-components/native";
import { Card } from "react-native-paper";

const EventCard = styled(Card)`
  background-color: white;
  margin-bottom: 10px;
`;
const EventCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const ChurchTitle = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Address = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;
const GraphicLocation = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const EventInfoCard = ({ rally = {} }) => {
  // const {} = useContext(StorageContext);
  let {
    uid = rally.uid,
    eventDate = rally.eventDate,
    startTime = rally.startTime,
    endTime = rally.endTime,
    churchName = rally.name,
    street = rally.street,
    city = rally.city,
    stateProv = rally.stateProv,
    postalCode = rally.postalCode,
    graphic = rally.graphic,
  } = rally;
  let s3Graphic =
    "https://pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev.s3.amazonaws.com/public/events/" +
    graphic;
  return (
    <>
      <EventCard elevation={5}>
        <EventCardCover key={churchName} source={{ uri: s3Graphic }} />
        <Info>
          <ChurchTitle>{churchName}</ChurchTitle>
          <Address>
            {city}, {stateProv}
          </Address>
          <GraphicLocation>{graphic}</GraphicLocation>
        </Info>
      </EventCard>
    </>
  );
};
export default EventInfoCard;
