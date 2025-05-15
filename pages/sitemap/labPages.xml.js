import axios from "axios";

const LabsSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_LABS_URL;
  const siteUrl = "https://www.whizlabs.com";
  let labsArray = [];

  let labsResponse = await axios.get(baseUrl + "/labs/get-sitemap-labspages");

  if (labsResponse && labsResponse.data.data) {
    labsResponse.data.data.map((item) => {
      if (item) {
        labsArray.push(siteUrl + "/labs/" + item + "/");
      }
    });
  }

  if (labsArray && labsArray.length > 0) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${labsArray
        .map((url) => {
          return `
                <url>
                  <loc>${url}</loc>
                </url>
              `;
        })
        .join("")}
        </urlset>
      `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  }

  return {
    props: {},
  };
};

export default LabsSitemap;
