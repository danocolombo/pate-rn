import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const ProfileCard = styled(Card)`
  background-color: white;
  margin: ${(props) => props.theme.space[3]};
`;
export const ProfileInfo = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const ProfileName = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;
export const AddressView = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const AddressItem = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;
