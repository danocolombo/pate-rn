/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import { List } from "react-native-paper";
import { EventInfoCard } from "../components/event-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";

export const EventDetailScreen = ({ route }) => {
  const { rally } = route.params;
  const [locationExpanded, setLocationExpanded] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [contactsExpanded, setContactsExpanded] = useState(false);
  return (
    <SafeArea>
      <EventInfoCard rally={rally} />
      <List.Accordion
        title="Location"
        left={(props) => <List.Icon {...props} icon="church" />}
        expanded={locationExpanded}
        onPress={() => setLocationExpanded(!locationExpanded)}
      ></List.Accordion>
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
      ></List.Accordion>
    </SafeArea>
  );
};
