import { genericMocks } from "./mock";

// export const eventRequest = (uid = "cd993db1307d41030ce662bdaa7cb074") => {
//   return new Promise((resolve, reject) => {
//     const mock = singleMocks[uid];
//     if (!mock) {
//       reject("event not found");
//     }
//     resolve(mock);
//   });
// };
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
  return new Promise((resolve, reject) => {
    fetch("https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events", {
      method: "POST",
      body: JSON.stringify({
        // operation: "getAllActiveApprovedEvents",
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
// const util = require("util");
// return new Promise((resolve, reject) => {
//   if (!data) {
//     reject("no active events");
//   }
//   console.log(
//     "[--SEES1_eventsActive(data)--] data:  \n" +
//       util.inspect(data, {
//         showHidden: false,
//         depth: null,
//       })
//   );
//   resolve(data.body);
//   // let p8s = [];
//   // p8s = data.body;
//   // // p8s.map((ev) => {
//   // //   console.log("eventDate: ", ev.eventDate);
//   // // });
//   // resolve(p8s);
// });
// });
// };

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
