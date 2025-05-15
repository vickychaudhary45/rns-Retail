import { createTimeModel, useTimeModel } from "react-compound-timer";

const MayDaySuperSaleBanner = () => 
{
  const timer = createTimeModel({
    initialTime: Math.abs(
      new Date("04 May 2022 16:00:00").valueOf() - new Date().valueOf()
    ),
    direction: "backward"
  });
  const { value } = useTimeModel(timer);
  return (
  <div className="many-day-sale-banner">
    <div className="container">
      <div className="left-block">
        <div className="sharp-top">
          <figure className="img-sharp">
            <img className="img-full" src="/images/super-sale-sharp.svg" alt="" />
          </figure>
          <span>May Day Super Sale</span>
        </div>
        <div className="caption">
          <h5>Celebrate your HARD WORK</h5>
          <p>and Get empowered with the latest skills</p>
        </div>
      </div>

      <figure className="girl-block">
        <img className="img-full" src="/images/super-sale-girl.png" alt="" />
      </figure>

      <div className="right-block">
        <div className="code-box-group">
          <div className="code-box">
            <p>
              <strong>Flat 40% off</strong>on All Courses
            </p>
            <small>
              Use Coupon: <strong>WHIZMAY40</strong>
            </small>
            <a href="/library" className="btn btn-enroll">
              Enroll Now
            </a>
          </div>
          <div className="code-box">
            <p>
              <strong>Flat 30% off</strong>on Premium Subscription
            </p>
            <small>
              Use Coupon: <strong>WHIZMAY30</strong>
            </small>
            <a href="/pricing" className="btn btn-enroll">
              Enroll Now
            </a>
          </div>
        </div>
        <div className="timer-block">
          
            <div className="main-timer">
              <div className="count">
                <div className="colon">
                  {value.d}
                  <span>:</span>
                </div>
                <label>days</label>
              </div>
              <div className="count">
                <div className="colon">
                  {value.h}
                  <span>:</span>
                </div>
                <label>hours</label>
              </div>
              <div className="count">
                <div className="colon">
                  {value.m}
                  <span>:</span>
                </div>
                <label>mins</label>
              </div>
              <div className="count">
                <div className="colon">
                  {value.s}
                  <span></span>
                </div>
                <label>sec</label>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  </div>
)};

export default MayDaySuperSaleBanner;
