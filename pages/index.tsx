import { useEffect, useState } from "react";
import axios from "axios";
import { Banner, CallToAction, ExploreSection2, CompanyTrust } from "@/components/import";
import { connect } from "react-redux";
import { updateRedirection } from "../redux/Redirection/redirect-actions";
import * as ga from "../lib/ga";
import { authLogout } from "../redux/Auth/auth-actions";
import { clearCart } from "../redux/AddToCart/cart-actions";

import HomeExpertBlock from "@/components/pages/HomeExpertBlock";

import cookie from "js-cookie";
import { OfferStart, offerClear } from "../redux/campaign/campaign-action";
import { storeUserProfile } from "../redux/UserProfile/profile-actions";
import { alertBox } from "../redux/AlertBox/alert-actions";
import { checkEmailVerified } from "../redux/UserProfile/profile-actions";
import dynamic from "next/dynamic";
import Head from "next/head";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

declare const window: any;
const Home = ({
  userData,
  redirectionAction,
  timer_details1,
  timerState1,
  alertBoxAction,
  updateEMail,
  timerState,
  subscriptionSaving,
}) => {
  const [accVerifyDiv, setAccVerifyDiv] = useState(false);
  const [accVerifyErrMsg, setAccVerifyErrMsg] = useState("");
  const [width, setwidth] = useState(0);
  // useEffect(() => {
  //   if (window) {
  //     setwidth(window.innerWidth);
  //   }
  //   const handleResize = () => {
  //     setwidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });
  const verifyEmail = async (token, email) => {
    await axios
      .post(`${baseUrl}/auth/mail/verify_mail`, {
        token: token,
        email: email,
      })
      .then(async (resp) => {
        if (resp.data.status == 1) {
          alertBoxAction({
            type: "SUCCESS",
            title: "Success",
            msg: "Email verified successfully",
          });

          //if user id update state
          if (userData) {
            await updateEMail(userData.data.user_id);
          }
        } else {
          alertBoxAction({
            type: "ERROR",
            title: "Error",
            msg: resp.data.msg,
          });
        }
      });
  };
  // useEffect(() => {
  //   document.querySelector("body").classList.remove("bg-color");

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const urlToken = urlParams.get("token");
  //   const urlEmail = urlParams.get("email");
  //   const urlUserType = urlParams.get("ut");

  //   if (urlToken && urlEmail && urlUserType) {
  //     if (urlUserType === "au") {
  //       axios
  //         .post(`${baseUrl}/auth/register/amazon/verify`, {
  //           token: urlToken,
  //           email: urlEmail,
  //         })
  //         .then((resp) => {
  //           if (resp.data.status === "error") {
  //             setAccVerifyDiv(true);
  //             setAccVerifyErrMsg(resp.data.message);
  //           } else if (resp.data.data && resp.data.data.user_id) {
  //             setAccVerifyDiv(true);
  //             setAccVerifyErrMsg("Your account has been verified Successfully!");
  //           }
  //         });
  //     }
  //     if (urlUserType == "lu") {
  //       verifyEmail(urlToken, urlEmail);
  //     }
  //   }

  //   // Logout from LMS
  //   const urlRef = urlParams.get("ref");

  //   const urlLogin = urlParams.get("login");
  //   const urlRegister = urlParams.get("register");
  //   const urlFrom = urlParams.get("frm");
  //   if (!userData && urlRef && urlLogin === "true") {
  //     if (urlRef === "forums") {
  //       redirectionAction("FORUMS"); // after sign in redirect to FORUMS
  //       document.querySelector("body").classList.add("open-modal-login");
  //     }
  //   }
  //   if (!userData && urlRef && urlLogin === "true") {
  //     if (urlRef === "website") {
  //       document.querySelector("body").classList.add("open-modal-login");
  //     }
  //   }

  //   if (!userData && urlRef && urlRegister === "true") {
  //     if (urlRef === "website") {
  //       document.querySelector("body").classList.add("open-modal-signup");
  //     }
  //   }
  //   if (!userData && urlRef && urlLogin === "true") {
  //     if (urlRef === "labs") {
  //       redirectionAction("LABS", urlFrom); // after sign in redirect to labs
  //       document.querySelector("body").classList.add("open-modal-login");
  //     }
  //   }

  //   if (!userData && urlRef && urlRegister === "true") {
  //     if (urlRef === "labs") {
  //       redirectionAction("LABS", urlFrom); // after sign in redirect to labs
  //       document.querySelector("body").classList.add("open-modal-signup");
  //     }
  //   }

  //   if (process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")) {
  //     ga.pageview({
  //       page_title: "step1",
  //       page_path: "/home_step",
  //     });

  //     ga.event({
  //       action: "event",
  //       params: "home_step",
  //     });
  //   }
  //   window._mfq = window._mfq || [];
  //   (function () {
  //     var mf = document.createElement("script");
  //     mf.type = "text/javascript";
  //     mf.defer = true;
  //     mf.src = "//cdn.mouseflow.com/projects/e7d46f41-b290-4fa4-9a60-1ca5f62e8330.js";
  //     document.getElementsByTagName("head")[0].appendChild(mf);
  //   })();
  // }, []);

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Whizlabs",
            operatingSystem: "ANDROID",
            applicationCategory: "EducationalApplication",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "3.2",
              ratingCount: "70",
            },
            offers: {
              "@type": "Offer",
              price: "0",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            // image: "https://www.example.com/example_image.jpg",
            url: "https://www.whizlabs.com/",
            sameAs: ["https://www.whizlabs.com/about-us/"],
            logo: "https://www.whizlabs.com/images/logo11.svg",
            name: "whizlabs",
            description:
              "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers.",
            email: "contact@whizlabs.com",
            telephone: "+91-63646 78444",
            address: {
              "@type": "PostalAddress",
              streetAddress: "7, Dev Complex, Door No.7, 3rd Floor",
              addressLocality: "Namachivaya Nagar, Saravanampatti, Coimbatore",
              addressCountry: "IN",
              addressRegion: "Tamil Nadu",
              postalCode: "641035",
            },
            // vatID: "FR12345678901",
            // iso6523Code: "0199:724500PMK2A2M1SQQ228",
          })}
        </script>
      </Head>
      <>
        {accVerifyDiv && <div className="account_verification_msg">{accVerifyErrMsg}</div>}
        <Banner
          timerState1={timerState1}
          width={width}
          timer_details1={timer_details1}
          subscriptionSaving={subscriptionSaving}
        />

        {/* <div id="content-area" className={`${cookie.get("signupmodal") ? "background-blurr" : ""}`}> */}
        <ExploreSection2 />

        <CompanyTrust />

        {/* <HomeExpertBlock /> */}

        <CallToAction />
        {/* </div> */}
      </>
    </>
  );
};

