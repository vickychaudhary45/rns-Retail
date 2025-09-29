import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        padding: "3rem 1rem",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Left Section */}
      <div style={{ flex: "1 1 350px", maxWidth: "600px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1f2937",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          Unlock Your Potential <br />
          <span style={{ color: "#2563eb" }}>with Byway</span>
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          Welcome to Byway, where learning knows no bounds. We believe that education is the key to
          personal and professional growth. Whether you're a student, professional, or lifelong
          learner, our cutting-edge Learning Management System is designed to elevate your learning
          experience.
        </p>

        <Link href="/instructor" passHref>
          <motion.button
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "1rem",
              marginBottom: "3rem",
              display: "block",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start your instructor journey
          </motion.button>
        </Link>
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: "1 1 300px",
          maxWidth: "500px",
          width: "100%",
          minWidth: "260px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Background Image */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
            >
              <Image
                src="/images/frame12.svg"
                alt="Byway Learning Platform"
                width={400}
                height={500}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
                }}
                priority
              />
            </div>

            {/* Overlay Image */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                right: 40,
                width: "100%",
                height: "100%",
                zIndex: 2,
                opacity: 1,
              }}
            >
              <Image
                src="/images/BannerPage.svg"
                alt="Byway Banner Overlay"
                width={400}
                height={500}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
                }}
                priority
              />
            </div>

            {/* Completion Rate Card */}
            <motion.div
              style={{
                position: "absolute",
                top: "-2px",
                right: "-20px",
                background: "white",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                padding: "1.2rem 0.8rem",
                textAlign: "center",
                width: "150px",
                border: "1px solid #e5e7eb",
                zIndex: 20,
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.7rem",
                  color: "#2563eb",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                87.6%
              </div>
              <div
                style={{
                  color: "#374151",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Completion rate
                <br />
                of our courses
              </div>
            </motion.div>
            <div style={{ marginBottom: "0.8rem" }}>
              <img
                src="/images/Group.svg" // Ensure this path matches your image
                alt="Courses Sold"
                style={{
                  position: "absolute",
                  bottom: "380px",
                  left: "-85px",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Course Sold Card */}
            <motion.div
              style={{
                position: "absolute",
                bottom: "18px",
                left: "-150px",
                background: "#ffffff",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                padding: "1.2rem 0.8rem",
                textAlign: "center",
                width: "230px",
                border: "1px solid #e5e7eb",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
              }}
              whileHover={{ scale: 1.03, y: -2 }} // Adjusted y for upward hover effect
              transition={{ duration: 0.2 }}
            >
              {/* dottened image Section */}
              <div style={{ marginBottom: "0.8rem" }}>
                <img
                  src="/images/Group2.svg" // Ensure this path matches your image
                  alt="Courses Sold"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                    margin: "0 auto",
                    gap: "0.5rem",
                  }}
                />
              </div>
              <div
                style={{
                  color: "#6b7280", // Matches the gray text color in the image
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: "0.3rem",
                  textAlign: "center",
                  marginLeft: "10px",
                }}
              >
                Number of courses
                <br />
                sold
                <br />
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.7rem",
                    color: "#111827", // Matches the dark text color in the image (close to black)
                    lineHeight: 1,
                  }}
                >
                  100,000+
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;


// import Link from "next/link";
// import Image from "next/image";
// import MyTimer from "./Timer";
// import { motion } from "framer-motion";
// const Banner = ({ width, timer_details1, subscriptionSaving, timerState1 }) => {
//   // const [timerDetails, setTimerDetails] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   const handleClick = () => {
//     if (timer_details1.clicks.headerOnclick == 1) {
//       window.open(`${timer_details1.clicks.header}`, "_self");
//     } else {
//       window.open(`${timer_details1.clicks.header}`);
//     }
//   };
//   //subscribtion price save
//   // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   // const [subscriptionSaving, setSubscriptionSaving] = useState("");
//   // const [subscriptionData, setSubscriptionData] = useState([]);

//   // let fetchSubscriptionData = async () => {
//   //   try {
//   //     const response = await axios.get(baseUrl + "/subscription/plans");
//   //     setSubscriptionData(response.data.data);
//   //   } catch (error) {
//   //     console.error("Error fetching subscription data:", error);
//   //   }
//   // };

//   // const fetchCampaigns = async () => {
//   //   let tm_data = await axios.get(baseUrl + "/campaigns/get");
//   //   if (tm_data.data && tm_data.data.timer) {
//   //     setTimerDetails(tm_data.data.timer.details);
//   //   }
//   // };
//   // useEffect(() => {
//   // setLoading(true);
//   // Promise.all([fetchCampaigns(), fetchSubscriptionData()]).then(() => {
//   //   setLoading(false);
//   // });
//   // fetchCampaigns()
//   // fetchSubscriptionData();
//   // }, []);

//   // useEffect(() => {
//   //   if (subscriptionData.length > 0) {
//   //     let oneMonthplans = subscriptionData.filter(
//   //       (Itm) => Itm.subscription_for === 1 && Itm.title === "Premium Plus"
//   //     );
//   //     let oneYearPlans = subscriptionData.filter(
//   //       (Itm) => Itm.subscription_for === 12 && Itm.title === "Premium Plus"
//   //     );
//   //     let saving = (
//   //       oneMonthplans[0].offer_price.usd * 12 -
//   //       oneYearPlans[0].offer_price.usd
//   //     ).toFixed(2);
//   //     setSubscriptionSaving(saving);
//   //   }
//   // }, [subscriptionData]);

//   // if (loading) {
//   //   return (
//   //     <div className="banner-front">
//   //       <div
//   //         className={"container"}
//   //         style={{
//   //           display: "flex",
//   //           justifyContent: "center",
//   //           alignItems: "center",
//   //         }}
//   //       >
//   //         <img src="/images/logo11.svg" width={"30%"} alt="Whizlabs Logo" />
//   //       </div>
//   //     </div>
//   //   );
//   // }
//   // console.log({ timer_details1 });
//   if (timer_details1 && timerState1) {
//     return (
//       <>
//         {timer_details1?.desktopImg != null && (
//           <div className="desktop-banner-front">
//             <div
//               className="banner-front"
//               style={{
//                 margin: "0px",
//                 background: `${timer_details1?.gradient}`,
//                 width: "100%",
//               }}
//             >
//               <div className={"container"}>
//                 <div
//                   style={{ cursor: "pointer" }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleClick();
//                   }}
//                 >
//                   <Image
//                     fill={false}
//                     layout="responsive"
//                     width={0}
//                     height={0}
//                     src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.desktopImg}`}
//                     style={{
//                       position: "inherit",
//                     }}
//                     alt="Desktop-Homepage-header.webp"
//                     loading="eager"
//                     blurDataURL={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.desktopImg}`}
//                     placeholder="blur"
//                     loader={({ src }) => `${src}?w=${width}&q=${10}`}
//                     priority={true}
//                   />
//                 </div>
//                 <div className="timer-main">
//                   {timer_details1.toggleTimer?.value != 0 && (
//                     <div className="timer">{<MyTimer design={timer_details1?.design} />}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {timer_details1?.mobileheader != null && (
//           <div className="mobile-banner-front">
//             <div
//               className="banner-front"
//               style={{
//                 margin: "0px",
//                 background: `${timer_details1?.gradient}`,
//                 width: "100%",
//               }}
//             >
//               <div className={"container"}>
//                 <div
//                   style={{ cursor: "pointer" }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleClick();
//                   }}
//                 >
//                   <Image
//                     fill={false}
//                     layout="responsive"
//                     width={0}
//                     height={0}
//                     src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.mobileheader}`}
//                     style={{
//                       position: "inherit",
//                     }}
//                     alt="Desktop-Homepage-header.webp"
//                     loading="eager"
//                     blurDataURL={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details1?.mobileheader}`}
//                     placeholder="blur"
//                     loader={({ src }) => `${src}?w=${width}&q=${10}`}
//                     priority={true}
//                   />
//                 </div>
//                 <div className="timer-main">
//                   {timer_details1?.toggleTimer?.value != 0 && (
//                     <div className="timer">{<MyTimer design={timer_details1?.mdesign} />}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }
//   return (
//     <div className="bannerContainer">
//       <div className="bannerText">
//         <div>
//           <h1>
//             Rewire <br />
//             Neural Speed
//           </h1>
//           <p>with our</p>
//           <span>Power Study</span>
//           <div
//             style={{
//               height: "50px",
//             }}
//           >
//             <Link legacyBehavior href="/pricing">
//               <motion.button
//                 className="bannerButton"
//                 whileHover={{ scale: 1.2, transition: { duration: 0.8 } }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <b>Explore pricing</b>
//                 {/* ${subscriptionSaving} */}
//                 <i className="icon-font-arrow-right"></i>
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="bannerImage">
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             // overflow: "hidden",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Image
//             src={`/images/bannerRight.svg`}
//             alt="RNSPATH it certifications online training provider"
//             style={{
//               objectFit: "contain",
//               width: "90%",
//               height: "100%",
//               transform: "scale(3)",
//               transformOrigin: "center",
//             }}
//             width={100}
//             height={100}
//             layout="raw"
//             placeholder="blur"
//             loader={({ src }) => `${src}?w=${width}&q=${10}`}
//             priority={true}
//             loading="eager"
//             blurDataURL={`/images/Vector.svg`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
