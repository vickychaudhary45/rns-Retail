import axios from "axios";
import { connect } from "react-redux";
import router, { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";

import fs from "fs";
import path from "path";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { alertBox } from "../../redux/AlertBox/alert-actions";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import LabsData from "./data.json";
import VideoReview from "./videoreview";
import styles from "./Subscription.module.css";
import * as pricingData from "../../lib/pricingData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PricingCard from "@/components/PricingCard/pricingcard";
import { addSubscription } from "../../redux/AddToCart/cart-actions";
import { subsButtonClick } from "../../redux/buttonClick/click-actions";
import AccordianPricing from "@/components/shared/Accordian-pricingfaq";
import { updateRedirection } from "../../redux/Redirection/redirect-actions";
import { Accordions, ContactUsAction, Testimonials, Brands } from "@/components/import";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const faqanswer = `<p>Yes, whizlabs does have an app for both iOS and Android devices. You can find it in the <a href="https://play.google.com/store/apps/details?id=learning.app.whizlabs&hl=en&gl=US" target="_blank">Google Play Store</a> or the <a href="https://apps.apple.com/us/app/whizlabs/id1631714050?ign-itscg=30200&ign-itsct=apps_box_link" target="_blank">Apple App Store.</a> With the Whizlabs app, you can access your courses and practice tests, track your progress, and get personalized recommendations.</p>`;
const Subscription = ({
  profile,
  userData,
  subscriptionData,
  testimonialsData,
  brandsData,
  moreBrandsData,
  addSubscriptionToState,
  redirectionAction,
  redirectTo,
  user_type,
  timerState,
  seoHomePageData,
  offerType,
  buttonClickAction,
  alertBoxAction,
}) => {
  const router = useRouter();
  const [y, setY] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [planType, setPlanType] = useState(1); // 1 - yearly plan, 0 - monthly plan
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [expanded, setExpanded] = useState("panel0");
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (subscriptionData) {
      let oneMonthplans = subscriptionData
        .filter((Itm) => Itm.subscription_for === 1)
        ?.sort((a, b) => a.order_by - b.order_by);
      let oneYearPlans = subscriptionData
        .filter((Itm) => Itm.subscription_for === 12)
        ?.sort((a, b) => a.order_by - b.order_by);

      let premium_Index = oneMonthplans.findIndex((itm) => itm.is_sandbox_access == false);

      let premiumplus_index = oneMonthplans.findIndex((itm) => itm.is_sandbox_access == true);

      // oneMonthplans[premiumplus_index].type = "subs";
      // oneMonthplans[premiumplus_index].color = "#E30C3B";
      // oneMonthplans[premiumplus_index].ids = 1;
      // oneMonthplans[premiumplus_index].subInfo = {
      //   plan_title: "Premium",
      //   plan_desc: "Become Expert",
      //   plan_info: [
      //     "25,000+ Practice Questions",
      //     "4500+ Videos",
      //     "1000+ Hands-on Labs",
      //     "Cloud Sandbox",
      //   ],
      // };

      oneMonthplans[premium_Index].type = "subs";
      oneMonthplans[premium_Index].color = "#000000";
      oneMonthplans[premium_Index].ids = 0;
      oneMonthplans[premium_Index].subInfo = {
        plan_title: "Basic",
        plan_desc: "Get Certified",
        plan_info: ["25,000+ Practice Questions", "4500+ Videos"],
      };
      premium_Index = oneYearPlans.findIndex((itm) => itm.is_sandbox_access == false);

      premiumplus_index = oneYearPlans.findIndex((itm) => itm.is_sandbox_access == true);

      // oneYearPlans[premiumplus_index].type = "subs";
      // oneYearPlans[premiumplus_index].color = "#E30C3B";
      // oneYearPlans[premiumplus_index].ids = 1;
      // oneYearPlans[premiumplus_index].subInfo = {
      //   plan_title: "Premium",
      //   plan_desc: "Become Expert",
      //   plan_info: [
      //     "25,000+ Practice Questions",
      //     "4500+ Videos",
      //     "1000+ Hands-on Labs",
      //     "Cloud Sandbox",
      //   ],
      // };

      oneYearPlans[premium_Index].type = "subs";
      oneYearPlans[premium_Index].color = "#000000";
      oneYearPlans[premium_Index].ids = 0;
      oneYearPlans[premium_Index].subInfo = {
        plan_title: "Basic",
        plan_desc: "Get Certified",
        plan_info: ["25,000+ Practice Questions", "4500+ Videos"],
      };
      let corp_plan = {
        color: "#2aa0d1",
        desc: "Let’s Connect",
        ids: 2,
        subInfo: {
          plan_title: "Enterprise",
          plan_desc: "Empower Team",
          plan_info: [
            "Create Teams",
            "Customized Solutions",
            "Advanced Integrations",
            "Team Monitoring",
          ],
        },
      };

      oneMonthplans.push(corp_plan);
      oneYearPlans.push(corp_plan);

      setMonthlyPlans(oneMonthplans);
      setYearlyPlans(oneYearPlans);
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (profile && profile?.subscrptions && profile?.subscrptions?.active_plans?.length > 0) {
      profile?.subscrptions?.active_plans.forEach((data) => {
        // check if plan is active or not
        if (data && data.is_plan_active) {
          setCurrentPlan(data);
        }
      });
    }
  }, [profile]);

  useEffect(() => {
    if (currentPlan && currentPlan !== null) {
      setPlanType(currentPlan.plan.subscription_for === 12 ? 1 : 0);
    }
  }, [currentPlan]);

  const openCheckoutPage = (subscription) => {
    setButtonActive(true);
    addSubscriptionToState(subscription); // add datas to state
    if (userData && userData.data && userData.data.user_id) {
      router.push("/pricing/checkout");
    } else {
      redirectionAction("SUBSCRIPTION"); // after sign in redirect to subscription page
      if (localStorage) localStorage.setItem("togo", "true");
      document.querySelector("body").classList.add("open-modal-login");
    }
  };

  const disableButton = () => {};

  useEffect(() => {
    if (userData && userData.data && userData.data.user_id) {
      if (localStorage) {
        const togo = localStorage.getItem("togo");
        if (togo === "true") {
          localStorage.setItem("togo", "false");
          router.push("/pricing/checkout");
        }
      }
    }
  }, [userData]);

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setIsActive(false);
      } else if (y < window.scrollY) {
        setIsActive(true);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const faqData = [
    {
      question: `How is Whizlabs subscription different?`,
      answer: `Here are a few differentiators as compared to the other available options.
      <ul>
      <li>All our courses are always kept up-to-date. We update the courses timely, even for a small change in the certification curriculum</li>
      <li>Our trainers are handpicked and selected by a panel of industry experts</li>
      <li>We offer 24x7 support to our subscription users which includes support by our team of experts, trainers, and an engaged community</li>
      </ul>`,
    },
    {
      question: `How frequently do you update your content?`,
      answer: `<p>Our courses are timely and frequently updated, even to reflect the smallest change in the official certification curriculum. We take feedback from each learner who studies and takes a certification exam using our training material. The feedback is analyzed and included in the course material on a regular basis.</p>`,
    },
    {
      question: `Would I have access to all courses?`,
      answer: `Of course! When we say ALL, it means you will actually have access to the entire Whizlabs learning platform. Not just the existing courses, you will also be able to access all our future courses that will be launched during your subscription duration.`,
    },
    {
      question: `Does whizlabs have an app?`,
      answer: `${faqanswer}`,
    },
    {
      question: `Who are your training providers?`,
      answer: `Our trainers are handpicked from industry experts after a rigorous technical assessment. In order to become a trainer with whizlabs, a professional should have a proven track record of success in his area of expertise, good communication skills, and a strong commitment to give back to the community.`,
    },
    {
      question: `How many Hands-On Labs would I be able to access?`,
      answer: `Being a Premium Subscription user, you will have access to all the Hands-On Labs for courses provided by Whizlabs.`,
    },
    {
      question: `What is your refund policy?`,
      answer: `Our aim is to deliver a superior experience to our customers. In case you are not satisfied with the product, you can ask for a refund within 7 days of the purchase, for more information, please refer to the detailed <a href="/refund-policy">refund policy</a>`,
    },
  ];

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  let color_type = ["rgb(208, 82, 120)", "rgb(124, 16, 209)"];
  let course_type = [
    ["Practice Test", "Videos", "Hands-on Labs"],
    ["Includes Everything in Premium", "Sandboxes"],
  ];
  // console.log(monthlyPlans, yearlyPlans);

  useEffect(() => {
    if (document) {
      let valuebox = document.querySelectorAll("#valuebox");
      let valueBoxEnterprise = document.getElementById("valueboxE");

      let monthlyPlanCampaign = monthlyPlans.filter((itm) => itm.campaign_offer);
      let yearlyplanCampaign = yearlyPlans.filter((itm) => itm.campaign_offer);
      let max = -100;

      valuebox.forEach((itm) => {
        if (max < itm.getBoundingClientRect().height) {
          max = itm.getBoundingClientRect().height;
        }
      });
      if (planType == 0) {
        if (monthlyPlanCampaign.length == 0) {
        } else {
          let enterprice = document.getElementById("enterprice");
          if (enterprice) {
            enterprice.style.maxWidth = "140px";
          }
          max = 154;
        }
      } else {
        if (yearlyplanCampaign.length == 0) {
        } else {
          let enterprice = document.getElementById("enterprice");
          if (enterprice) {
            enterprice.style.maxWidth = "140px";
          }
          max = 154;
        }
      }
      if (valueBoxEnterprise && valuebox) {
        valueBoxEnterprise.style.height = `${max}px`;
        valueBoxEnterprise.style.display = "flex";
        valueBoxEnterprise.style.justifyContent = "center";
        valueBoxEnterprise.style.alignItems = "center";
        valueBoxEnterprise.style.flexDirection = "column";

        valuebox.forEach((itm: any) => {
          itm.style.height = `${max}px`;
          itm.style.display = "flex";
          itm.style.justifyContent = "center";
          itm.style.alignItems = "center";
          itm.style.flexDirection = "column";
        });
      }
    }
  }, [planType, monthlyPlans, yearlyPlans]);

  useEffect(() => {
    const handleResize = () => {
      if (document) {
        let eletable = document.getElementById("tables");
        let pricing_card = document.getElementById("pricing_card");
        let monthlyPlanCampaign = monthlyPlans.filter((itm) => itm.campaign_offer);
        let yearlyplanCampaign = yearlyPlans.filter((itm) => itm.campaign_offer);
        if (pricing_card && eletable) {
          if (
            window &&
            window.innerWidth > 777 &&
            monthlyPlanCampaign.length == 0 &&
            yearlyplanCampaign.length == 0
          ) {
            eletable.style.marginTop = `${pricing_card.getBoundingClientRect().height - 190}px`;
          }
          if (window && window.innerWidth > 767 && window && window.innerWidth <= 777) {
            eletable.style.marginTop = `${pricing_card.getBoundingClientRect().height / 2 + 90}px`;
          }
          if (
            window &&
            window.innerWidth > 777 &&
            (monthlyPlanCampaign.length > 0 || yearlyplanCampaign.length > 0)
          ) {
            console.log(`${pricing_card.getBoundingClientRect().height}px`);
            eletable.style.marginTop = `${pricing_card.getBoundingClientRect().height / 2 + 20}px`;
          }
        }
      }
    };
    handleResize();
    if (window) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [monthlyPlans, yearlyPlans, planType]);

  return (
    <>
      <button
        style={{ marginBottom: "80px" }}
        className="btn-go-back"
        id="myBtn"
        onClick={() => topFunction()}
      >
        Go back to Pricing
      </button>
      <div id="content-area" className="subscription-page">
        <div className={styles.top_banner}>
          <div className="container">
            <div className={styles.start}>Start Learning Smarter</div>
            <div className={styles.choose}>
              Choose the best plan for your <span className={styles.upskill}>Upskilling Goals</span>
            </div>
            <div
              className={styles.plan_switch}
              onClick={(e) => {
                planType == 1 ? setPlanType(0) : setPlanType(1);
              }}
            >
              <div className={styles.monthly}>Monthly</div>
              <div className={styles.slider}>
                <div
                  className={styles.ball}
                  style={
                    planType == 1
                      ? { transform: "translateX(39px)" }
                      : { transform: "translateX(0px)" }
                  }
                ></div>
              </div>
              <div className={styles.yearly}>Yearly</div>
            </div>
            <div className={styles.pricing_card}>
              {planType == 1 && (
                <>
                  {yearlyPlans.map((itm) => {
                    return (
                      <>
                        <PricingCard
                          plan_data={itm}
                          currentPlan={currentPlan}
                          disableButton={disableButton}
                          openCheckoutPage={openCheckoutPage}
                          userData={userData}
                          buttonClickAction={buttonClickAction}
                        />
                      </>
                    );
                  })}
                </>
              )}
              {planType == 0 && (
                <>
                  {monthlyPlans.map((itm) => {
                    return (
                      <>
                        <PricingCard
                          plan_data={itm}
                          currentPlan={currentPlan}
                          disableButton={disableButton}
                          openCheckoutPage={openCheckoutPage}
                          userData={userData}
                          buttonClickAction={buttonClickAction}
                        />
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className={`choose-plans ${styles.pricingtable}`} id="tables">
            <div className="pricing-block">
              <div className={styles.explain}>Allow us to explain it to you.</div>
              <TableContainer component={Paper}>
                <Table className={styles.table} aria-label="customized table">
                  <TableHead sx={{ background: "white" }}>
                    <TableRow style={{ background: "white" }}>
                      <TableCell
                        sx={{
                          width: "449px",
                          color: "#898989",
                          fontWeight: "400",
                          fontSize: "20px",
                        }}
                      >
                        Features
                      </TableCell>
                      <TableCell sx={{ width: "251px", fontWeight: "500", fontSize: "20px" }}>
                        Basic
                      </TableCell>
                      {/* <TableCell sx={{ width: "251px", fontWeight: "500", fontSize: "20px" }}>
                        Premium
                      </TableCell> */}
                      <TableCell sx={{ width: "251px", fontWeight: "500", fontSize: "20px" }}>
                        Enterprise
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pricingData.pricing_table_data.map((row) => (
                      <TableRow key={row.type}>
                        <TableCell className={styles.table_leftheading} scope="row">
                          <span className={styles.table_value}>{row.type}</span>
                          {row.desc ? (
                            <>
                              <p className={styles.para}>{row.desc}</p>
                            </>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                        <TableCell>
                          {row.access.includes(0) ? (
                            <>
                              <div className={`circle active`}>
                                <figure>
                                  <img className="img-full" src="/images/true-sign.svg" />
                                </figure>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={`circle`}>
                                <figure>
                                  <img className="img-full" src="/images/cross-sign.svg" />
                                </figure>
                              </div>
                            </>
                          )}
                        </TableCell>
                        {/* <TableCell>
                          {" "}
                          {row.access.includes(1) ? (
                            <>
                              <div className={`circle active`}>
                                <figure>
                                  <img className="img-full" src="/images/true-sign.svg" />
                                </figure>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={`circle`}>
                                <figure>
                                  <img className="img-full" src="/images/cross-sign.svg" />
                                </figure>
                              </div>
                            </>
                          )}
                        </TableCell> */}
                        <TableCell>
                          {" "}
                          {row.access.includes(2) ? (
                            <>
                              <div className={`circle active`}>
                                <figure>
                                  <img className="img-full" src="/images/true-sign.svg" />
                                </figure>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={`circle`}>
                                <figure>
                                  <img className="img-full" src="/images/cross-sign.svg" />
                                </figure>
                              </div>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <div className="container-small">
          <Brands
            data={brandsData}
            moreData={moreBrandsData}
            custom_title={`We are blessed with some amazing clients. Here are just a few!`}
          />
          <br />
          <br />
          <div className="business-plan">
            <h2>
              Looking for Enterprise License?{" "}
              <strong>Empower your Teams with Up-To-Date Skills</strong>
            </h2>
            <label>With Our Business Plan specially crafted for organisations</label>
            <a
              className="btn btn-more"
              rel="noopener"
              target="_blank"
              href={process.env.NEXT_PUBLIC_BUSINESS_URL}
            >
              Explore in Detail<i className="icon icon-font-arrow-right"></i>
            </a>
          </div>
        </div>
        <Testimonials data={testimonialsData} />
        <div className="faq-block" style={{ background: "white" }}>
          <div className="container-small">
            <div className="container-left">
              <h3 className="title">Frequently Asked Questions</h3>
              <div className="tab_wrapper">
                <div className="resp-tabs-container hor_1 content_wrapper">
                  <div className="tab_content active" style={{ display: "block" }}>
                    <div className="accordian-block">
                      <div className="accordian-list">
                        <AccordianPricing data={faqData} panel="panel0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactUsAction />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    redirectTo: state.redirectData.redirect_to,
    user_type: state.userProfileData.user_type,
    timerState: state.timer.timer,
    offerType: state.timer.offer_type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscriptionToState: (datas) => dispatch(addSubscription(datas)),
    redirectionAction: (data) => dispatch(updateRedirection(data)),
    buttonClickAction: (data, cookie) => dispatch(subsButtonClick(data, cookie)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export async function getServerSideProps(context) {
  const link = context.params;

  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];
  const split21 = decoded.split("userProfile=")[1]?.split(";")[0];
  if (split21) {
    let userType = JSON.parse(split21).user_type;
    if (userType == "amazon") {
      return {
        redirect: {
          destination: `/amazon/employees`,
          permanent: false,
        },
      };
    }
  }
  let userToken = null;
  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userToken = parsed ? parsed.data.token : null;
  }

  let profile = null;
  if (userToken) {
    try {
      const profileResp = dummyProfileResponse;
      // const profileResp = await axios.get(baseUrl + "/users/profile", {
      //   headers: { Authorization: userToken },
      // });

      profile = profileResp.data;
    } catch (e) {
      console.error(e);
    }
  }

  let testimonialResp = null;
  let subscriptionResp = null;
  try {
    testimonialResp = testimonials.data;
    // testimonialResp = await axios.get(baseUrl + "/users/testimonials");
    subscriptionResp = await axios.get(baseUrl + "/subscription/plans");
  } catch (e) {
    console.error(e);
  }

  const brandsData = [
    {
      id: 1,
      imgUrl: "/images/logo-jp.png",
      alt: "JP",
    },
    {
      id: 2,
      imgUrl: "/images/logo-deloitte2x.png",
      alt: "deloitte",
    },
    {
      id: 3,
      imgUrl: "/images/logo-global-knowledge.png",
      alt: "Global Knowledge",
    },
    {
      id: 4,
      imgUrl: "/images/logo-campgemni2x.png",
      alt: "campgemini",
    },
    {
      id: 5,
      imgUrl: "/images/logo-telefonica.png",
      alt: "telefonica",
    },
    {
      id: 6,
      imgUrl: "/images/logo-tuv.png",
      alt: "tuv",
    },
  ];

  const moreBrandsData = [
    {
      id: 1,
      imgUrl: "/images/logo-global-knowledge.png",
      alt: "Global Knowledge",
    },
    {
      id: 1,
      imgUrl: "/images/logo-wavestone.png",
      alt: "wavestone",
    },
    {
      id: 2,
      imgUrl: "/images/logo-vivid-cloud.png",
      alt: "vivid cloud",
    },
    {
      id: 3,
      imgUrl: "/images/logo-TLG.png",
      alt: "TLG",
    },
    {
      id: 4,
      imgUrl: "/images/logo-miami.png",
      alt: "miami",
    },
    {
      id: 5,
      imgUrl: "/images/logo-versor.png",
      alt: "versor",
    },
    {
      id: 6,
      imgUrl: "/images/logo-kpmg.png",
      alt: "kpmg",
    },
    {
      id: 7,
      imgUrl: "/images/logo-stack.png",
      alt: "stack",
    },
    {
      id: 8,
      imgUrl: "/images/logo-digi.png",
      alt: "digi",
    },
    {
      id: 9,
      imgUrl: "/images/logo-mityo.png",
      alt: "mityo",
    },
    {
      id: 10,
      imgUrl: "/images/logo-spatial.png",
      alt: "spatial",
    },
  ];

  const seoHomePageData = {
    seoPageType: "pricingPage", // This should reflect the actual page type
    title: "Plans & Pricing - RNSPATH",
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
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Plans & Pricing - Whizlabs",
      },
      {
        name: "",
        property: "og:description",
        content:
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/pricing/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: `${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}2022/07/pricingog.jpeg`,
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "twitter:card", property: "", content: "summary_large_image" },
      {
        name: "twitter:description",
        property: "",
        content:
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "twitter:title", property: "", content: "Plans & Pricing - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content: `${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}2022/07/pricingog.jpeg`,
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };

  return {
    props: {
      profile: profile,
      subscriptionData: subscriptionResp?.data?.data,
      testimonialsData: testimonialResp,
      brandsData: brandsData,
      moreBrandsData: moreBrandsData,
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);

const subscriptions = {
  msg: "Subscription Plans",
  data: [
    {
      id: 1124,
      title: "Basic",
      price: {
        usd: "49",
      },
      offer_price: {
        usd: "29",
      },
      subscription_for: 1,
      is_premium_support: false,
      plan_type: "2",
      is_unlimited_access_lab: false,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPQGCGaEg28eWiFyOqHGWM",
      public_link: null,
      expert_guidence: false,
      description: "PT+OC",
      deleted_at: null,
      created_at: "2024-03-20T14:00:16.028Z",
      updated_at: "2024-03-20T14:00:16.028Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Month - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: false,
      order_by: 0,
      is_vc_sandbox_access: false,
    },
    {
      id: 1123,
      title: "Basic",
      price: {
        usd: "235",
      },
      offer_price: {
        usd: "199",
      },
      subscription_for: 12,
      is_premium_support: false,
      plan_type: "2",
      is_unlimited_access_lab: false,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPPNCGaEg28eWi3leSe5Ds",
      public_link: null,
      expert_guidence: false,
      description: "PT+OC",
      deleted_at: null,
      created_at: "2024-03-20T13:58:46.434Z",
      updated_at: "2024-03-20T13:58:46.434Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Year - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: false,
      order_by: null,
      is_vc_sandbox_access: false,
      campaign_offer: {
        campaign_details: {
          discount_percent: "33",
          calculation_based_on_regular: 1,
        },
        price: {
          usd: "157.45",
        },
      },
    },
    {
      id: 1121,
      title: "Premium",
      price: {
        usd: "331.66",
      },
      offer_price: {
        usd: "249",
      },
      subscription_for: 12,
      is_premium_support: true,
      plan_type: "2",
      is_unlimited_access_lab: true,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPRTCGaEg28eWimNTTJBhP",
      public_link: null,
      expert_guidence: true,
      description: "Practice Test + Videos + Hands-on Labs + Sandboxes",
      deleted_at: null,
      created_at: "2024-03-20T13:50:41.525Z",
      updated_at: "2024-03-20T13:50:41.525Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Year - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: true,
      order_by: 4,
      is_vc_sandbox_access: false,
      campaign_offer: {
        campaign_details: {
          discount_percent: "40",
          calculation_based_on_regular: 1,
        },
        price: {
          usd: "199.00",
        },
      },
    },
    {
      id: 1122,
      title: "Premium ",
      price: {
        usd: "311.53",
      },
      offer_price: {
        usd: "49",
      },
      subscription_for: 1,
      is_premium_support: true,
      plan_type: "2",
      is_unlimited_access_lab: true,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPS5CGaEg28eWikdSBWbZE",
      public_link: null,
      expert_guidence: true,
      description: "Practice Test + Videos + Hands-on Labs + Sandboxes",
      deleted_at: null,
      created_at: "2024-03-20T13:54:44.921Z",
      updated_at: "2024-03-20T13:54:44.921Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Month - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: true,
      order_by: 3,
      is_vc_sandbox_access: false,
    },
  ],
  sortedData: [
    {
      id: 1123,
      title: "Basic",
      price: {
        usd: "235",
      },
      offer_price: {
        usd: "199",
      },
      subscription_for: 12,
      is_premium_support: false,
      plan_type: "2",
      is_unlimited_access_lab: false,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPPNCGaEg28eWi3leSe5Ds",
      public_link: null,
      expert_guidence: false,
      description: "PT+OC",
      deleted_at: null,
      created_at: "2024-03-20T13:58:46.434Z",
      updated_at: "2024-03-20T13:58:46.434Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Year - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: false,
      order_by: null,
      is_vc_sandbox_access: false,
      campaign_offer: {
        campaign_details: {
          discount_percent: "33",
          calculation_based_on_regular: 1,
        },
        price: {
          usd: "157.45",
        },
      },
    },
    {
      id: 1121,
      title: "Premium",
      price: {
        usd: "331.66",
      },
      offer_price: {
        usd: "249",
      },
      subscription_for: 12,
      is_premium_support: true,
      plan_type: "2",
      is_unlimited_access_lab: true,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPRTCGaEg28eWimNTTJBhP",
      public_link: null,
      expert_guidence: true,
      description: "Practice Test + Videos + Hands-on Labs + Sandboxes",
      deleted_at: null,
      created_at: "2024-03-20T13:50:41.525Z",
      updated_at: "2024-03-20T13:50:41.525Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Year - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: true,
      order_by: 4,
      is_vc_sandbox_access: false,
      campaign_offer: {
        campaign_details: {
          discount_percent: "40",
          calculation_based_on_regular: 1,
        },
        price: {
          usd: "199.00",
        },
      },
    },
    {
      id: 1124,
      title: "Basic",
      price: {
        usd: "49",
      },
      offer_price: {
        usd: "29",
      },
      subscription_for: 1,
      is_premium_support: false,
      plan_type: "2",
      is_unlimited_access_lab: false,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPQGCGaEg28eWiFyOqHGWM",
      public_link: null,
      expert_guidence: false,
      description: "PT+OC",
      deleted_at: null,
      created_at: "2024-03-20T14:00:16.028Z",
      updated_at: "2024-03-20T14:00:16.028Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Month - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: false,
      order_by: 0,
      is_vc_sandbox_access: false,
    },
    {
      id: 1122,
      title: "Premium ",
      price: {
        usd: "311.53",
      },
      offer_price: {
        usd: "49",
      },
      subscription_for: 1,
      is_premium_support: true,
      plan_type: "2",
      is_unlimited_access_lab: true,
      course_type: "3",
      is_active: true,
      show_in_front: true,
      stripe_plan_id: "price_1OwPS5CGaEg28eWikdSBWbZE",
      public_link: null,
      expert_guidence: true,
      description: "Practice Test + Videos + Hands-on Labs + Sandboxes",
      deleted_at: null,
      created_at: "2024-03-20T13:54:44.921Z",
      updated_at: "2024-03-20T13:54:44.921Z",
      lab_points: null,
      excluded_courses: "[2475,2510,2476,2479]",
      internal_title: "Plan for 1 Month - Mar 2024",
      plan_collection: "retail",
      auto_expire: true,
      is_sandbox_access: true,
      order_by: 3,
      is_vc_sandbox_access: false,
    },
  ],
};

const testimonials = {
  msg: "User testimonials data",
  data: [
    {
      id: 1,
      customer_name: "Chris Nan",
      designation: "Developer",
      company: "whizlabs",
      email: "chrisnan@whizlabs.com",
      upload_picture: "media/2019/03/07/icon-man.jpg",
      message:
        "<p>&nbsp; I passed my exam last month, and huge thanks to Whizlabs. It really helped me a lot to prepare my exam and had good feeling about how the actual exam looks like.</p>",
      category_id: 15,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 2,
      customer_name: "Johnkouk",
      designation: "Developer",
      company: "Accenture",
      email: "John@gmail.com",
      upload_picture: "media/2019/12/20/testimonials_team3_80x80.png",
      message:
        "<p>Thanks whizlabs passed first time with 88% and your material certainly contributed to the success.</p>",
      category_id: 28,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 3,
      customer_name: "Anupam Pandey",
      designation: null,
      company: null,
      email: "anupam-pandey@gmail.com",
      upload_picture: "media/2019/03/07/icon-man.jpg",
      message:
        "<p>My experience with practice set of Whizlabs is excellent. This set is not only for your exam passing material, but brush up also your concepts. It is good practice material.</p>",
      category_id: 15,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 4,
      customer_name: "Siyan Zhao",
      designation: "Senior Engineer",
      company: "Hydsoft.com",
      email: "siyan-zhao@gmail.com",
      upload_picture: "media/2019/12/20/testimonials_siyan_80x80_28_24.png",
      message:
        "<p>Got many good suggestions from Whizlabs support team, in the exam there are some topics about direct connect, vpn, migration, tagging. Here thanks again for the whizlab for very helpful questions and similar scenarios with real exam.</p>",
      category_id: 15,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 5,
      customer_name: "Ashra",
      designation: null,
      company: null,
      email: "ashra@gmail.com",
      upload_picture: "media/2019/03/07/icon-woman.jpg",
      message:
        "<p>Thanks so much Whiz Labs. This is awesome product. I passed CDA with 98% with a prep time of about 7 days. Your practice exams are fantastic. I have also passed CSA in 2 weeks. Thanks so much.</p>",
      category_id: 15,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 6,
      customer_name: "John Green",
      designation: "Cloud Native Java Developer",
      company: "Digital Dewpoint",
      email: "johngreen@gmail.com",
      upload_picture: "media/2019/12/20/testimonials_john_80x80.png",
      message:
        "<p>Thanks to the intensity of the Whizlabs questions for 1Z0-813, I passed today with 96%. I can hardly believe it but it was weeks of work and I'm glad I've learnt a massive amount of new features in Java 8.</p>",
      category_id: 15,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 7,
      customer_name: "Joe",
      designation: null,
      company: null,
      email: "joe@gmail.com",
      upload_picture: "media/2019/03/07/icon-man.jpg",
      message:
        "<p>The practice tests were very helpful. They were current and had links to the documentation that supported the answers which was also very helpful. I recommend Whizlabs for anyone trying to pass the CSAA exam. Whizlabs helped me pass with an 87%. Thanks Whizlabs!</p>",
      category_id: 15,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 8,
      customer_name: "Arvind",
      designation: null,
      company: null,
      email: "arvind@gmail.com",
      upload_picture: "media/2019/03/07/icon-man.jpg",
      message:
        "<p>These Practice exams are really great resource of learning and before attempting the associate Architect certification, very well explanation help us to understand the answer better. Thanks Whizlabs</p>",
      category_id: 28,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 9,
      customer_name: "Rajaseelan",
      designation: null,
      company: null,
      email: "rajaseelan@gmail.com",
      upload_picture: "media/2019/03/07/testimonials_icon-woman.jpg",
      message:
        "<p>Thanks to the training I got by answering your questions, I was able to identify weak points in my studies and read up on them. I got an 86%, but I had cloud experience before emabrking on this study path.</p>",
      category_id: 17,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 10,
      customer_name: "Gokhan Dedeoglu",
      designation: "Database/BI Architect",
      company: "Profelis",
      email: "admin@gmail.com",
      upload_picture: "media/2019/03/07/Gokhan.jpeg",
      message:
        "<p>Whizlabs questions and explanations are very helpful to understand exam subjects. With solving these questions, I understand a lot of subjects better.</p>",
      category_id: 23,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: null,
      linkedin: null,
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
    {
      id: 11,
      customer_name: "Runcy Oommen",
      designation: "Principal Software Dev Engineer",
      company: "SonicWall INC.",
      email: "amit@whizlabs.com",
      upload_picture: "media/2019/12/13/testimonials_untitled-design-(49).png",
      message:
        "<p>Whizlabs practice tests provide a holistic approach to cloud certifications enabling you to focus on strengths and areas of improvements. It is highly recommended for novices and seasoned pros entering the realm of certifications</p>",
      category_id: 18,
      status: 1,
      is_display: 1,
      facebook: null,
      twitter: "https://twitter.com/runcyoommen",
      linkedin: "https://www.linkedin.com/in/runcyoommen/",
      googleplus: null,
      created_by: null,
      created_at: "2021-07-24T07:23:56.869Z",
      updated_at: "2021-07-24T07:23:56.869Z",
    },
  ],
};

const dummyProfileResponse = {
  status: "success",
  msg: "User data",
  data: {
    id: 12345,
    username: "john_doe",
    email: "john.doe@example.com",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    dob: "1990-01-01",
    gender: "Male",
    profile_picture: "https://example.com/images/john_doe.jpg",
    address_line_1: "123 Main Street",
    address_line_2: "Suite 456",
    country_id: 1,
    state_id: 10,
    city_id: 100,
    pincode: "123456",
    facebook: "john.doe",
    google: "john.doe@gmail.com",
    linkedin: "john-doe-linkedin",
    login_count: 25,
    twitter: "johndoe",
    website: "https://johndoe.dev",
    organization_name: "Tech Inc.",
    designation: "Senior Developer",
    highest_education: "Masters in Computer Science",
    total_experience: "8 years",
    skills: "React, Node.js, SQL",
    user_preferences: {
      language: "en",
      theme: "dark",
    },
    user_type: "regular",
    is_email_verified: true,
    suspended: false,
    deleted_at: null,

    country: {
      id: 1,
      country_code: "US",
      name: "United States",
    },
    state: {
      id: 10,
      country_id: 1,
      name: "California",
    },
    city: {
      id: 100,
      state_id: 10,
      name: "San Francisco",
    },

    subscrptions: {
      active_plans: [
        {
          id: 201,
          plan_id: 301,
          type: "premium",
          order_date: "2024-01-01",
          payment_mode: "credit_card",
          transaction_id: "TXN123456",
          is_cancelled: false,
          is_plan_active: false,
          start_date: "2024-01-02",
          end_date: "2025-01-01",
          order_status: "completed",
          billing_first_name: "John",
          billing_last_name: "Doe",
          billing_email: "john.doe@example.com",
          billing_address1: "123 Main Street",
          billing_address2: "Suite 456",
          billing_phone: "+1234567890",
          currency: "USD",
          sub_total: "100.00",
          order_discount: "10.00",
          order_total: "90.00",
          coupon_code: "WELCOME10",
          plan: {
            id: 301,
            name: "Premium Yearly Plan",
            price: "100.00",
            duration: "12 months",
          },
          refundData: null,
        },
      ],
    },

    fav_courses_count: 5,
    wishlist_count: 3,
    cart_count: 2,
    video_bookmarked: [
      {
        bookmark_type: "video",
        bookmark_value: "vid_abc123",
        bookmark_comments: "Important video to rewatch",
      },
      {
        bookmark_type: "video",
        bookmark_value: "vid_xyz456",
        bookmark_comments: "Check out advanced section",
      },
    ],
    course_count: 4,
  },

  profile: {
    user_id: 12345,
    bio: "Software engineer passionate about full-stack development.",
    headline: "Building solutions that scale",
    social_links: {
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
    interests: ["Cloud", "DevOps", "Frontend"],
  },
};
