import React from "react";

import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";
const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;
const EventName = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: bold;
  align-items: center;
`;
export const CompactEventInfo = ({ event }) => {
  return (
    <>
      <Item>
        <CompactImage source={{ uri: event.graphic }} />
        <EventName>{event.name}</EventName>
      </Item>
    </>
  );
};
