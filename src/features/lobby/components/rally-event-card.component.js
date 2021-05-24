import React from "react";
import styled from "styled-components/native";
import { Text, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const RallyCard = styled(Card)`
  background-color: white;
  margin-bottom: 10px;
`;
const RallyCardCover = styled(Card.Cover)`
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

export const RallyEvent = ({ rally = {} }) => {
  const {
    uid = "cd993db1307d41030ce662bdaa7cb074",
    eventDate = "20210522",
    startTime = "13:00",
    endTime = "1600",
    churchName = "Calvary Chapel Blue Ridge",
    street = "101 George Curtis Rd",
    city = "Blue Ridge",
    stateProv = "GA",
    postalCode = "30513",
    graphic = "https://pate-images.s3.amazonaws.com/BlueRidge-app.png",
  } = rally;

  return (
    <>
      <RallyCard elevation={5}>
        <RallyCardCover key={churchName} source={{ uri: graphic }} />
        <Info>
          <ChurchTitle>{churchName}</ChurchTitle>
          <Address>
            {city}, {stateProv}
          </Address>
        </Info>
      </RallyCard>
    </>
  );
};
