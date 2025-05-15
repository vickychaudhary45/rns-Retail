import * as actionTypes from "./review-types";
import cookie from "js-cookie";

const INITIAL_STATE = {
  review: [],
};

const reviewReducer = (state = INITIAL_STATE, action) => {
  // console.log(action);
  // let authData = cookie.get("userData") ? JSON.parse(cookie.get("userData")) : null;

  switch (action.type) {
    case actionTypes.GET_REVIEW:
      // localStorage.setItem("reviewData", JSON.stringify(action.payload));
      return { ...state, review: action.payload };
    case actionTypes.STORE_REVIEW:
      localStorage.setItem("reviewData", JSON.stringify(action.payload));
      return { ...state, storeReview: action.payload };
    default:
      return state;
  }
};


// function loadFromLocalStorage(cookieName) {
//   try {
//     const serialisedState =
//       cookieName == "reviewData" && typeof window !== "undefined"
//         ? localStorage.getItem("reviewData")
//         : cookie.get(cookieName);
//     if (typeof serialisedState == "undefined") return undefined;
//     // console.log(serialisedState[0])
//     return JSON.parse(serialisedState);
//   } catch (e) {
//     console.error(e);
//     return undefined;
//   }
// }

export default reviewReducer;
