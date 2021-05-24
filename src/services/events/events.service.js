import { mocks, genericMocks, singleMocks } from "./mock";

export const eventRequest = (uid = "cd993db1307d41030ce662bdaa7cb074") => {
  return new Promise((resolve, reject) => {
    const mock = singleMocks[uid];
    if (!mock) {
      reject("event not found");
    }
    resolve(mock);
  });
};
//getActiveEvents
export const eventsRequest = (operation = "getActiveEvents") => {
  return new Promise((resolve, reject) => {
    const mock = genericMocks[operation];
    if (!mock) {
      reject("no active events");
    }
    resolve(mock);
  });
};
export const eventsTransform = ({ body = [] }) => {
  const mappedResults = body.map((rally) => {
    console.log("yep");
    let fullGraphic = "https://pate-images.s3.amazonaws.com/" + rally.graphic;
    return {
      ...rally,
      processed: true,
      churchName: rally.name,
      graphic: fullGraphic,
    };
  });

  return mappedResults;
};
