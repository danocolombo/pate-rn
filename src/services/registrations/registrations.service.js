import { registrationsMocks } from "./mock";

export const registrationsRequest = (user) => {
  return new Promise((resolve, reject) => {
    const mock = registrationsMocks[user];
    if (!mock) {
      reject("no active events");
    }
    resolve(mock);
  });
};
//this following function cleans up the data received from the
//datasource and transforms it for use in the app. Only used
//when loading the context.
export const registrationsTransform = ({ body = [] }) => {
  const mappedResults = body.map((rally) => {
    //for each entry we want to transform data
    let fullGraphic = "https://pate-images.s3.amazonaws.com/" + rally.graphic;
    return {
      ...rally,
      transformedData: true,
      churchName: rally.name,
      graphic: fullGraphic,
    };
  });

  return mappedResults;
};
