import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RegistrationsContext } from "../../../services/registrations/registrations.context";
import { CognitoAuthContext } from "../../../services/cognito/cognito-auth.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { EventList } from "../../events/components/event-list.styles";
import { EventInfoCard } from "../../events/components/event-card.component";

const NoRegistrationsArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const RegistrationsScreen = ({ navigation }) => {
  const { registrations } = useContext(RegistrationsContext);
  const { user } = useContext(CognitoAuthContext);
  return registrations.length ? (
    <SafeArea>
      <EventList
        data={registrations}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EventDetail", { rally: item })
              }
            >
              <Spacer position="bottom" size="large">
                <EventInfoCard rally={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.uid}
      />
    </SafeArea>
  ) : (
    <NoRegistrationsArea>
      <Text center>You have no registrations</Text>
      <Text center>{user.user.email}</Text>
    </NoRegistrationsArea>
  );
};
