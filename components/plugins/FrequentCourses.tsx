import { StarRating } from "@/components/import";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/AddToCart/cart-actions";
import { useKeenSlider } from "keen-slider/react";
import { Arrow } from "../shared/Arrow";
const FrequentCourses = ({
  cartData = null,
  freqCoursesData = null,
  addToCart
}) => {
  const [CoursesInCart, setCoursesInCart] = useState([]);
  useEffect(() => {
    if (cartData) {
      let newCoursesInCart = [];
      cartData.forEach((element) => {
        newCoursesInCart.push(element.courseId); // fetch course id from cart
      });
      setCoursesInCart(newCoursesInCart);
    }
  }, [cartData]);
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
      <div className="course-slider">
        <div className="container">
          <div className="heading">
            <h2 className="title">Frequently Bought Together</h2>
            <div className="discount-block">
              <figure>
                <img
                  className="img-full"
                  src="/images/offer-percentage.svg"
                  alt=""
                />
              </figure>
              <span>
                Buy all and get extra <strong>45% OFF</strong> discount
              </span>
            </div>
          </div>
        
          <div   style={{
                position: "relative",
              }}>
                <div className="course-group keen-slider " ref={sliderRef}></div>
            {freqCoursesData.map((course) => (
              <div className="course keen-slider__slide" key={course.courseId}>
                <div className="couser-img">
                  <img className="img-full" src={course.courseImage} alt="" />
                </div>
                <div className="course-content">
                  <div className="course-details">
                    <h6 className="title">{course.courseName}</h6>
                    <div className="level-text">
                      <span>
                        Level:{" "}
                        {course.level === 1
                          ? "Beginner"
                          : course.level === 2
                          ? "Intermediate"
                          : "Advanced"}
                      </span>
                    </div>
                    <p>{course.categoryTitle}</p>
                  </div>
                  <div className="price-review-block">
                    <StarRating
                      avgRating={course.avgRatings}
                      totalRating={course.totalRatings}
                    />
                    <div className="price-block">
                      <span className="price">{course.oldPrice}</span>
                      <del className="old-price">{course.fixedPrice}</del>
                    </div>
                    {CoursesInCart.includes(course.courseId) ? (
                      <button
                        className="btn btn-add-cart"
                        style={{
                          background: "#259b1d"
                        }}
                        disabled
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart(course.courseId, course.courseType)
                        }
                        className="btn btn-add-cart"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
                    instanceRef.current.track.details.slides.length - (width <= 768 ? 1 : 2) && (
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
                        
                      <Arrow backgroundColor="transparent" fill="white" isCustom={true} width={"15px"} height={"15px"}/>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, type) => dispatch(addToCart(id, type))
  };
};

export default connect(null, mapDispatchToProps)(FrequentCourses);