export async function getServerSideProps(context) {
  const seoHomePageData = {
    seoPageType: "homePage",
    title: "R N S PATH - A world class technology training platform for your Teams",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      {
        name: "description",
        property: "",
        content:
          "250+ IT Certification Video Courses, Practice Tests and Hands-on Labs: Study and Practice at Your own Pace with Whizlabs Unique Content, Boost Your Skills Today for a Brighter Future.",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Online Certification Training Courses for Professionals",
      },
      {
        name: "",
        property: "og:description",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: "https://media.whizlabs.com/website/2019/03/07/meta_image.jpg?60b50ff2a131f",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      {
        name: "twitter:title",
        property: "",
        content: "Online Certification Training Courses for Professionals",
      },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: "https://media.whizlabs.com/website/2019/03/07/meta_image.jpg?60b50ff2a1362",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
      {
        name: "google-site-verification",
        property: "",
        content: "EY2XZIOyWiKVIRaxXKzldMItZKACA18EFG-xrTkLn48",
      },
      { name: "cf-2fa-verify", property: "", content: "03e9eec4e024dc4" },
    ],
  };

  const campaignsget = {
    timer: {
      id: "1",
      type: "subs",
      created_by: "661",
      created_at: "2023-06-27T10:55:09.580Z",
      updated_at: "2025-05-14T16:36:06.035Z",
      details: {
        start_date: "2025-01-20T15:00",
        end_date: "2025-10-31T17:00",
        desktopImg: "ppG34UNcSaVVKK11.webp",
        desktopFooterImg: null,
        mobileheader: "W72OTPhDbD44XuvU.webp",
        mobileFooter: null,
        pricingfooter: null,
        desktopPricing: "NZGN3g8V2lwxMwmv.png",
        cartbox: "qnYP88m1lKiEO8de.png",
        state: true,
        design: {
          boxSize: 59,
          totalWidth: 290,
          padding: 8,
          fontSize: 19,
          fontWeight: 500,
          fontSizeB: 12,
          borderRadius: 22,
          fontColor: "#000000",
          backgroundColor: "#ffffff",
          leftAbs: 49,
          topAbs: 81,
        },
        mdesign: {
          boxSize: 43,
          totalWidth: 216,
          padding: 6,
          fontSize: 12,
          fontSizeB: 11,
          fontWeight: 500,
          fontColor: "#000000",
          backgroundColor: "#ffffff",
          borderRadius: 18,
          leftAbs: 50,
          topAbs: 81,
        },
        gradient: "linear-gradient(rgb(254, 247, 245, 1) 0%, rgb(255, 234, 226, 1) 100%);",
        clicks: {
          header: "/library",
          footer: "/Pricing",
          headerOnclick: "0",
          footeronClick: "0",
        },
        utc_starttime: "2025-01-20T09:30:00.000Z",
        utc_endtime: "2025-10-31T11:30:00.000Z",
        offer_details: {
          offer_type: "subs",
          prod_discount: null,
          monthly_premium_price: null,
          monthly_premium_discount: null,
          oneyear_premium_price: "157.45",
          oneyear_premium_discount: "33",
          monthly_premiumPlus_discount: null,
          monthly_premiumPlus_price: null,
          oneyear_premiumPlus_discount: "50",
          oneyear_premiumPlus_price: "178.00",
          product_coupon_code: null,
          subs_coupon_code: "Super_Saver_Sale",
          product_selection: 0,
          product_ids_arr: [],
          category_ids_arr: [],
          subscription_plan: ["3", "1"],
          subtimerDetails: {
            show: true,
            start_hours: "0",
            start_minutes: "27",
            end_hours: 0,
            end_minutes: "7",
          },
          offer_text: "Limited Time Deal!",
        },
        description: "Subscription_Sale",
        price_type: 1,
        rest_product_discount_percentage: 35,
        rest_product_discount_status: 0,
        offer_type_check: "1",
        cart_offer_type_check: "0",
        prd_offer_type_check: "0",
        mobile_prd_offer_type_check: "0",
        timer_flag: "0",
        productBannerTop: "p92YFolu0OYfQvyh.webp",
        mobileProductBannerTop: "4kyfZm1yplw8yC36.webp",
        titleBarTopImg: "92n6Lo0jjkFiig9q.webp",
        titleBarBottomImg: "841287804_1734697239.png",
        titleBarTopMobileImg: "hzco44zrVJwpVrfc.webp",
        titleBarBottomMobileImg: "973742728_1732797824.png",
        pricingTitleBarTopImg: "IELpNJpyBdtzKaQS.webp",
        pricingTitleBarTopMobileImg: "y3cDZkaCtqYLkyTT.webp",
        bannerStatuses: {
          title_bar_top_banner: true,
          title_bar_bottom_banner: false,
          title_bar_top_banner_mobile: true,
          title_bar_bottom_banner_mobile: false,
          desktop_banner: false,
          mobile_header_banner: false,
          desktop_pricing_footer_banner: false,
          cartbox_banner: false,
          product_top_banner: true,
          pricing_title_bar_top_banner: true,
          pricing_title_bar_top_banner_mobile: true,
          mobile_product_top_banner: true,
        },
        toggleTimer: {
          value: "0",
        },
      },
      remarks: "Subscription_Sale",
      price_based_on_regular: 1,
      rest_product_discount_status: 0,
      rest_product_discount: 35,
      assign_freebies: 0,
    },
  };

  // const timer_details1 = await axios.get(baseUrl + "/campaigns/get").then((resp) => {
  //   return resp.data.timer.details;
  // });
  const timer_details1 = await new Promise((resolve) => resolve(campaignsget.timer.details));

  let timerState1 = false;
  // if (timer_details1) {
  //   // console.log(timer_details)
  //   let end_date = new Date(timer_details1.utc_endtime).getTime();
  //   let start_date = new Date(timer_details1.utc_starttime).getTime();
  //   let nowTime = new Date().toISOString();
  //   let now_time = new Date(nowTime).getTime();
  //   if (now_time < start_date || now_time > end_date || !timer_details1.state) {
  //   } else {
  //     timerState1 = true;
  //   }
  // }

  // const subscriptionData = await axios.get(baseUrl + "/subscription/plans").then((resp) => {
  //   return resp.data.data;
  // });
  // let subscriptionSaving = "";
  // if (subscriptionData.length > 0) {
  //   let oneMonthplans = subscriptionData.filter(
  //     (Itm) => Itm.subscription_for === 1 && Itm.is_sandbox_access == true
  //   );
  //   let oneYearPlans = subscriptionData.filter(
  //     (Itm) => Itm.subscription_for === 12 && Itm.is_sandbox_access == true
  //   );
  //   let saving = (oneMonthplans[0]?.offer_price?.usd * 12 - oneYearPlans[0]?.offer_price?.usd).toFixed(
  //     2
  //   );
  //   subscriptionSaving = saving;
  // }

  return {
    props: {
      seoHomePageData,
      timer_details1,
      // subscriptionSaving,
      // timerState1,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    redirectTo: state.redirectData.redirect_to,
    timerState: state.timer.timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    authLogoutAction: () => dispatch(authLogout()),
    clearCartAction: () => dispatch(clearCart()),
    timerRunning: () => dispatch(OfferStart()),
    stopTimer: () => dispatch(offerClear()),
    updateUserProfile: (userToken) => dispatch(storeUserProfile(userToken)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    updateEMail: (user_id) => dispatch(checkEmailVerified(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
