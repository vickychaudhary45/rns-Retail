import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { categoryIcon } from "../../helpers/category";
import StarRating from "./StarRating";
import { useKeenSlider } from "keen-slider/react";
import { Arrow } from "../shared/Arrow";

const PopularCourses = ({ popularCoursesData }) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [activeTab, setTabActive] = useState(0);
  const [popularCourse, setPopularCourse] = useState(popularCoursesData);
  const [popularCourses, setPopularCourses] = useState([]);
  useEffect(() => {
    const data = [];
    popularCourse?.map((category, key) => {
      categoryIcon.map((icon, key1) => {
        if (category.name == icon.name) {
          category.icon = icon.icon;
        }
      });
      data.push(category);
    });
    setPopularCourses(data);
  }, [popularCourse]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width > 1023) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
    }
  }, []);

  const handleTabActive = (key) => {
    if (activeTab == key) {
      setTabActive(99);
    } else {
      setTabActive(key);
    }
  };

  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleRezise = () => {
      if (window) {
        setWidth(window.innerWidth);
      }
    };

    if (window) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleRezise);
    }
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: width <= 768 ? 1 : 2,
      spacing: 0,
    },
    initial: 0,
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <>
      {/* <!-- popular-courses --> */}
      <div className="popular-courses">
        <div className="container">
          <div className="block-heading">
            <h3>Popular Courses</h3>
          </div>
          <div id="faq-tab" className="tab_wrapper">
            <ul className="resp-tabs-list hor_1 tab_list">
              <div className="tabs-lists">
                {popularCourses?.map((category, key) => (
                  <motion.li
                    key={`category-tab-${key}`}
                    className={`${activeTab == key ? "resp-tab-active" : ""}`}
                    onClick={() => setTabActive(key)}
                  >
                    <samp>
                      <i className={category.icon}></i>
                      {category.category_title ? category.category_title : category.name}
                    </samp>
                  </motion.li>
                ))}
              </div>
            </ul>
            <div className="resp-tabs-container hor_1 content_wrapper">
              {popularCourses?.length > 0 &&
                popularCourses?.map((item, key) => (
                  <React.Fragment key={key}>
                    <div
                      onClick={() => handleTabActive(key)}
                      className={
                        activeTab === key
                          ? "resp-accordion hor_1 resp-tab-active"
                          : "resp-accordion hor_1"
                      }
                    >
                      <span className="arrow"></span>
                      <samp>
                        <i className={`category.icon}`}></i>
                        {item.category_title ? item.category_title : item.name}
                      </samp>
                    </div>
                    <div
                      title={item.title}
                      style={{
                        display: activeTab == key ? "block" : "none",
                        transition: "height 300ms",
                      }}
                      className="tab_content active "
                    >
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <div
                          className="index-slider popular-course-slider keen-slider "
                          ref={sliderRef}
                        >
                          {item?.courses?.map((course, index) => (
                            <div className="course keen-slider__slide" key={index}>
                              <div className="couser-img">
                                <img
                                  className="img-full"
                                  style={{ maxHeight: "154px" }}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/images/no-image.png";
                                  }}
                                  src={
                                    process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                    course.featured_image.replace("media/", "")
                                  }
                                  alt={course.title}
                                />
                              </div>
                              <div className="course-content">
                                <div className="course-details">
                                  <h6 className="title">{course.title}</h6>
                                </div>
                                <div className="price-review-block">
                                  <div className="rating-block">
                                    <div className="stars-group">
                                      <StarRating
                                        isSamp={true}
                                        avgRating={course.rating?.overall_rating}
                                        totalRating={course.rating?.rating}
                                      />
                                    </div>
                                  </div>
                                  <div className="total-learners">
                                    <i className="icon icon-font-graduation-cap"></i>
                                    <span>{course.learners_count} Learners</span>
                                  </div>
                                  <a href={`/${course.slug}`} target="_blank">
                                    <button className="btn btn-explore">Explore now</button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {loaded && instanceRef.current && (
                          <>
                            {currentSlide !== 0 && (
                              <div
                                className="arrow arrow--left"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "#007CFF",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                                  margin: "0",
                                }}
                                //@ts-ignore
                                onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                              >
                                <Arrow
                                  left
                                  disabled={currentSlide === 0}
                                  backgroundColor="transparent"
                                  fill="white"
                                  isCustom={true}
                                  width={"15px"}
                                  height={"15px"}
                                />
                              </div>
                            )}
                            {currentSlide !==
                              instanceRef.current.track.details.slides.length -
                                (width <= 768 ? 1 : 2) && (
                              <div
                                className="arrow arrow--right"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "#007CFF",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                                  margin: "0",
                                  right: "-20px",
                                }}
                                //@ts-ignore
                                onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                              >
                                <Arrow
                                  backgroundColor="transparent"
                                  fill="white"
                                  isCustom={true}
                                  width={"15px"}
                                  height={"15px"}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCourses;
