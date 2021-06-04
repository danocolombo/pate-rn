import React from "react";
// import { Storage } from "aws-amplify";
// import { AmplifyS3Image } from "aws-amplify-react-native";
// import Amplify from 'aws-amplify';
// import awsconfig from "../../../aws-exports";

// import { withAuthenticator, S3Image } from "aws-amplify-react-native";
// Amplify.configure(awsconfig);
import styled from "styled-components/native";
//import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const EventCard = styled(Card)`
  background-color: white;
  margin-bottom: 10px;
`;
const EventCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
// const RallyCardCoverImage = styled(S3Image)`
//   padding: ${(props) => props.theme.space[3]};
//   background-color: ${(props) => props.theme.colors.bg.primary};
// `;
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
      <EventCard elevation={5}>
        <EventCardCover key={churchName} source={{ uri: graphic }} />
        {/*<AmplifyS3Image style={{ "--width": "100%" }} imgKey={graphic} />*/}
        {/*<RallyCardCoverImage imgKey={graphic} key={churchName}/>*/}
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
