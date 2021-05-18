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
    graphic = "https://pate-images.s3.amazonaws.com/BlueRidge-app.png",
  } = rally;
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <>
      <Card elevation={5} style={styles.card}>
        <Card.Cover
          key={churchName}
          style={styles.cover}
          source={{ uri: graphic }}
        />
        <Text style={styles.title}>{churchName}</Text>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
  },
  title: {
    padding: 20,
  },
  cover: {
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
  },
});
