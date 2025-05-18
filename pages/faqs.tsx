import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Accordions } from "@/components/import";
import ContactUsAction from "../components/plugins/ContactUsAction";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Faq = (seoHomePageData) => {
  const [faqType, setFaqType] = useState("E");
  const [expanded, setExpanded] = useState("panel0E");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const data = {
      msg: "Global FAQ's",
      data: [
        {
          id: 2,
          faq_type: "T",
          faq: [
            {
              question: null,
              answer: null,
              is_active: "1",
            },
          ],
          created_at: "2021-03-20T14:54:27.263Z",
          updated_at: "2021-06-23T17:56:01.000Z",
        },
        {
          id: 5,
          faq_type: "S",
          faq: [
            {
              question:
                "After purchasing the Training Course from Whizlabs, how can I clarify my technical questions?",
              answer:
                '<p>We have a dedicated team of subject-matter experts (SME) who will answer all of your queries that are submitted through our Learning Management System (LMS) interface. You will receive responses within 24 hours of the submission of the question.</p>\r\n<p><img src="https://media.whizlabs.com/website/ask-your-expert.webp" alt="" width="600" height="272" /></p>',
              is_active: "1",
            },
            {
              question: "What if I have more queries?",
              answer:
                '<p>If you have any queries related to the Certification exam, Whizlabs training courses, payments, etc. please feel free to <a href="https://www.whizlabs.com/contact-us/" target="_blank" rel="noopener">contact us</a>. A member of our support staff will respond to you as soon as possible.</p>',
              is_active: "1",
            },
          ],
          created_at: "2021-03-20T14:54:27.263Z",
          updated_at: "2023-02-27T09:31:05.973Z",
        },
        {
          id: 4,
          faq_type: "P",
          faq: [
            {
              question: "Do you offer a Money-Back Guarantee for Whizlabs training courses?",
              answer:
                '<p>Yes, we offer a 100% unconditional money-back guarantee for our training courses. If you don’t clear the exam for any reason, you can apply for a full refund.</p>\r\n<p>Please note that we only refund the amount paid for the Whizlabs training course, not the certification exam cost. For more details, we recommend you to check our <a href="https://www.whizlabs.com/refund-policy/" target="_blank" rel="noopener">Refund Policy</a></p>',
              is_active: "1",
            },
            {
              question: "Do you provide any discount on the bulk purchase?",
              answer:
                '<p>Yes, you can avail up to 50% discount on the purchase of more than 10 products at a time. For more details, please feel free to write <a href="https://www.whizlabs.com/contact-us/" target="_blank" rel="noopener">here</a>. A member of our support staff will respond back as soon as possible.</p>',
              is_active: "1",
            },
            {
              question: "What are the payment gateways you provide?",
              answer:
                "<p>We accept payments through different gateways like CCAvenue, Stripe, etc.</p>",
              is_active: "1",
            },
          ],
          created_at: "2021-03-20T14:54:27.263Z",
          updated_at: "2022-11-17T07:22:11.000Z",
        },
        {
          id: 1,
          faq_type: "G",
          faq: [
            {
              question:
                "Apart from mock exams/video courses, is there any further assistance I can get from Whizlabs?",
              answer:
                "Yes, you will get full support for any query related to the certification while preparing through our mock exams/video courses. Your query will be handled by the certified SME (Subject Matter Expert) & response will be provided in due course.",
              is_active: "1",
            },
          ],
          created_at: "2021-03-20T14:54:27.263Z",
          updated_at: "2022-11-17T07:22:11.000Z",
        },
        {
          id: 3,
          faq_type: "E",
          faq: [
            {
              question: "Does Whizlabs Offer any Subscription Plan?",
              answer:
                '<p>Yes, we offer various <a href="https://www.whizlabs.com/pricing/" target="_blank" rel="noopener">Subscription Plans</a> such as Premium & Premium+. With Whizlabs Premium+ subscription, you will get unlimited access to all the courses, hands-on labs, sandboxes with Premium Support for one year.</p>',
              is_active: "1",
            },
            {
              question: "Do you provide a course completion certificate?",
              answer:
                "<p>Yes, we provide a course completion certificate for online training courses. Once you watch the video course by 100% / complete an online course, you get a course completion certificate that is signed by our CEO.</p>",
              is_active: "1",
            },
            {
              question: "How long will I have access to the courses I purchase at Whizlabs?",
              answer:
                "<p><strong>Answer:</strong> At Whizlabs, the validity of your course access depends on the type of purchase:</p>\n<ul>\n    <li><strong>Subscription:</strong> If you purchase a subscription, you will have access to all included courses for the duration of your subscription period. Once the subscription ends, access to the courses will no longer be available.</li>\n    <li><strong>Individual Course Purchase:</strong> If you purchase an individual course, you will have access to that course for <strong>2 years</strong> from the date of purchase.</li>\n</ul>\n\n<p>For continued learning, you can renew your subscription or re-purchase individual courses once the validity expires.</p>",
              is_active: "1",
            },
            {
              question: "Do you provide a course completion certificate?",
              answer:
                "<p>Yes. We provide the course completion certificate once you have completed the 100% of the video lectures.</p>",
              is_active: "0",
            },
            {
              question: "How long is the license valid after the purchase?",
              answer:
                "Our simulators and video courses are valid for 2 years from the purchase date.",
              is_active: "1",
            },
            {
              question: "Can I switch from an individual course to a subscription?",
              answer:
                "<p>Yes, you can switch to a subscription at any time. However, the remaining validity of your individual course will not carry over to the subscription.</p>",
              is_active: "1",
            },
          ],
          created_at: "2021-03-20T14:54:27.263Z",
          updated_at: "2024-12-03T06:22:02.847Z",
        },
      ],
    };
    // axios.get(baseUrl + "/web/global_faqs").then(({ data }) => {
    const orderedFaqs = [];
    Object.keys(tabs).map((key) =>
      orderedFaqs?.push(data.data.find((faq) => faq.faq_type === key))
    );
    setFaq(orderedFaqs);
    // });
  }, []);

  const showFaqTab = (type) => {
    return (
      faq.filter(
        (faq) =>
          faq.faq_type === type &&
          faq.faq[0].question !== null &&
          faq.faq.find((f) => f.is_active == 1)
      ).length > 0
    );
  };
  const changeFaqType = (type) => {
    setFaqType(type);
    setExpanded(`panel0${type}`);
  };
  const tabs = {
    E: { title: "Exam & Products", icon: "icon-font-true-tick-with-circle" },
    T: { title: "Technical", icon: "icon-font-setting" },
    G: { title: "General", icon: "icon-font-general" },
    P: { title: "Payment", icon: "icon-font-payment-card" },
    S: { title: "Support", icon: "icon-font-support" },
  };
  return (
    <>
      {/* <Head>
        <title>Frequently Asked Questions (FAQs) - Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
        <meta name="title" content="Frequently Asked Questions (FAQs) - Whizlabs" />
        <meta
          name="description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta name="keywords" content="Frequently Asked Questions (FAQs)" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Frequently Asked Questions (FAQs) - Whizlabs" />
        <meta
          property="og:description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta property="og:url" content="https://www.whizlabs.com/faq/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025822"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta name="twitter:title" content="Frequently Asked Questions (FAQs) - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025869"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <!-- faq-banner --> */}
      <div className="faq-banner">
        <div className="container-small">
          <h1>Frequently Asked Questions (FAQs) - Whizlabs</h1>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="faq-page">
        {/* <!-- faq-block --> */}
        <div id="faq" className="faq-block">
          <div className="gradient-box"></div>
          <div className="container-small">
            <div id="faq-tab" className="tab_wrapper">
              <ul className="resp-tabs-list hor_1 tab_list">
                {faq.map(
                  (Itm, i) =>
                    Itm.faq.length > 0 &&
                    Itm.faq[0].question !== null &&
                    showFaqTab(Itm.faq_type) && (
                      <li
                        onClick={() => changeFaqType(Itm.faq_type)}
                        className={faqType === Itm.faq_type && "resp-tab-active"}
                      >
                        <samp>
                          <i className={`icon ${tabs[Itm.faq_type].icon}`}></i>
                          {tabs[Itm.faq_type].title}
                        </samp>
                      </li>
                    )
                )}
              </ul>
              <div className="resp-tabs-container hor_1 content_wrapper">
                {faq.length > 0 &&
                  faq.map((Itm, i) => {
                    return (
                      <>
                        {showFaqTab(Itm.faq_type) && (
                          <div
                            onClick={() => changeFaqType(Itm.faq_type)}
                            className={
                              faqType === Itm.faq_type
                                ? "resp-accordion hor_1 resp-tab-active"
                                : "resp-accordion hor_1"
                            }
                          >
                            <span className="arrow"></span>
                            <samp>
                              <i className={`icon ${tabs[Itm.faq_type].icon}`}></i>
                              {tabs[Itm.faq_type].title}
                            </samp>
                          </div>
                        )}
                        <div
                          key={i}
                          // title={Itm.faq_type}
                          className="tab_content active"
                          style={{
                            display: faqType === Itm.faq_type ? "block" : "none",
                            transition: "height 300ms",
                          }}
                        >
                          <div className="accordian-block">
                            <div className="accordian-list">
                              {Itm?.faq?.map((item, ie) => (
                                <React.Fragment key={ie}>
                                  {item && item.is_active == 1 && item.question && item.answer && (
                                    // <Accordions
                                    //   data={{
                                    //     key: ie,
                                    //     question: item.question,
                                    //     answer: item.answer,
                                    //   }}
                                    // />
                                    <div className="item">
                                      <Accordion
                                        expanded={expanded === `panel${ie}${Itm.faq_type}`}
                                        TransitionProps={{ unmountOnExit: true }}
                                        onChange={handleChange(`panel${ie}${Itm.faq_type}`)}
                                      >
                                        <AccordionSummary
                                          className={
                                            expanded === `panel${ie}${Itm.faq_type}`
                                              ? "item-head open"
                                              : "item-head"
                                          }
                                        >
                                          <>
                                            <samp></samp>
                                            <span>{item.question}</span>
                                          </>
                                        </AccordionSummary>
                                        <AccordionDetails className="item-content">
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: item.answer,
                                            }}
                                          ></div>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- upgradation-block --> */}
        <ContactUsAction />
      </div>
    </>
  );
};

export default Faq;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "faqPage",
    title: "Frequently Asked Questions (FAQs) - Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      { name: "title", property: "", content: "Frequently Asked Questions (FAQs) - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
      },
      { name: "keywords", property: "", content: "Frequently Asked Questions (FAQs)" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Frequently Asked Questions (FAQs) - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/faq/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025822",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
      },
      {
        name: "twitter:title",
        property: "",
        content: "Frequently Asked Questions (FAQs) - Whizlabs",
      },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025869",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };

  return {
    props: {
      seoHomePageData,
    },
  };
}
