import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { createTimeModel, useTimeModel } from "react-compound-timer";
const PPCbanner = ({closeBanner,bannerStatus}) => {
  //const [bannerStatus, setBannerStatus] = useState(true);

  const timer = createTimeModel({
    initialTime: Math.abs(
      new Date("10 June 2023 11:00:00 GMT+5:30").valueOf() - new Date().valueOf()
    ),
    direction: "backward",
  });
  const { value } = useTimeModel(timer);

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  // const closeBanner = () => {
  //   setBannerStatus(false);
  //   cookie.set("subs_bottom_banner", "active", { expires: 3 });
  // };

  return (
    <>
      <div className="exclusive-banner" style={{ display: bannerStatus ? "block" : "none" }}>
        <div className="container">
          <div className="left-block">
            <div className="annual-text" style={{ fontSize: "18px" }}>
              <span>EXCLUSIVE OFFER </span>Flat 20% off SITWEIDE
            </div>
          </div>
          <div className="right-block">
            <div className="plan-group">
              <div className="box">
                <p>Practice Tests + Video Courses + Hands-On Labs</p>
              </div>
              <div className="line"></div>
            </div>
            <div className="coupon-group">
              <div className="countdow">
                <div className="count">
                  <div className="colon">
                    <div id="ppcday">{value.d}</div>
                    <span>:</span>
                  </div>
                  <label>days</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="ppchou">{value.h}</div>
                    <span>:</span>
                  </div>
                  <label>hours</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="ppcmin">{value.m}</div>
                    <span>:</span>
                  </div>
                  <label>mins</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="ppcsec">{value.s}</div>
                    <span></span>
                  </div>
                  <label>sec</label>
                </div>
              </div>
              <div className="coupon">
                <div className="group">
                  <small>Use Coupon:</small>
                  <div className="code">WHIZ20SITE</div>
                </div>
                <a href="/training/library" className="btn btn-now">
                  Enroll Now
                  <img src="/images/btn-right.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <i
          className="btn-close icon-font-cross"
          onClick={(e) => {
            e.preventDefault();
            closeBanner();
          }}
        ></i>
      </div>
    </>
  );
};

export default PPCbanner;
