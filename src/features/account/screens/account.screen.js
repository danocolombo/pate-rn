import React from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  Title,
  AnimationWrapper,
} from "../components/account.styles";
import LottieView from "lottie-react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthButton } from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/calendar.json")}
        />
      </AnimationWrapper>
      <Title>P8 Rally</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          LOGIN
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            REGISTER
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
