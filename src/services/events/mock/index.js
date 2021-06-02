import activeEvents from "./events-active-api.json";
import blueRidge from "./blueRidge.json";
import chestnut from "./chestnut.json";

import san_francisco from "./san_francisco.json";

export const singleMocks = {
  "65dc88fb33fe4c0887b086188f2e9b1f": chestnut,
  cd993db1307d41030ce662bdaa7cb074: blueRidge,
};
export const genericMocks = {
  getActiveEvents: activeEvents,
  sanFran: san_francisco,
  blueRidge: blueRidge,
  chestnut: chestnut,
  "34.1724388,-83.8384051": chestnut,
  "34.8941,-84.3505887": blueRidge,
};
