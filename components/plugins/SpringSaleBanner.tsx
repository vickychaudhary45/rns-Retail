import Link from "next/link";
import Image from "next/image";
import bf_offer from "../black-friday-offers";
import { createTimeModel, useTimeModel } from "react-compound-timer";

const SpringSaleBanner = () => 
{
  const timer = createTimeModel({
    initialTime: Math.abs(new Date("11 June 2023 11:00:00 GMT+05:30").valueOf() - new Date().valueOf()),
    direction: "backward"
  });
  const { value } = useTimeModel(timer);
  return(
  <div className="spring-banner">
    <div className="container">
      <div className="img-caption-block">
        <div className="left-block">
          <figure>
            <Image width={450} height={300} className="img-full" src="/images/spring.svg" alt="" />
          </figure>
          <h1>Let Your career blossom</h1>
        </div>
        <div className="right-block">
          <h2>Flat 40% off</h2>
          <label className="label">on Premium Subscription</label>
          <span className="span">(Get free access to all Hands-On Labs)</span>
          <div className="code-box">
            <small>
              Use Coupon<strong>WHIZ40SPRING</strong>
            </small>
          </div>
          <a href="/pricing" className="btn btn-enroll">
            Subscribe Now
          </a>
          <div className="timer-block">
            <div className="main-timer">
              <div className="count">
                <div className="colon">
                  <div className="daytime2">{value.d}</div>
                  <span>:</span>
                </div>
                <label>days</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div className="hourtime2">{value.h}</div>
                  <span>:</span>
                </div>
                <label>hours</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div className="minutetime2">{value.m}</div>
                  <span>:</span>
                </div>
                <label>mins</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div className="secondtime2">{value.s}</div>
                  <span></span>
                </div>
                <label>sec</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)};

export default SpringSaleBanner;

/* 
  <div className="banner-block">
    <div className="banner">
      <div className="container">
        <div className="caption">
          <h1>World-Class Online Certification Training Courses & Practice Tests</h1>
          <div className="sub-title">Take the first step to transform your career with the help of our affordable and premium quality training material</div>
          <Link legacyBehavior  href="/library/">
            <a className="btn start-now">Get Started Now</a>
          </Link>
        </div>
        <figure className="img-block">
          <img className="img-full" src="/images/banner-home-man.png" alt="" />
          </figure>
          <div className="shape">
            <img className="img-full" src="/images/banner-shape.svg" alt="banner" />
          </div>
        </div>
      </div>
    </div>
*/
