import { useEffect } from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { authResellerLogin } from "../redux/Auth/auth-actions";
import { connect } from "react-redux";

const BetaLogin = ({ userData, authDatas, storeToLocalStorage }) => {
  useEffect(() => {
    if (!userData && !userData?.data && !userData?.data?.user_id) {
      if (authDatas && authDatas?.data?.user_id) {
        storeToLocalStorage(authDatas);
      }
      setTimeout(() => {
        window.location.href = `/`;
      }, 3000);
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/my-courses`;
    }
  }, [authDatas]);
  return (
    <>
      <div id="content-area">
        <div className="error-page error-500">
          <div className="container">
            <div className="btn-group">
              <h2>Redirecting....</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeToLocalStorage: (values) => dispatch(authResellerLogin(values)),
  };
};

export async function getServerSideProps(context) {
  const { token } = context.query;
  // let authDatas: any = "";
  let authDatas: any = {
    status: "success",
    msg: "User data",
    data: {
      id: 1908631,
      username: "vickychaudhary4596@gmail.com",
      email: "vickychaudhary4596@gmail.com",
      firstname: "vicky chaudhary",
      lastname: "ch",
      phone: null,
      dob: null,
      gender: null,
      profile_picture:
        "https://lh3.googleusercontent.com/a/ACg8ocKJcFKHultxbMYxq3gYRrBGC_tLwthUqGTjMw4dslSSZ_TX5Q=s96-c",
      address_line_1: "tim",
      address_line_2: null,
      country_id: 101,
      state_id: 10,
      city_id: null,
      pincode: null,
      facebook: null,
      google: null,
      linkedin: null,
      login_count: 20,
      twitter: null,
      website: null,
      organization_name: null,
      designation: null,
      highest_education: null,
      total_experience: null,
      skills: null,
      user_preferences: {
        notification_settings: {},
        looking_for_job_change: true,
        profile_share: true,
        user_certificates: {},
        enable_professional: false,
        dark_mode: true,
      },
      user_type: "retail",
      is_email_verified: true,
      suspended: false,
      deleted_at: null,
      country: {
        id: 101,
        country_code: "IN",
        name: "India",
      },
      state: {
        id: 10,
        country_id: 101,
        name: "Delhi",
      },
      subscrptions: {
        active_plans: [],
      },
      free_trail: false,
      video_bookmarked: [
        {
          bookmark_type: 2,
          bookmark_value: 14360,
          bookmark_comments: "check",
        },
      ],
      fav_courses_count: 0,
      wishlist_count: 2,
      cart_count: 1,
      course_count: 0,
    },
    profile: null,
  };
  try {
    let response = await axios.get(baseUrl + "/users/profile", {
      headers: { Authorization: token },
    });
    if (response.data && response.data.data) {
      authDatas = {
        msg: "Login successfull",
        data: {
          token: token,
          user_id: response.data.data.id,
          user_email: response.data.data.email,
          name: {
            first: response.data.data.firstname,
            last: response.data.data.lastname,
          },
          profile_img: response.data.data.profile_picture,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      authDatas,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BetaLogin);
