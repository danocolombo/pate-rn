import React, { useContext, useEffect } from "react";
// import { Storage } from "aws-amplify";
// import { AmplifyS3Image } from "aws-amplify-react-native";
// import Amplify from 'aws-amplify';
// import awsconfig from "../../../aws-exports";

// import { withAuthenticator, S3Image } from "aws-amplify-react-native";
// Amplify.configure(awsconfig);
import styled from "styled-components/native";
//import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
// import { Favorite } from "../../../components/favorites/favorite.component";
// import { StorageContext } from "../../../services/storage/storage.context";
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
    graphic1 = "https://pate-images.s3.amazonaws.com/" + rally.graphic,
    graphic = rally.graphic,
  } = rally;

  return (
    <>
      <EventCard elevation={5}>
        {/*<Favorite />*/}
        {/*<EventCardCover key={churchName} source={graphic} />*/}
        {/*graphic && (
          <img
            src={graphic}
            key={graphic}
            style={{ width: 300, height: 200 }}
          />
        )*/}

        {/*<AmplifyS3Image style={{ "--width": "100%" }} imgKey={graphic} />*/}
        {/*<RallyCardCoverImage imgKey={graphic} key={churchName}/>*/}
        <Info>
          <ChurchTitle>{churchName}</ChurchTitle>
          <Address>
            {city}, {stateProv}
          </Address>
          <GraphicLocation>graphic: {graphic}</GraphicLocation>
        </Info>
      </EventCard>
    </>
  );
};
export default EventInfoCard;
