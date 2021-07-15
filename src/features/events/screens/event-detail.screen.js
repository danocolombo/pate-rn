/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components/native";

import { EventInfoCard } from "../components/event-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
//import { get } from "react-native/Libraries/Utilities/PixelRatio";
const ContactTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const EventDetailScreen = ({ route }) => {
  const { rally } = route.params;
  const [locationExpanded, setLocationExpanded] = useState(false);
  const [dateTimeExpanded, setDateTimeExpanded] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [contactsExpanded, setContactsExpanded] = useState(false);

  return (
    <SafeArea>
      <EventInfoCard rally={rally} />
      <ScrollView>
        <List.Accordion
          title="Location"
          left={(props) => <List.Icon {...props} icon="church" />}
          expanded={locationExpanded}
          onPress={() => setLocationExpanded(!locationExpanded)}
        >
          <Text>{rally.street}</Text>
          <Text>{`${rally.city}, ${rally.stateProv} ${rally.postalCode}`}</Text>
        </List.Accordion>
        <List.Accordion
          title="Date & Time"
          left={(props) => <List.Icon {...props} icon="clock" />}
          expanded={dateTimeExpanded}
          onPress={() => setDateTimeExpanded(!dateTimeExpanded)}
        >
          <Text>{rally.eventDate}</Text>
          <Text>Start Time: {rally.startTime}</Text>
          <Text>End Time: {rally.endTime}</Text>
        </List.Accordion>
        <List.Accordion
          title="Map"
          left={(props) => <List.Icon {...props} icon="map-marker" />}
          expanded={mapExpanded}
          onPress={() => setMapExpanded(!mapExpanded)}
        ></List.Accordion>
        <List.Accordion
          title="Contacts"
          left={(props) => <List.Icon {...props} icon="account-multiple" />}
          expanded={contactsExpanded}
          onPress={() => setContactsExpanded(!contactsExpanded)}
        >
          <ContactTitle>State Representative</ContactTitle>
          <Text>{rally.coordinator.name}</Text>
          <Text>{rally.coordinator.email}</Text>
          <Text>{rally.coordinator.phone}</Text>
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
