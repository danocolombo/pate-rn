import React, { useContext } from "react";
import styled from "styled-components/native";
import { StatusBar, Button } from "react-native";
import { Identity } from "../components/profile-identity.component";
import { CognitoAuthContext } from "../../../services/cognito/cognito-auth.context";

const ProfileSafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const IdentityView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export const ProfileScreen = () => {
  const { onLogout, user, userProfile } = useContext(CognitoAuthContext);

  return (
    <ProfileSafeAreaView>
      <IdentityView>
        <Identity user={user} profile={userProfile} />
        <Button title="LOGOUT" onPress={() => onLogout()} />
      </IdentityView>
    </ProfileSafeAreaView>
  );
};
