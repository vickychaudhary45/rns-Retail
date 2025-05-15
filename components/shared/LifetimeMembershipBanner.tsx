import Link from "next/link";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import bf_offer from "../black-friday-offers";
import { createTimeModel, useTimeModel } from "react-compound-timer";

const LifetimeMembershipBanner = () => {
  const [bannerStatus, setBannerStatus] = useState(true);

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const closeBanner = () => {
    setBannerStatus(false);
    cookie.set("lifetime_membership_banner", "active", { expires: 3 });
  };
  const timer = createTimeModel({
    initialTime: Math.abs(
      new Date("30 May 2022 11:00:00 GMT+05:30").valueOf() - new Date().valueOf()
    ),
    direction: "backward",
  });
  const { value } = useTimeModel(timer);
  return (
    <>
      <div
        className="bottom-big-lifetime bottom-banner"
        style={{ display: bannerStatus ? "block" : "none" }}
      >
        <div className="container">
          <div className="left-block">
            <h5>big holiday Sale </h5>
            <div className="intro-txt-group">
              <div className="box">
                <label>Get Lifetime Membership</label>
                <div className="price-box">
                  <span className="price">At just $699 </span>
                  <del className="old-price">$999</del>
                </div>
              </div>
            </div>
            <figure className="big-life">
              <img className="img-full" src="/images/big-life-time.jpg" alt="" />
            </figure>
          </div>
          <div className="right-block">
            <div className="coupon-group">
              <div className="txt">
                <label>Use Coupon</label> <span>WHIZ30BHS</span>
              </div>
              <Link legacyBehavior href="/lifetime-membership/">
                <a className="btn">Subscribe Now</a>
              </Link>
            </div>
            <div className="main-timer">
              <div className="count">
                <div className="colon">
                  <div id="day">{value.d}</div>
                  <span>:</span>
                </div>
                <label>days</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="hou">{value.h}</div>
                  <span>:</span>
                </div>
                <label>hours</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="min">{value.m}</div>
                  <span>:</span>
                </div>
                <label>mins</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="sec">{value.s}</div>
                  <span></span>
                </div>
                <label>sec</label>
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

export default LifetimeMembershipBanner;

/*
 <>
      <div
        className="bottom-friday-lifetime bottom-banner"
        style={{ display: bannerStatus ? "block" : "none" }}
      >
        <div className="container">
          <div className="black-text">
            Black Friday<span>Sale</span>
          </div>
          <div className="right-block">
            <div className="intro-txt-group">
              <div className="box">
                <label>Introducing</label>
                <span>Lifetime Membership</span>
              </div>
              <div className="box">
                <label>At just</label>
                <div className="price-box">
                  <span className="price">$650</span>
                  <del className="old-price">$999</del>
                </div>
              </div>
            </div>
            <div className="coupon-group">
              <div className="txt">
                <label>Use Coupon</label>
                <span>BLACKFRIDAY21LIFE35</span>
              </div>
              <Link legacyBehavior  href="/lifetime-membership/">
                <a className="btn">Subscribe Now</a>
              </Link>
            </div>
            <div className="main-timer">
              <div className="count">
                <div className="colon">
                  <div id="daytime3"></div>
                  <span>:</span>
                </div>
                <label>days</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="hourtime3"></div>
                  <span>:</span>
                </div>
                <label>hours</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="minutetime3"></div>
                  <span>:</span>
                </div>
                <label>mins</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="secondtime3"></div>
                  <span></span>
                </div>
                <label>sec</label>
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

*/
