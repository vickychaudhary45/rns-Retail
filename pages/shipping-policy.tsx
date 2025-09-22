import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const ShippingPolicy = (seoHomePageData) => {
  return (
    <>
      <div id="content-area" className="terms-use-page">
        <div className="page-content">
          <div className="container-small">
            <div className="page-title">
              <h1>Shipping & Delivery Policy</h1>
            </div>
            <div className="terms">
              <br />
              <h3>Shipping Policy</h3>
              <p>
                Since our products/services are delivered digitally, there is no physical shipping
                required.
              </p>
              <p>
                Upon successful payment, you will receive instant access to the purchased
                course/materials via email or through your account on our platform.
              </p>
              <p>
                If you face any issues with access, please contact us at pathrns@gmail.com within 24
                hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "termPage",
    title: "Shipping Policy - rns path",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      { name: "title", property: "", content: "Shipping Policy - rns path" },
      {
        name: "description",
        property: "",
        content:
          "Explore guidelines for a seamless learning journey. Stay informed on rnspath terms & policies to maximize your upskilling journey.",
      },
      {
        name: "keywords",
        property: "",
        content: "Explore guidelines for a seamless learning journey.",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Shipping Policy - rns path" },
      {
        name: "",
        property: "og:description",
        content:
          "Explore guidelines for a seamless learning journey. Stay informed on rnspath terms & policies to maximize your upskilling journey.",
      },
      { name: "", property: "og:url", content: "https://www.rnspath.com/terms-of-use/" },
      { name: "", property: "og:site_name", content: "rnspath" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd7f7b40c5",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Explore guidelines for a seamless learning journey. Stay informed on rnspath terms & policies to maximize your upskilling journey.",
      },
      { name: "twitter:title", property: "", content: "Shipping Policy - rnspath" },
      { name: "twitter:site", property: "", content: "@rnspath" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd7f7b410b",
      },
      { name: "twitter:creator", property: "", content: "@rnspath" },
    ],
  };

  return {
    props: {
      seoHomePageData,
    },
  };
}
