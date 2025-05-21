import { Accordions, ContactUsAction, Testimonials, Brands } from "@/components/import";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { addSubscription } from "../../redux/AddToCart/cart-actions";
import Head from "next/head";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { updateRedirection } from "../../redux/Redirection/redirect-actions";
import LabsData from "./data.json";
import AccordianPricing from "@/components/shared/Accordian-pricingfaq";
import VideoReview from "./videoreview";

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
  seoHomePageData,
}) => {
  const router = useRouter();
  const queries = router.query;
  const [planType, setPlanType] = useState(1); // 0 - yearly plan, 1 - monthly plan
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    var mybutton = document.getElementById("myBtn");
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }, []);

  useEffect(() => {
    if (profile && profile?.subscrptions && profile?.subscrptions?.active_plans?.length > 0) {
      const activePlans = profile?.subscrptions?.active_plans;
      for (let i = 0; i < activePlans.length; i++) {
        const data = activePlans[i];
        if (data.id == queries.sid) {
          setCurrentPlan(data);
          break;
        }
      }
    }
  }, [profile]);

  useEffect(() => {
    if (subscriptionData && currentPlan) {
      let threeMonthPlans = subscriptionData
        .filter((Itm) => Itm.subscription_for === 3)
        .filter((itm) => +currentPlan.plan.offer_price.usd <= +itm.offer_price.usd)
        ?.sort((a, b) => a.order_by - b.order_by);

      let oneYearPlans = subscriptionData
        .filter((Itm) => Itm.subscription_for === 12)
        .filter((itm) => +currentPlan.plan.offer_price.usd <= +itm.offer_price.usd)
        ?.sort((a, b) => a.order_by - b.order_by);

      setMonthlyPlans(threeMonthPlans);
      setYearlyPlans(oneYearPlans);
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
    } else {
      router.push("/pricing");
    }
  }, [userData]);

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

  return (
    <>
      {/* <Head>
        <title>Plans &amp; Pricing - Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
        <meta
          name="description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plans &amp; Pricing - Whizlabs" />
        <meta
          property="og:description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/pricing/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2022/07/pricing.webp"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta name="twitter:title" content="Plans &amp; Pricing - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2022/07/pricing.webp"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      <button
        style={{ marginBottom: "80px" }}
        className="btn-go-back"
        id="myBtn"
        onClick={() => topFunction()}
      >
        Go back to Pricing
      </button>
      <div id="content-area" className="subscription-page">
        <div className="banner-pricing" id="back-top">
          <div className="container">
            <div className="caption">
              <h1>Start Learning Smarter</h1>
              <p>Save BIG with our Premium Subscriptions</p>
            </div>
          </div>
        </div>

        <div className="choose-plans">
          <div className={`block-group ${planType === 0 ? "monthly-plan" : "yearly-plan"}`}>
            <div
              className="plan-toggle"
              style={{
                width: monthlyPlans.length === 0 || yearlyPlans.length === 0 ? "150px" : "300px",
              }}
            >
              <div className="toggle">
                {monthlyPlans.length > 0 && (
                  <span className={planType === 0 && "active"} onClick={(e) => setPlanType(0)}>
                    {" "}
                    3 Months
                  </span>
                )}
                {yearlyPlans.length > 0 && (
                  <label
                    style={{
                      maxWidth:
                        monthlyPlans.length === 0 || yearlyPlans.length === 0 ? "100%" : "50%",
                    }}
                    className={planType === 1 && "active"}
                    onClick={(e) => setPlanType(1)}
                  >
                    1 Year
                    <small>Save Up to 50%</small>
                  </label>
                )}
              </div>
            </div>

            {/* <!-- pricing-block --> */}
            {planType === 0 && (
              <div className="pricing-block plan plan-1">
                <div className="container">
                  <table>
                    <thead>
                      <tr>
                        <th className="features-section">
                          <div className="title">
                            Choose the best plan for your upskilling goals
                          </div>
                        </th>
                        {monthlyPlans.length > 0 &&
                          monthlyPlans.map((plan, idx) => {
                            return (
                              <th
                                key={`${plan.id}-pbpm`}
                                className={
                                  plan.title === "Standard"
                                    ? "free-section"
                                    : plan.title === "Premium"
                                    ? "standard-section border-right-std"
                                    : "premium-section boder-pre-down"
                                }
                              >
                                {plan.title === "Premium Plus" && (
                                  <>
                                    <div className="period-offer">
                                      Limited Period Offer!
                                      <figure className="arrow-img">
                                        <img className="img-full" src="/images/down-arrows.webp" />
                                      </figure>
                                    </div>
                                  </>
                                )}
                                {monthlyPlans.length - 1 === idx && (
                                  <div className="popular-label">Popular Choice</div>
                                )}
                                <div className="plan-type">{plan.title}</div>

                                {plan.title === "Standard" && (
                                  <div className="title">Get Certified</div>
                                )}
                                {plan.title === "Premium" && (
                                  <div className="title">Become Expert</div>
                                )}
                                {plan.title === "Premium Plus" && (
                                  <div className="title">Attain Mastery</div>
                                )}

                                <div className="sub-title">{plan.description}</div>
                                <hr />
                                {/* <div className="save-label">
                                  SAVE ${+monthlyPlan.price.usd - +monthlyPlan.offer_price.usd}
                                </div> */}
                                <div className="price-block">
                                  {/* <del className="old-price">${monthlyPlan.price.usd}</del> */}
                                  <span className="price">
                                    ${(plan.offer_price.usd / 3).toFixed(2)}
                                  </span>
                                  <div className="price-dis">
                                    per month,
                                    <br />
                                    <strong>${plan.offer_price.usd} billed quarterly</strong>
                                  </div>
                                </div>
                                <a
                                  href="/pricing/checkout/"
                                  style={{
                                    color:
                                      currentPlan && currentPlan?.plan_id === plan.id
                                        ? "#007cff"
                                        : "",
                                    background:
                                      currentPlan && currentPlan?.plan_id === plan.id
                                        ? "#007cff47"
                                        : "",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openCheckoutPage(plan);
                                  }}
                                  className="btn btn-Buy"
                                >
                                  {currentPlan
                                    ? currentPlan.plan_id === plan.id
                                      ? "Renew"
                                      : +currentPlan.plan.offer_price.usd > +plan.offer_price.usd
                                      ? "Buy Now"
                                      : "Upgrade Now"
                                    : "Buy Now"}
                                </a>
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    {monthlyPlans.length > 0 && (
                      <tbody>
                        {LabsData.map((data, idx) => (
                          <tr className="list-item border-pre-mix" key={data.title + `idx-1`}>
                            <td
                              className={`features-section ${data.special && " bg"}`}
                              dangerouslySetInnerHTML={{ __html: data.title }}
                            ></td>

                            {monthlyPlans.map((plan, index) => {
                              if (plan.title === "Standard") {
                                return (
                                  <td className={`free-section ${data.special && " bg"}`}>
                                    <div className={`circle ${data.l1 && "active"}`}>
                                      <figure>
                                        <img
                                          className="img-full"
                                          src={`/images/${data.l1 ? "true" : "cross"}-sign.svg`}
                                        />
                                      </figure>
                                    </div>
                                  </td>
                                );
                              }
                              if (plan.title === "Premium") {
                                return (
                                  <td
                                    className={`standard-section ${
                                      data.special && " bg"
                                    }  table-border-pr`}
                                  >
                                    <div className={`circle ${data.l2 && "active"}`}>
                                      <figure>
                                        <img
                                          className="img-full"
                                          src={`/images/${data.l2 ? "true" : "cross"}-sign.svg`}
                                        />
                                      </figure>
                                    </div>
                                  </td>
                                );
                              }
                              if (plan.title === "Premium Plus") {
                                return (
                                  <td
                                    className={`premium-section ${
                                      data.special && " bg"
                                    } table-border-pr-1 index${idx}`}
                                  >
                                    <div className={`circle ${data.l3 && "active"}`}>
                                      <figure>
                                        <img
                                          className="img-full"
                                          src={`/images/${data.l3 ? "true" : "cross"}-sign.svg`}
                                        />
                                      </figure>
                                    </div>
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>

                  <div className="pricing-respo monthlyplans">
                    <div className="block-group">
                      {monthlyPlans.length > 0 &&
                        monthlyPlans.map((plan, idx) => (
                          <div
                            key={idx + `pricing-respo-monthlyplans`}
                            className={`
                            block ${
                              plan.title === "Standard"
                                ? "free-section"
                                : plan.title === "Premium"
                                ? "standard-section"
                                : "premium-section"
                            }
                          `}
                          >
                            {plan.title === "Premium Plus" && (
                              <>
                                <div className="period-offer">
                                  Limited Period Offer!
                                  <figure className="arrow-img">
                                    <img className="img-full" src="/images/down-arrows.webp" />
                                  </figure>
                                </div>
                              </>
                            )}
                            <div className="heading">
                              {monthlyPlans.length - 1 === idx && (
                                <div className="popular-label">Popular Choice</div>
                              )}
                              <div className="plan-type">{plan.title}</div>

                              {plan.title === "Standard" && (
                                <div className="title">Get Certified</div>
                              )}
                              {plan.title === "Premium" && (
                                <div className="title">Become Expert</div>
                              )}
                              {plan.title === "Premium Plus" && (
                                <div className="title">Attain Mastery</div>
                              )}

                              <div className="sub-title">{plan.description}</div>
                              <hr />
                              {/* <div className="save-label">
                                SAVE ${+monthlyPlan.price.usd - +monthlyPlan.offer_price.usd}
                              </div> */}
                              <div className="price-block">
                                {/* <del className="old-price">${monthlyPlan.price.usd}</del> */}
                                <span className="price">
                                  ${(plan.offer_price.usd / 3).toFixed(2)}
                                </span>
                                <div className="price-dis">
                                  per month,
                                  <br />
                                  <strong>${plan.offer_price.usd} billed quarterly</strong>
                                </div>
                              </div>
                              <a
                                href="/pricing/checkout/"
                                style={{
                                  color:
                                    currentPlan && currentPlan?.plan_id === plan.id
                                      ? "#007cff"
                                      : "",
                                  background:
                                    currentPlan && currentPlan?.plan_id === plan.id
                                      ? "#007cff47"
                                      : "",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  openCheckoutPage(plan);
                                }}
                                className="btn btn-Buy"
                              >
                                {currentPlan
                                  ? currentPlan.plan_id === plan.id
                                    ? "Renew"
                                    : +currentPlan.plan.offer_price.usd > +plan.offer_price.usd
                                    ? "Buy Now"
                                    : "Upgrade Now"
                                  : "Buy Now"}
                              </a>
                            </div>
                            {plan.title === "Standard" && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Exam Simulator</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to all Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                            {plan.title === "Premium" && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Exam Simulator</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to all Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                            {plan.title === "Premium Plus" && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Exam Simulator</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to all Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- pricing-block --> */}
            {planType === 1 && (
              <div className="pricing-block plan plan-2">
                <div className="container">
                  <table>
                    <thead>
                      <tr>
                        <th className="features-section">
                          <div className="title">
                            Choose the best plan for your upskilling goals
                          </div>
                        </th>
                        {yearlyPlans.length > 0 &&
                          yearlyPlans.map((plan, idx) => {
                            return (
                              <th
                                key={`${plan.id}-pbpy`}
                                className={
                                  plan.title === "Standard"
                                    ? "free-section"
                                    : plan.title === "Premium"
                                    ? "standard-section border-right-std"
                                    : "premium-section"
                                }
                              >
                                {plan.title === "Premium Plus" && (
                                  <>
                                    <div className="period-offer">
                                      Limited Period Offer!
                                      <figure className="arrow-img arr-adj-desks">
                                        <img className="img-full" src="/images/down-arrows.webp" />
                                      </figure>
                                    </div>
                                  </>
                                )}
                                {yearlyPlans.length - 1 === idx && (
                                  <div className="popular-label">Popular Choice</div>
                                )}
                                <div className="plan-type">{plan.title}</div>

                                {plan.title === "Standard" && (
                                  <div className="title">Get Certified</div>
                                )}
                                {plan.title === "Premium" && (
                                  <div className="title">Become Expert</div>
                                )}
                                {plan.title === "Premium Plus" && (
                                  <div className="title">Attain Mastery</div>
                                )}

                                <div className="sub-title">{plan.description}</div>
                                <hr />
                                <div className="save-label">
                                  SAVE $
                                  {(
                                    monthlyPlans[idx]?.offer_price.usd * 4 -
                                    +plan.offer_price.usd
                                  ).toFixed(2)}
                                </div>
                                <div className="price-block">
                                  {/* <del className="old-price">${yearlyPlan.price.usd}</del> */}
                                  <span className="price">
                                    ${(plan.offer_price.usd / 12).toFixed(2)}
                                  </span>
                                  <div className="price-dis">
                                    per month,
                                    <br />
                                    <strong>${plan.offer_price.usd} billed yearly</strong>
                                  </div>
                                </div>
                                <a
                                  href="/pricing/checkout/"
                                  style={{
                                    color:
                                      currentPlan && currentPlan?.plan_id === plan.id
                                        ? "#007cff"
                                        : "",
                                    background:
                                      currentPlan && currentPlan?.plan_id === plan.id
                                        ? "#007cff47"
                                        : "",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openCheckoutPage(plan);
                                  }}
                                  className="btn btn-Buy"
                                >
                                  {currentPlan
                                    ? currentPlan.plan_id === plan.id
                                      ? "Renew"
                                      : +currentPlan.plan.offer_price.usd > +plan.offer_price.usd
                                      ? "Buy Now"
                                      : "Upgrade Now"
                                    : "Buy Now"}
                                </a>
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {LabsData.map((data, idx) => (
                        <tr className="list-item border-pre-mix" key={data.title + `idx-1`}>
                          <td
                            className={`features-section ${data.special && " bg"}`}
                            dangerouslySetInnerHTML={{ __html: data.title }}
                          ></td>

                          {yearlyPlans.map((plan, index) => {
                            if (plan.title === "Standard") {
                              return (
                                <td className={`free-section ${data.special && " bg"}`}>
                                  <div className={`circle ${data.l1 && "active"}`}>
                                    <figure>
                                      <img
                                        className="img-full"
                                        src={`/images/${data.l1 ? "true" : "cross"}-sign.svg`}
                                      />
                                    </figure>
                                  </div>
                                </td>
                              );
                            }
                            if (plan.title === "Premium") {
                              return (
                                <td
                                  className={`standard-section ${
                                    data.special && " bg"
                                  }  table-border-pr`}
                                >
                                  <div className={`circle ${data.l2 && "active"}`}>
                                    <figure>
                                      <img
                                        className="img-full"
                                        src={`/images/${data.l2 ? "true" : "cross"}-sign.svg`}
                                      />
                                    </figure>
                                  </div>
                                </td>
                              );
                            }
                            if (plan.title === "Premium Plus") {
                              return (
                                <td
                                  className={`premium-section ${
                                    data.special && " bg"
                                  } table-border-pr-1 index${idx}`}
                                >
                                  <div className={`circle ${data.l3 && "active"}`}>
                                    <figure>
                                      <img
                                        className="img-full"
                                        src={`/images/${data.l3 ? "true" : "cross"}-sign.svg`}
                                      />
                                    </figure>
                                  </div>
                                </td>
                              );
                            }
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pricing-respo yearlyplans">
                    <div className="block-group">
                      {yearlyPlans.length > 0 &&
                        yearlyPlans.map((plan, idx) => (
                          <div
                            key={idx + `pricing-respo-yearlyplans`}
                            className={`
                            block ${
                              plan.title === "Standard"
                                ? "free-section"
                                : plan.title === "Premium"
                                ? "standard-section"
                                : "premium-section"
                            }
                          `}
                          >
                            {plan.title === "Premium Plus" && (
                              <>
                                <div className="period-offer">
                                  Limited Period Offer!
                                  <figure className="arrow-img arrow-adj">
                                    <img className="img-full" src="/images/down-arrows.webp" />
                                  </figure>
                                </div>
                              </>
                            )}
                            <div className="heading">
                              {yearlyPlans.length - 1 === idx && (
                                <div className="popular-label">Popular Choice</div>
                              )}
                              <div className="plan-type">{plan.title}</div>

                              {plan.title === "Standard" && (
                                <div className="title">Get Certified</div>
                              )}
                              {plan.title === "Premium" && (
                                <div className="title">Become Expert</div>
                              )}
                              {plan.title === "Premium Plus" && (
                                <div className="title">Attain Mastery</div>
                              )}
                              <div className="title">{plan.title}</div>
                              <div className="sub-title">{plan.description}</div>
                              <hr />
                              <div className="save-label">
                                SAVE{" "}
                                {(
                                  monthlyPlans[idx]?.offer_price.usd * 4 -
                                  +plan.offer_price.usd
                                ).toFixed(2)}
                              </div>
                              <div className="price-block">
                                {/* <del className="old-price">${yearlyPlan.price.usd}</del> */}
                                <span className="price">
                                  ${(plan.offer_price.usd / 12).toFixed(2)}
                                </span>
                                <div className="price-dis">
                                  per month,
                                  <br />
                                  <strong>${plan.offer_price.usd} billed yearly</strong>
                                </div>
                              </div>
                              <a
                                href="/pricing/checkout/"
                                style={{
                                  color:
                                    currentPlan && currentPlan?.plan_id === plan.id
                                      ? "#007cff"
                                      : "",
                                  background:
                                    currentPlan && currentPlan?.plan_id === plan.id
                                      ? "#007cff47"
                                      : "",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  openCheckoutPage(plan);
                                }}
                                className="btn btn-Buy"
                              >
                                {currentPlan
                                  ? currentPlan.plan_id === plan.id
                                    ? "Renew"
                                    : +currentPlan.plan.offer_price.usd > +plan.offer_price.usd
                                    ? "Buy Now"
                                    : "Upgrade Now"
                                  : "Buy Now"}
                              </a>
                            </div>
                            {plan.title === "Standard" && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Exam Simulator</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to all Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                            {plan.title === "Premium" && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Exam Simulator</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to all Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                            {plan.title === "Premium Plus" && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Exam Simulator</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to all Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container-small">
          {/* <!-- brands-block --> */}
          <Brands
            data={brandsData}
            moreData={moreBrandsData}
            custom_title={`We are blessed with some amazing clients. Here are just a few!`}
          />
          <br />
          <br />
          {/* <!-- business-plan --> */}
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

        {/* video-review-section */}
        <div className="video-container">
          <VideoReview />
        </div>

        {/* <!-- testimonial-block --> */}
        <Testimonials data={testimonialsData} />

        {/* <!-- faq-block --> */}
        <div className="faq-block" style={{ background: "white" }}>
          <div className="container-small">
            <div className="container-left">
              <h3 className="title">Frequently Asked Questions</h3>
              <div className="tab_wrapper">
                <div className="resp-tabs-container hor_1 content_wrapper">
                  <div className="tab_content active" style={{ display: "block" }}>
                    <div className="accordian-block">
                      <div className="accordian-list">
                        {/* {faqData.map((e, i) => (
                          <div className="item">
                            <Accordion expanded={expanded === `panel${i}`}
                              TransitionProps={{ unmountOnExit: true }}
                              onChange={handleChange(`panel${i}`)}>
                              <AccordionSummary className={expanded === `panel${i}` ? "item-head open" : "item-head"}>
                                <>
                                  <samp></samp>
                                  <span>{e.question}</span>
                                </>
                              </AccordionSummary>
                              <AccordionDetails className="item-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: e.answer,
                                  }}
                                ></div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))} */}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscriptionToState: (datas) => dispatch(addSubscription(datas)),
    redirectionAction: (data) => dispatch(updateRedirection(data)),
  };
};

export async function getServerSideProps(context) {
  const link = context.params;

  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];

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
    subscriptionResp = subscriptions.data;
    // subscriptionResp = await axios.get(baseUrl + "/subscription/plans");
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
    title: "Plans & Pricing - Whizlabs",
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
      subscriptionData: subscriptionResp,
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
          is_plan_active: true,
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
