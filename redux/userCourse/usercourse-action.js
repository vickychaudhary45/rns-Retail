import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import * as Type from "./usercourse-types";
export const Usercourse = (user_id) => {
  return async function (dispatch) {
    function onSuccess(data) {
      dispatch({
        type: Type.ADD_COURSE,
        payload: {
          result: data,
        },
      });
    }
    try {
      // Dummy data for development/testing
      const dummyData = [
        { course_id: 1, name: "Course 1" },
        { course_id: 2, name: "Course 2" },
        { course_id: 3, name: "Course 3" },
      ];
      let datato_send = [];
      dummyData.map((itm) => {
        datato_send.push(itm.course_id);
      });
      return onSuccess(datato_send);

      // TODO: fix API
      // axios.get(`${baseUrl}/users/courses/?user_id=${user_id}`).then((resp) => {
      //     if (resp && resp.data && resp.data.data) {
      //         let datato_send = []
      //         resp.data.data.map((itm)=>{
      //             datato_send.push(itm.course_id)
      //         })
      //          return onSuccess(datato_send)
      //     }
      // })
    } catch (e) {
      console.error(e);
    }
  };
};

export const clearUserbought = () => {
  return async function (dispatch) {
    function onSuccess() {
      dispatch({
        type: Type.CLEAR,
      });
    }
    return onSuccess();
  };
};

export const NotifiedCourse = (user_id) => {
  return async function (dispatch) {
    function onSuccess(data) {
      dispatch({
        type: Type.GET_NOTIFIED,
        payload: {
          result: data,
        },
      });
    }
    try {
      axios.get(`${baseUrl}/users/notified?user_id=${user_id}`).then((resp) => {
        if (resp.data && resp.data.val) {
          // console.log(resp.data.val)
          return onSuccess(resp.data.val);
        }
      });
    } catch (e) {}
  };
};
