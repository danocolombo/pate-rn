import React from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { Identity } from "../components/profile-identity.component";

const ProfileSafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const IdentityView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export const Profile = () => {
  return (
    <ProfileSafeAreaView>
      <IdentityView>
        <Identity />
      </IdentityView>
    </ProfileSafeAreaView>
  );
};
