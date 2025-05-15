import * as actionTypes from "./review-types";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import cookie from "js-cookie";

export const getReview = () => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.GET_REVIEW,
        payload: data,
      });
    }

    try {
      let authData = cookie.get("userData") ? JSON.parse(cookie.get("userData")) : null;
      let userToken = authData?.data?.token;
      await axios
        .get(`${baseUrl}/users/feedback/review`, {
          headers: {
            Authorization: userToken,
          },
        })
        .then((resp) => {
          const extractedData = resp.data.data.map((item) => ({
            review_id: item.review_id,
            like_dislike: item.like_dislike,
          }));
          return onSuccess(extractedData);
        });
    } catch (e) {
    }
  };
};
export const storeReview = (review_id, like_dislike) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.STORE_REVIEW,
        payload: data,
      });
    }

    try {
      let authData = cookie.get("userData") ? JSON.parse(cookie.get("userData")) : null;
      let userToken = authData?.data?.token;
      // console.log(userToken);
      await axios
        .post(
          `${baseUrl}/users/feedback/review`,
          {
            review_id: review_id,
            like_dislike: like_dislike,
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((resp) => {
          // console.log(respStore, "StoreResp");
          return onSuccess(resp.data.data);
        });
      return onSuccess(data);
    } catch (e) {}
  };
};
