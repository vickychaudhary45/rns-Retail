import axios from "axios";
import Head from "next/head";
import Cookie from "js-cookie";
import Router from "next/router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

import store from "../redux/store";
import MenuList from "../lib/Menu.json";
import Layout from "@/components/shared/Layout";
import FooterDataList from "../lib/FooterData.json";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrlA = process.env.NEXT_PUBLIC_ASSIST_URL;

//Binding events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, router }) => {
  const [loading, setloading] = useState(true);
  const [ipDetails, setIpDetails] = useState({});
  const [promoData, setPromoData] = useState([]);
  const [cart_count, setCart_count] = useState(0);
  const [offerHeader, setOfferHeader] = useState(null);
  const [timer_details, setTimer_details] = useState(null);
  const [websiteSettings, setWebsiteSettings] = useState([]);
  const [maintenance_details, setMaintenance_details] = useState(null);

  const fetchCampaignData = async () => {
    let tm_data = await axios.get(baseUrl + "/campaigns/get");
    if (tm_data.data && tm_data.data.timer) {
      return tm_data.data.timer;
    } else {
      return {};
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

  useEffect(() => {
    Cookie.remove("cartData");
    // Promise.all([fetchCampaignData(), fetchMaintenanceData(), OfferHeaderData()]).then(
    //   (results) => {
    //     setTimer_details(results[0]);
    //     setMaintenance_details(results[1]);
    //     setOfferHeader(results[2]);
    //     setloading(false);
    //   }
    // );
    setloading(false);
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
                    content={tag?.content ? tag.content : ""}
                    property={tag?.property ? tag.property : ""}
                  />
                );
              } else if (tag.property && tag.content && !tag.name) {
                return (
                  <meta
                    key={index}
                    content={tag?.content ? tag.content : ""}
                    property={tag?.property ? tag.property : ""}
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

        {/* GOOGLE TAG MANAGER */}
        {/* <Script strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-PV9429C')`}
        </Script> */}
        {/* END GOOGLE TAG MANAGER */}
      </Head>

      <SessionProvider session={pageProps?.session}>
        <Provider store={store}>
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/images/logo-small11.svg" height="300" alt="RNS Logo" />
            </div>
          ) : (
            <Layout
              menusList={MenuList}
              promoData={promoData}
              ip_details={ipDetails}
              cart_count={cart_count}
              offerHeader={offerHeader}
              footerData={FooterDataList}
              timer_details={timer_details}
              setCart_count={setCart_count}
              websiteSettings={websiteSettings}
              maintenance_details={maintenance_details}
            >
              <Component {...pageProps} promoData={promoData} timer_details={timer_details} />
            </Layout>
          )}
        </Provider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
