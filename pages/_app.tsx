import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Layout from "@/components/shared/Layout";
import { SessionProvider } from "next-auth/react";
import MenuList from "../lib/Menu.json";
import FooterDataList from "../lib/FooterData.json";
import ErrorBoundary from "../components/ErrorBoundary";
import Cookie from "js-cookie";
import Script from "next/script";
import dynamic from "next/dynamic";
const DynamicLayout = dynamic(() => import("@/components/shared/Layout"));

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrlA = process.env.NEXT_PUBLIC_ASSIST_URL;
const JS_SCRIPTS = [
  // "/js/jquery-3.6.1.min.js", // https://code.jquery.com/jquery-3.6.1.min.js
  // "/js/jquery-ui.js",
  // "/custom/header.js",
  "/custom/custom.js",
];

//Binding events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, router }) => {
  const [ipDetails, setIpDetails] = useState({});
  const [timer_details, setTimer_details] = useState(null);
  const [maintenance_details, setMaintenance_details] = useState(null);
  const [offerHeader, setOfferHeader] = useState(null);
  const [loading, setloading] = useState(true);
  const [cart_count, setCart_count] = useState(0);
  const pageData = pageProps?.pageData;
  const pageContent = pageProps?.pageData;
  const TEST_PATH = "whizlabs.com";

  const [websiteSettings, setWebsiteSettings] = useState([]);
  const [promoData, setPromoData] = useState([]);

  const fetchCampaignData = async () => {
    let tm_data = await axios.get(baseUrl + "/campaigns/get");
    if (tm_data.data && tm_data.data.timer) {
      return tm_data.data.timer;
    } else {
      return {};
    }
  };
  const fetchMaintenanceData = async () => {
    try {
      let m_data = await axios.get(`${baseUrlA}/website/banner?domain=${0}&platform=${1}`);
      if (m_data.data && m_data.data.data && m_data.data.status !== "error") {
        return m_data.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  const OfferHeaderData = async () => {
    try {
      let offer = await axios.get(`${baseUrl}/combo/offer`);
      if (offer.data.offerData) {
        return offer.data.offerData;
      } else {
        return {};
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    Cookie.remove("cartData");
    Promise.all([fetchCampaignData(), fetchMaintenanceData(), OfferHeaderData()]).then(
      (results) => {
        setTimer_details(results[0]);
        setMaintenance_details(results[1]);
        setOfferHeader(results[2]);
        setloading(false);
      }
    );
  }, []);

  useEffect(() => {
    axios.get("https://api64.ipify.org/?format=json").then((resp) => {
      const ip = resp.data.ip;
      axios.get(baseUrl + "/data/ip2location?ip=" + ip).then((res) => {
        setIpDetails(res.data.data);
      });
    });

    axios
      .get(baseUrl + "/web/fetch-website-settings")
      .then((resp) => {
        setWebsiteSettings(resp.data.data);
      })
      .catch((err) => {
        console.error("Website Settings error:", baseUrl, err);
      });
    axios
      .get(baseUrl + "/web/promotions")
      .then((resp) => {
        setPromoData(resp.data);
      })
      .catch((err) => {
        console.error("Website Promos error:", baseUrl, err);
      });
  }, []);

  interface PageProps {
    seoHomePageData?: {
      metaTags: any[];
      seoPageType: "";
      title: "";
    };
  }

  const { seoHomePageData: { metaTags, ...seoHomePageData } = {} as PageProps } = pageProps ?? {};

  return (
    <>
      <Head>
     
        {seoHomePageData?.seoPageType && (
          <>
            <title>{seoHomePageData?.title != "" && seoHomePageData?.title}</title>
            {metaTags?.map((tag, index) => {
              if (tag.name && tag.property && tag.content) {
                return (
                  <meta
                    key={index}
                    name={tag?.name ? tag.name : ""}
                    property={tag?.property ? tag.property : ""}
                    content={tag?.content ? tag.content : ""}
                  />
                );
              } else if (tag.property && tag.content && !tag.name) {
                return (
                  <meta
                    key={index}
                    property={tag?.property ? tag.property : ""}
                    content={tag?.content ? tag.content : ""}
                  />
                );
              } else if (tag.name && tag.content && !tag.property) {
                return (
                  <meta key={index} name={tag?.name} content={tag?.content ? tag.content : ""} />
                );
              }
            })}
          </>
        )}
        {/* {pageContent ? (
          <>
            <Script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: (Math.floor(pageContent.ratings?.overall_rating * 2) / 2).toFixed(1),
                  reviewCount: pageContent.ratings?.rating,
                },
                description: pageContent.seo_details?.seo_description,
                mpn: pageContent?.sku,
                sku: pageContent?.sku,
                brand: {
                  "@type": "Brand",
                  name: "Whizlabs",
                },
                name: pageContent.seo_details?.seo_title,
                seo_title: pageContent.seo_details?.seo_title,
                image:
                  process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                  pageContent.seo_details?.featured_image?.replace("media/", ""),
              })}
            </Script>
          </>
        ) : null} */}
        {/* GOOGLE TAG MANAGER */}
        {/* <Script
        strategy="beforeInteractive"
        >
          {
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-PV9429C')`
          }
        </Script> */}

        {/* END GOOGLE TAG MANAGER */}
      </Head>

      <SessionProvider session={pageProps?.session}>
        <Provider store={store}>
          {/* {!loading ? ( */}
          <Layout
            websiteSettings={websiteSettings}
            menusList={MenuList}
            footerData={FooterDataList}
            ip_details={ipDetails}
            promoData={promoData}
            timer_details={timer_details}
            maintenance_details={maintenance_details}
            offerHeader={offerHeader}
            cart_count={cart_count}
            setCart_count={setCart_count}
          >
            <Component {...pageProps} promoData={promoData} timer_details={timer_details} />
          </Layout>
          {/* ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100vh",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <img src="/images/logo.svg" width={"500px"} alt="Whizlabs Logo" />
            </div>
          )} */}
        </Provider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
