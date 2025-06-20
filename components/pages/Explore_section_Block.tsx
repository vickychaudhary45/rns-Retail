import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Tab, Tabs } from "@mui/material";
// import Group19 from "../Group19";
// import "./ExploreSection2.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ExploreSection2(props) {
  const { forIndividuals, forBusiness, img1031, exploreNow } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="exploreSection">
      <div>
        <Tabs value={value} onChange={handleChange} aria-label="basictabs">
          <Tab label="For Individuals" {...a11yProps(0)} />

          {/* <Tab label="For Individuals" {...a11yProps(1)} /> */}
        </Tabs>
      </div>
      <TabPanel value={value} index={1}>
        <div className="explore-individual">
          <div className="individualImage">
            <Image
              width={1000}
              height={1000}
              // layout="responsive"
              style={{
                width: "100%",
                height: "100%",
              }}
              loading="eager"
              src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-hands-on-lab.webp`}
              alt="whizlabs hands on labs for aws microsoft azure google cloud"
            />
          </div>
          <div className="individualContent">
            <div className="group-19">
              <h1 className="custom-h1">
                Shape your skills
                <br />
                and transform
                <br />
                your career
              </h1>
              <div className="listtext">
                <Image
                  height={24}
                  width={24}
                  loading="lazy"
                  src="/images/pttest.png"
                  alt="RNSPATH hands on labs for aws microsoft azure google cloud"
                />
                &nbsp;&nbsp;
                <span>25,000+</span>
                <span>&nbsp;</span>
                <span>Practice Questions</span>
              </div>
              <div className="listtext">
                <Image
                  height={24}
                  width={24}
                  loading="lazy"
                  src="/images/Vectoroxtest.png"
                  alt="OC"
                />
                &nbsp;&nbsp;
                <span>4500+</span>
                <span>&nbsp;</span>
                <span>Videos</span>
              </div>
              <div>
                <Link href="/library">
                  <button className="bannerButton">
                    <b>Explore Now</b>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <div className="explore-individual">
          <div
            className="individualImage"
            style={{ display: "flex", justifyContent: "center", padding: "0 0  10px 0" }}
          >
            <Image
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "100%",
              }}
              loading="eager"
              src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-upskilling.webp`}
              alt="upskilling employees on cloud devops microsoft aws google cloud"
            />
          </div>
          <div className="individualContent">
            <div className="group-19">
              {/* <h1>
                upskill your <br />
                workforce <br />
                @5X SPEED
              </h1> */}
              <h1 className="custom-h1">
                Shape your skills
                <br />
                and transform
                <br />
                your career
              </h1>
              <div className="listtext">
                <Image
                  height={24}
                  width={24}
                  loading="lazy"
                  src="/images/pttest.png"
                  alt="RNSPATH hands on labs for aws microsoft azure google cloud"
                />
                &nbsp;&nbsp;
                <span>25,000+</span>
                <span>&nbsp;</span>
                <span>Practice Questions</span>
              </div>
              <div className="listtext TextDiv">
                <Image
                  height={24}
                  width={24}
                  loading="lazy"
                  src="/images/Vectoroxtest.png"
                  alt="OC"
                  style={{ margin: 0 }}
                />
                <div className="insideText">Track your Learning Progress</div>
              </div>
              <div className="listtext TextDiv">
                <Image
                  height={24}
                  width={24}
                  loading="lazy"
                  src="/images/pttest.png"
                  alt="PT"
                  style={{ margin: 0 }}
                />
                <div className="insideText">Create learning paths for yourself</div>
              </div>
              <div className="listtext TextDiv">
                <Image
                  height={24}
                  width={24}
                  loading="lazy"
                  className="labs-icons-1"
                  src="/images/labstest.png"
                  alt="lab"
                  style={{ margin: 0 }}
                />
                <div className="insideText">Fasten your on-boarding & upskilling requirements</div>
              </div>
              <div>
                <a href={process.env.NEXT_PUBLIC_BUSINESS_URL} target="_blank">
                  <button className="bannerButton">
                    <b>Explore Now</b>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}

export default ExploreSection2;
