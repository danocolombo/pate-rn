import { genericMocks } from "./mock";

//getActiveEvents
export const eventsRequest = (operation) => {
  console.log("operation: ", operation);
  return new Promise((resolve, reject) => {
    const mock = genericMocks[operation];
    if (!mock) {
      reject("no active events");
    }
    console.log("events.service:eventsRequest(" + operation + "): ", mock);
    resolve(mock);
  });
};
//eventsActive
export const eventsActive = () => {
  // this gets the active events from database
  // console.log("[--SEES--] events.service::eventsActive");
  // used getAllActiveApprovedEvents for testing.
  // actual getAllActiveApprovedEvents
  return new Promise((resolve, reject) => {
    fetch("https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events", {
      method: "POST",
      body: JSON.stringify({
        //operation: "getAllActiveApprovedEvents",
        operation: "getHistoricEvents",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.body);
      });
  });
};

//this following function cleans up the data received from the
//datasource and transforms it for use in the app. Only used
//when loading the context.
export const eventsTransform0 = ({ body = [] }) => {
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

//need to get signedUrls for the S3 graphics
export const getSignedUrls = async (body) => {
  body.map((test) => {
    let e = JSON.stringify(test);
    console.log("e:", e);
    console.log("street", e.street);
    // console.log("test.extract: ", test.meal.mealCount);
  });
};

//this following function cleans up the data received from the
//datasource and transforms it for use in the app. Only used
//when loading the context.
export const eventsTransform = ({ body = [] }) => {
  console.log("[SEES-transform--]");
  return body;
  // const mappedResults = body.map((rally) => {
  //   //for each entry we want to transform data
  //   return {
  //     ...rally,
  //     transformedData: true,
  //   };
  // });

  // return mappedResults;
};
