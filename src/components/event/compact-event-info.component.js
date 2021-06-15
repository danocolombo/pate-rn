import React from "react";

import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { Platform } from "react-native";

const eventMonthDay = (ed) => {
  // this rips the event date apart and returns montn/day string
  let mth = "";
  let dt = ed.substr(6, 2);
  switch (ed.substr(4, 2)) {
    case "01":
      mth = "Jan";
      break;
    case "02":
      mth = "Feb";
      break;
    case "03":
      mth = "Mar";
      break;
    case "04":
      mth = "Apr";
      break;
    case "05":
      mth = "May";
      break;
    case "06":
      mth = "Jun";
      break;
    case "07":
      mth = "Jul";
      break;
    case "08":
      mth = "Aug";
      break;
    case "09":
      mth = "Sep";
      break;
    case "10":
      mth = "Oct";
      break;
    case "11":
      mth = "Nov";
      break;
    case "12":
      mth = "Dec";
      break;
    default:
      break;
  }
  let rtnValue = mth + " " + dt;
  return rtnValue;
};
const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const CompactWebview = styled(WebView)`
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
const EventDateTime = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const isAndroid = Platform.OS === "android";
export const CompactEventInfo = ({ event }) => {
  const Image = isAndroid ? CompactWebview : CompactImage;
  return (
    <>
      <Item>
        <Image source={{ uri: event.graphic }} />
        <EventName>{event.name}</EventName>
        <EventDateTime>{eventMonthDay(event.eventDate)}</EventDateTime>
      </Item>
    </>
  );
};
