import Link from "next/link";
import Image from "next/image";
import MyTimer from "./Timer";
import { motion } from "framer-motion";
const Banner = ({ width, timer_details1, subscriptionSaving, timerState1 }) => {
  // const [timerDetails, setTimerDetails] = useState(null);
  // const [loading, setLoading] = useState(true);
  const handleClick = () => {
    if (timer_details1.clicks.headerOnclick == 1) {
      window.open(`${timer_details1.clicks.header}`, "_self");
    } else {
      window.open(`${timer_details1.clicks.header}`);
    }
  };
  //subscribtion price save
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const [subscriptionSaving, setSubscriptionSaving] = useState("");
  // const [subscriptionData, setSubscriptionData] = useState([]);

  // let fetchSubscriptionData = async () => {
  //   try {
  //     const response = await axios.get(baseUrl + "/subscription/plans");
  //     setSubscriptionData(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching subscription data:", error);
  //   }
  // };

  // const fetchCampaigns = async () => {
  //   let tm_data = await axios.get(baseUrl + "/campaigns/get");
  //   if (tm_data.data && tm_data.data.timer) {
  //     setTimerDetails(tm_data.data.timer.details);
  //   }
  // };
  // useEffect(() => {
  // setLoading(true);
  // Promise.all([fetchCampaigns(), fetchSubscriptionData()]).then(() => {
  //   setLoading(false);
  // });
  // fetchCampaigns()
  // fetchSubscriptionData();
  // }, []);

  // useEffect(() => {
  //   if (subscriptionData.length > 0) {
  //     let oneMonthplans = subscriptionData.filter(
  //       (Itm) => Itm.subscription_for === 1 && Itm.title === "Premium Plus"
  //     );
  //     let oneYearPlans = subscriptionData.filter(
  //       (Itm) => Itm.subscription_for === 12 && Itm.title === "Premium Plus"
  //     );
  //     let saving = (
  //       oneMonthplans[0].offer_price.usd * 12 -
  //       oneYearPlans[0].offer_price.usd
  //     ).toFixed(2);
  //     setSubscriptionSaving(saving);
  //   }
  // }, [subscriptionData]);

  // if (loading) {
  //   return (
  //     <div className="banner-front">
  //       <div
  //         className={"container"}
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <img src="/images/logo.svg" width={"30%"} alt="Whizlabs Logo" />
  //       </div>
  //     </div>
  //   );
  // }
  // console.log({ timer_details1 });
  if (timer_details1 && timerState1) {
    return (
      <>
        {timer_details1?.desktopImg != null && (
          <div className="desktop-banner-front">
            <div
              className="banner-front"
              style={{
                margin: "0px",
                background: `${timer_details1?.gradient}`,
                width: "100%",
              }}
            >
              <div className={"container"}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  <Image
                    fill={false}
                    layout="responsive"
                    width={0}
                    height={0}
                    src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.desktopImg}`}
                    style={{
                      position: "inherit",
                    }}
                    alt="Desktop-Homepage-header.webp"
                    loading="eager"
                    blurDataURL={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.desktopImg}`}
                    placeholder="blur"
                    loader={({ src }) => `${src}?w=${width}&q=${10}`}
                    priority={true}
                  />
                </div>
                <div className="timer-main">
                  {timer_details1.toggleTimer?.value != 0 && (
                    <div className="timer">{<MyTimer design={timer_details1?.design} />}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {timer_details1?.mobileheader != null && (
          <div className="mobile-banner-front">
            <div
              className="banner-front"
              style={{
                margin: "0px",
                background: `${timer_details1?.gradient}`,
                width: "100%",
              }}
            >
              <div className={"container"}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  <Image
                    fill={false}
                    layout="responsive"
                    width={0}
                    height={0}
                    src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.mobileheader}`}
                    style={{
                      position: "inherit",
                    }}
                    alt="Desktop-Homepage-header.webp"
                    loading="eager"
                    blurDataURL={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.mobileheader}`}
                    placeholder="blur"
                    loader={({ src }) => `${src}?w=${width}&q=${10}`}
                    priority={true}
                  />
                </div>
                <div className="timer-main">
                  {timer_details1?.toggleTimer?.value != 0 && (
                    <div className="timer">{<MyTimer design={timer_details1?.mdesign} />}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="bannerContainer">
      <div className="bannerText">
        <div>
          <h1>
            OutSmart <br />
            Yourself
          </h1>
          <p>with our</p>
          <span>Premium Subscription</span>
          <div
            style={{
              height: "50px",
            }}
          >
            {/* {subscriptionSaving !== "" && ( */}
            <Link legacyBehavior href="/pricing">
              <motion.button
                className="bannerButton"
                whileHover={{ scale: 1.2, transition: { duration: 0.8 } }}
                whileTap={{ scale: 0.9 }}
              >
                <b>Save upto</b>${subscriptionSaving}
                <i className="icon-font-arrow-right"></i>
              </motion.button>
            </Link>
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="bannerImage">
        <Image
          src={`/images/whizlabs-it-certifications-training.webp`}
          alt="whizlabs it certifications online training provider"
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          width={100}
          height={100}
          layout="raw"
          // width={width > 1024 ? 500 : 300}
          // height={width > 1024 ? 500 : 300}
          placeholder="blur"
          loader={({ src }) => `${src}?w=${width}&q=${10}`}
          priority={true}
          loading="eager"
          blurDataURL={`/images/whizlabs-it-certifications-training.webp`}
        />
      </div>
    </div>
  );
};

export default Banner;
