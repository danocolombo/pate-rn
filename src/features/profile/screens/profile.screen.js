import React, { useContext } from "react";
import styled from "styled-components/native";
import { StatusBar, Button } from "react-native";
import { Identity } from "../components/profile-identity.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileSafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const IdentityView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export const Profile = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <ProfileSafeAreaView>
      <IdentityView>
        <Identity />
        <Button title="LOGOUT" onPress={() => onLogout()} />
      </IdentityView>
    </ProfileSafeAreaView>
  );
};
