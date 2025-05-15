import Link from "next/link";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import bf_offer from "../black-friday-offers";
import { connect } from "react-redux";
import { createTimeModel, useTimeModel } from "react-compound-timer";
import Countdown from "react-countdown";
import { useRouter } from "next/router";

const CCPFooterBanner = ({ currencyData, crazyDealData }) => {
  const [bannerStatus, setBannerStatus] = useState(true);

  const closeBanner = () => {
    cookie.set("bottom_banner_condition", bf_offer?.banner_offer, { expires: 4 });
    setBannerStatus(false);
  };
  const router = useRouter();
  const renderer = ({days,hours, minutes, seconds, completed})=>{
    return <>
                <div className="countdow">
              
              <div className="count">
                <div className="colon">
                  
                  <span>{days > 9?<>{days}</>:`0${days}`}:</span>
                </div>
                <label>days</label>
              </div>
              <div className="count">
                <div className="colon">
                  {hours >9 ?<>{hours}</>:<>{`0${hours}`}</>}
                  <span>:</span>
                </div>
                <label>hours</label>
              </div>
              <div className="count">
                <div className="colon">
                  {minutes > 9 ?<>{hours}</>:<>{`0${minutes}`}</>}
                  <span>:</span>
                </div>
                <label>mins</label>
              </div>
              <div className="count">
                <div className="colon">
                 {seconds > 9 ? <>{seconds}</> : <>{`0${seconds}`}</>}
                  <span></span>
                </div>
                <label>sec</label>
              </div>
            
          </div>
    </>
  }

  return <>
   
        <div
      className="crazy-deal-banner bottom-banner footer-sticky-banner"
      style={{ display: bannerStatus ? "block" : "none" }}
      id="crazy-deal"
    >
      <div className="container">
        <div className="crazy-txt">
          {crazyDealData.promotion_type}
          <span style={{ fontSize: "14px" }}>{crazyDealData.promotion_title}</span>
        </div>
        <div className="right-block">
          <div
            className="coupon-txt-group"
            dangerouslySetInnerHTML={{ __html: crazyDealData.banner_bottom }}
          />
          <div className="price-block">
            <label className="txt">at Just</label>
            <span className="price">
              {currencyData?.symbol + crazyDealData.discounted_price[currencyData.type]}
            </span>
          </div>
          <Countdown 
          date={new Date(crazyDealData.end_date).valueOf()} 
          renderer={renderer} 
          autoStart={true}
          onComplete={()=>{
            router.push('/')
          }}
          />
          {/* <a className="btn-enroll-now icon-font-arrow-right" href="#crazy-deal">
            Buy Now
          </a> */}
        </div>
      </div>
      <i className="btn-close icon-font-cross" onClick={closeBanner}></i>
    </div>
  </>

  ;
};



const mapStateToProps = (state) => {
  return {
    currencyData: state.ipDetails.currency_detail,
  };
};

export default connect(mapStateToProps, null)(CCPFooterBanner);

{
  /*
    <>
      <div
        className="affordable-monthly-plans bottom-banner"
        style={{ display: bannerStatus ? "block" : "none" }}
      >
        <div className="container">
          <div className="caption">
            <label>Introducing affordable</label>
            <h6>Monthly Subscription Plans</h6>
          </div>
          <div className="plans-group">
            <div className="box one-month">
              <label>One Month Plan</label>
              <div className="price-box">
                <span className="price">$19</span>
                &nbsp;&nbsp;
                <del className="old-price">$69</del>
              </div>
            </div>
            <div className="box three-month">
              <label>Three Months Plan</label>
              <div className="price-box">
                <span className="price">$49</span>
                &nbsp;&nbsp;
                <del className="old-price">$99</del>
              </div>
            </div>
          </div>
          <Link legacyBehavior  href="/pricing">
            <a className="btn btn-now">
              Subscribe Now
              <img src="/images/btn-right.svg" alt="" />
            </a>
          </Link>
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
}

{
  /* 
      <div className="footer-sticky-banner" style={{ display: bannerStatus ? "block" : "none" }}>
      <div className="subscription-banner" >
        <div className="container">
          <div className="annual-text">
            <span>Whizlabs</span>Annual subscription
          </div>
          <div className="right-block">
            <ul>
              <li>
                <span>Get Unlimited Access</span> All Courses
              </li>
              <li>
                <span>Get Unlimited Access</span>Hands-on Labs
              </li>
              <li>
                <span>Get 24/7 Instant</span>Premium Support
              </li>
            </ul>
            <div className="price-group">
              <div className="price-block">
                <del className="old-price">US$199</del>
                <div className="price">US$99</div>
              </div>
              <Link legacyBehavior  href="/pricing">
                <a className="btn-subscribe-now icon-font-arrow-right">
                  subscribe <strong>now</strong>
                </a>
              </Link>
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
    </div>
     */
}

{
  /*
  <div
      className="prices-going-banner footer-sticky-banner"
      style={{ display: bannerStatus ? "block" : "none" }}
    >
      <div className="banner-content">
        <div className="container">
          <div className="annual-text">
            PRICES GOING UP<span>for our Premium Subscription</span>
          </div>
          <div className="right-block">
            <div className="current-price-group">
              <div className="box">
                <label>From</label>
                <span className="price">
                  <strong>$99</strong> to <strong>$149</strong>
                </span>
              </div>
              <div className="box">
                <label>
                  Enroll Before <strong>1st November</strong>
                </label>
                <span>
                  <strong>To Grab The Current Price</strong>
                </span>
              </div>
            </div>
            <div className="countdown-gorup">
              <div className="countdow">
                <div className="count">
                  <div className="colon">
                    <div id="day"></div>
                    <span>:</span>
                  </div>
                  <label>days</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="hou"></div>
                    <span>:</span>
                  </div>
                  <label>hours</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="min"></div>
                    <span>:</span>
                  </div>
                  <label>mins</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="sec"></div>
                    <span></span>
                  </div>
                  <label>sec</label>
                </div>
              </div>
              <Link legacyBehavior  href="/pricing">
                <a className="btn-subscribe-now icon-font-arrow-right">Subscribe Now</a>
              </Link>
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
    </div>
   */
}

{
  /* <div className="footer-sticky-banner" style={{ display: bannerStatus ? "block" : "none" }}>
  <div className="subscription-banner">
    <div className="container">
      <div className="annual-text">
        <span>Whizlabs</span>Annual subscription
      </div>
      <div className="right-block">
        <ul>
          <li>
            <span>Get Unlimited Access</span> All Courses
          </li>
          <li>
            <span>Get Unlimited Access</span>Hands-on Labs
          </li>
          <li>
            <span>Get 24/7 Instant</span>Premium Support
          </li>
        </ul>
        <div className="price-group">
          <div className="price-block">
            <del className="old-price">US$299</del>
            <div className="price">US$149</div>
          </div>
          <Link legacyBehavior  href="/pricing">
            <a className="btn-subscribe-now icon-font-arrow-right">
              subscribe <strong>now</strong>
            </a>
          </Link>
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
</div> */
}
