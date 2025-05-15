import { useEffect, useState } from "react";
import ImageReviews from "./ReviewImages";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import UserAvatar from "@/components/plugins/UserAvatar";
import { StarRating } from "@/components/import";
import { getReviews } from "@/services/review-services/services";
import axios from "axios";
import * as review from "../../lib/staticReviews"
const baseUrl = process.env.NEXT_PUBLIC_WEB_MEDIA_URL;
const baseUrl1 = process.env.NEXT_PUBLIC_BASE_URL;
const TextReviews = () => {
  const [width, setwidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const handleRezise = () => {
      if (window) {
        setwidth(window.innerWidth);
        if (window.innerWidth < 550) {
          setIsBreakpoint(true);
        } else {
          setIsBreakpoint(false);
        }
      }
    };

    if (window) {
      setwidth(window.innerWidth);
      window.addEventListener("resize", handleRezise);
    }
  }, []);

  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 1,
    slides: {
      perView: width <= 768 ? 1 : width > 768 && width < 1023 ? 2 : 3,
      spacing: 20,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="review-wrapper-front">
      <div className="container">
        <div className="text_reviews">
          <h2 style={{ padding: "15px 15px", fontSize: "40px", textAlign: "center" , margin:"0px"}}>
            Explore the Feedback from Learners around the Globe
          </h2>

            <div className="review-block-front">
              <div className="keen-slider" ref={sliderRef}>
                {review.staticReview.map((itm, idx) => {
                  return (
                      <div className="keen-slider__slide " key={`text-${idx}`}>
                        <div className="review-info-front">
                          <div className="top-section">
                            <UserAvatar img={null} alt={null} username={itm.name} />
                            <div className="user-info-left">
                              <div className="name">{itm.name}</div>
                              <div className="review-for">
                                <span>Job role : </span>
                                {itm.designation}
                              </div>
                              <StarRating bigSizeStar={true} avgRating={itm.ratings} />
                            </div>
                          </div>
                          <div className="bottom-section">
                            <div className="title">{itm.title}</div>
                            <div>{itm.description}</div>
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>
              {loaded && instanceRef.current && (
                <div className="nav-buttons">
                  <span
                    onClick={(e) => {
                      //@ts-ignore
                      e.stopPropagation() || instanceRef.current?.prev();
                    }}
                    className={currentSlide === 0 ? "color-grey" : ""}
                  >
                    Previous &nbsp;/
                  </span>
                  <span
                    onClick={(e) => {
                      //@ts-ignore
                      e.stopPropagation() || instanceRef.current?.next();
                    }}
                    className={
                      currentSlide ===
                      instanceRef.current.track.details.slides.length -
                        (width <= 768 ? 1 : width > 768 && width < 1023 ? 2 : 3)
                        ? "color-grey"
                        : ""
                    }
                  >
                    {" "}
                    &nbsp;Next
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextReviews;
