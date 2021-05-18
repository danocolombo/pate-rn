import React from "react";
import { Text, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
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
    graphic = "https://pate-images.s3.amazonaws.com/P8-BlueRidge-GA-20210522-web.png",
  } = rally;
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <>
      <Card>
        <Card.Title
          title={churchName}
          subtitle={city + ", " + stateProv}
          left={LeftContent}
        />
        <Card.Content>
          <Title>May 22, 2021</Title>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Title>Calvary Chapel Blue Ridge</Title>
          <Paragraph>101 George Curtis Rd</Paragraph>
          <Paragraph>Blue Ridge, GA 30513</Paragraph>
        </Card.Content>

        <Card.Actions>
          <Button>More Info</Button>
        </Card.Actions>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "blue",
  },
});
