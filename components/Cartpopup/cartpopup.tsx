import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./Cartpopup.module.css";
import { StarRating } from "@/components/import";
import { addToCart, removeFromCart } from "../../redux/AddToCart/cart-actions";
import { updateRedirection } from "../../redux/Redirection/redirect-actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Course = ({ course, currency, cartData, addToCartAction, setshowcartpopup }) => {
  const router = useRouter();
  let courseType = [];
  let sale_price = 0;
  let regular_price = 0;
  let cart_present = false;
  let prods = [];
  let cartCourse = cartData.find((x) => x.courseId == course.id);
  if (cartCourse) {
    cart_present = true;
  }

  course.products.forEach((itm) => {
    switch (itm.product_type) {
      case "PT":
        courseType.push("PT");
        break;
      case "OC":
        courseType.push("OC");
        break;
      case "LAB":
        courseType.push("LAB");
        break;
      case "SANDBOX":
        courseType.push("SANDBOX");
        break;
      default:
        courseType.push("");
    }
    if (itm.product_type != "SANDBOX") {
      sale_price += parseFloat(itm.sale_price[currency.type]);
      regular_price += parseFloat(itm.regular_price[currency.type]);
      prods.push(itm.product_type.toLowerCase());
    } else {
      let validity = Object.keys(itm.sale_price)[0];
      sale_price += parseFloat(itm.sale_price[validity][currency.type]);
      regular_price += parseFloat(itm.regular_price[validity][currency.type]);
      if (course.is_sandbox) {
        prods.push(`sandbox-${validity}`);
      } else {
        prods.push(`sandbox`);
      }
    }
  });

  const addTocart = async (id, prods) => {
    await addToCartAction(id, prods, currency.type.toUpperCase());
  };

  let str = [];
  courseType.includes("PT") ? str.push("Practice Test") : "";
  courseType.includes("OC") ? str.push("Video Course") : "";
  courseType.includes("LAB") ? str.push("Hands-On Labs") : "";
  courseType.includes("SANDBOX") ? str.push("Cloud Sandbox") : "";
  return (
    <>
      <div className={`${styles.leftcourseinfo} ${styles.margins}`}>
        <div className={styles.courseimg}>
          <img
            onClick={(e) => {
              setshowcartpopup(false);
              document.querySelector("body").classList.remove("avoid-overflow");
              router.push(`${course.slug}`);
            }}
            src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}${course.featured_image.replace(
              "media/",
              ""
            )}`}
          ></img>
        </div>
        <div className={styles.right}>
          <div
            onClick={(e) => {
              setshowcartpopup(false);
              document.querySelector("body").classList.remove("avoid-overflow");
              router.push(`${course.slug}`);
            }}
            className={`${styles.leftcoursetitle} ${styles.titleadj}`}
          >
            {course.name}
          </div>
          <div className={`${styles.leftcoursetype} ${styles.ctypeadj}`}>{str.join(" + ")}</div>
          <div className="cartpopup" style={{ paddingBottom: "5px" }}>
            {" "}
            <StarRating bigSizeStar={true} avgRating={course.ratings.overall_rating} />
            <span className={styles.ratings}>({course.ratings.rating} ratings)</span>
          </div>
          <div className={styles.pricebox}>
            <span className={styles.oldprice}>
              {currency.symbol}
              {regular_price.toFixed(2)}
            </span>{" "}
            <span className={styles.newprice}>
              {currency.symbol}
              {sale_price.toFixed(2)}
            </span>
            <span
              className={
                cart_present
                  ? `${styles.addtocartbtn} ${styles.disabled}`
                  : `${styles.addtocartbtn}`
              }
              onClick={(e) => addTocart(course.id, prods)}
            >
              {cart_present ? <>Added to Cart</> : <>Add to Cart</>}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
const Cartpopup = ({
  showCartpopup,
  setshowcartpopup,
  currency,
  pageContent,
  selectedCourseType,
  cart_count,
  cartData,
  userData,
  redirectionAction,
  addToCartAction,
  enrolledProductTypes,
  enrolled,
}) => {
  const router = useRouter();
  const [otherCourseType, setOtherCourseType] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [totalCartprice, setTotalCartprice] = useState(0);
  const [loading, setloading] = useState(true);
  const [currentLoading, setCUrrentLoading] = useState({
    id: null,
    product_type: null,
  });
  const [showMoreCourses, setMoreCourses] = useState([]);

  const getRelatedCoures = async () => {
    if (pageContent && pageContent.course_page_id) {
      let course_page_id = pageContent.course_page_id;
      if (userData) {
        let courseIdPurchased = [];
        enrolled?.forEach((itm) => {
          let enrolled_details = Object.keys(itm.enrollment_details);
          for (let key of enrolled_details) {
            let course_purchase_details = itm.enrollment_details[key];
            let now_utc = new Date(new Date().toISOString()).getTime();
            let endDate_utc = new Date(
              new Date(course_purchase_details.end_date).toISOString()
            ).getTime();
            if (endDate_utc > now_utc) {
              if (!courseIdPurchased.includes(itm.course_id)) {
                courseIdPurchased.push(itm.course_id);
              }
            }
          }
        });
        courseIdPurchased.push(pageContent.id);
        let related = await axios.get(
          `${baseUrl}/courses/popularcourse/?course_page_id=${course_page_id}&course_id_bought=${courseIdPurchased.join(
            ","
          )}`
        );
        // related.data.courses = related.data.courses.filter((itm)=> itm.id != pageContent.id && !courseIdPurchased.includes(itm.id))
        // related.data.courses = related.data?.courses?.filter((itm) => itm.products.length > 0);
        let coursesCameAlredy = [];
        related?.data?.courses?.forEach((itm) => {
          coursesCameAlredy.push(itm.id);
        });
        let course_to_neglect = [...courseIdPurchased, ...coursesCameAlredy, pageContent.id];
        let moreCourses = await axios.get(
          `${baseUrl}/courses/popularcourse/?course_page_id=&course_id_bought=${course_to_neglect.join(
            ","
          )}`
        );
        let put_index = 8 - related?.data?.courses?.length;
        setMoreCourses(moreCourses?.data?.courses?.filter((itm, idx) => idx < put_index));
        setRelatedCourses(related.data.courses);
      } else {
        let related = await axios.get(
          `${baseUrl}/courses/popularcourse/?course_page_id=${course_page_id}&course_id_bought=${pageContent.id}`
        );
        setRelatedCourses(related.data.courses);
      }
    }
  };

  useEffect(() => {
    const calculatePopupHeight = () => {
      let element = document.getElementById("cartpopup_inner");
      element.style.height = `${window.innerHeight}px`;
      let bottomsection = document.getElementById("bottom_section_cart");
      let topSection = document.getElementById("top_section_cart");
      let coords = topSection.getBoundingClientRect();
      let bottomsectionHeight = window.innerHeight - coords.height;
      bottomsection.style.height = `${bottomsectionHeight}px`;
    };
    if (window) {
      calculatePopupHeight();
      window.addEventListener("resize", () => {
        calculatePopupHeight();
      });
    }
  }, []);

  const getCartPrice = async () => {
    //send the cart and get cart price
    let cart = await axios.post(`${baseUrl}/cart/getprices`, {
      cart_details: cartData,
    });
    if (cart.data.cart_details) {
      let details = cart.data.cart_details;
      //calculate sale price
      let total_sale_price = 0;
      details.forEach((itm) => {
        let course_details = itm.course_details;
        course_details.forEach((x) => {
          if (itm.selectedCourseType.includes(x.course_type)) {
            total_sale_price += parseFloat(x.total_price[currency.type]);
          }
          if (
            itm.selectedCourseType.length == 1 &&
            itm.selectedCourseType[0].includes("sandbox-")
          ) {
            total_sale_price += parseFloat(x.total_price[currency.type]);
          }
        });
      });
      setTotalCartprice(total_sale_price);
    }
  };
  useEffect(() => {
    setloading(true);
    Promise.all([getCartPrice(), getRelatedCoures()]).then((result) => {
      setloading(false);
    });
    if (pageContent) {
      let products = pageContent.products;
      let otherProds = [];
      if (pageContent.seo_details && pageContent.seo_details.is_sandbox == false) {
        let selectedCourse = cartData.find((itm) => itm.courseId == pageContent.id);
        if (selectedCourse) {
          products.forEach((itm) => {
            if (
              itm.product_type != "FT" &&
              !enrolledProductTypes.includes(itm.product_type) &&
              !selectedCourse.selectedCourseType.includes(itm.product_type.toLowerCase()) &&
              itm.is_comingsoon != "1" &&
              itm.is_comingsoon != "2"
            ) {
              otherProds.push(itm);
            }
          });
        } else {
          products.forEach((itm) => {
            if (
              itm.product_type != "FT" &&
              !selectedCourseType.includes(itm.product_type.toLowerCase())
            ) {
              otherProds.push(itm);
            }
          });
        }
      }
      setOtherCourseType(otherProds);
    }
  }, [cartData, pageContent]);
  const handleCheckout = () => {
    document.querySelector("body").classList.remove("avoid-overflow");
    if (userData && userData.data && userData.data.token) {
      router.push("/checkout");
    } else {
      setshowcartpopup(false);
      redirectionAction("REDIRECT", `/checkout`); // after sign in redirect to direct checkout Page
      document.querySelector("body").classList.add("open-modal-login");
    }
  };
  const addtoCart = async (courseType, courseId) => {
    if (currentLoading.id == null) {
      setCUrrentLoading({
        id: courseId,
        product_type: courseType,
      });
      let selected = [];
      selected.push(courseType.toLowerCase());
      await addToCartAction(courseId, selected, currency.type.toUpperCase());
      setCUrrentLoading({
        id: null,
        product_type: null,
      });
    }
  };
  return (
    <>
      <div
        className={
          showCartpopup
            ? `${styles.popup} ${styles.inner_open}`
            : `${styles.popup} ${styles.inner_close}`
        }
        onClick={(e) => {
          setshowcartpopup(false);
          document.querySelector("body").classList.remove("avoid-overflow");
        }}
      >
        <div
          id="cartpopup_inner"
          className={
            showCartpopup
              ? `${styles.inner} ${styles.popup_open}`
              : `${styles.inner} ${styles.popup_close}`
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <>
            <div
              className={styles.closeicon}
              onClick={(e) => {
                setshowcartpopup(false);
                document.querySelector("body").classList.remove("avoid-overflow");
              }}
            >
              <CancelIcon />
            </div>
            <div className={styles.topsection} id="top_section_cart">
              <div className={styles.cartimg}>
                <img src="/images/carticon.svg" />
              </div>
              <div className={styles.cartinfo}>
                <div className={styles.cartinfo1}>
                  {" "}
                  <CheckCircleIcon /> &nbsp; {cart_count} Item{cart_count > 1 ? <>s</> : <></>}{" "}
                  Added To Cart
                </div>
                <div className={styles.cartinfo2}>
                  <strong>Cart Subtotal</strong>:
                  <span className={styles.cartprice}>
                    {currency.symbol}
                    {totalCartprice.toFixed(2)}
                  </span>
                </div>
                <div className={styles.cartinfo3}>
                  <div className={styles.checkout_btn} onClick={(e) => handleCheckout()}>
                    Proceed to Checkout
                  </div>
                  <div
                    className={styles.cart_btn}
                    onClick={(e) => {
                      document.querySelector("body").classList.remove("avoid-overflow");
                      router.push("/cart");
                    }}
                  >
                    View Cart
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottomsection} id="bottom_section_cart">
              <div className={styles.saveextra}>
                {otherCourseType.length > 0 && (
                  <>
                    <div className={styles.titleextra}>Save extra when bought with this course</div>
                    <div className={styles.responsive}>
                      {otherCourseType.map((itm) => {
                        let courseType =
                          itm.product_type == "PT"
                            ? "Practice Test"
                            : itm.product_type == "OC"
                            ? "Online Course"
                            : itm.product_type == "LAB"
                            ? "HandsOn Lab"
                            : "Sandbox";
                        let sale_price = "";
                        let regular_price = "";
                        if (itm.product_type == "SANDBOX") {
                          let validity = Object.keys(itm.sale_price)[0];
                          sale_price = parseFloat(itm.sale_price[validity][currency.type]).toFixed(
                            2
                          );
                          regular_price = parseFloat(
                            itm.regular_price[validity][currency.type]
                          ).toFixed(2);
                        } else {
                          sale_price = parseFloat(itm.sale_price[currency.type]).toFixed(2);
                          regular_price = parseFloat(itm.regular_price[currency.type]).toFixed(2);
                        }
                        return (
                          <>
                            <div className={styles.leftcourse}>
                              <div className={styles.lefttitle}>{courseType}</div>
                              <div className={styles.leftcourseinfo}>
                                <div className={styles.courseimg}>
                                  <img
                                    src={`${
                                      process.env.NEXT_PUBLIC_WEB_MEDIA_URL
                                    }${pageContent.seo_details?.featured_image.replace(
                                      "media/",
                                      ""
                                    )}`}
                                  />
                                </div>
                                <div className={styles.right}>
                                  <div className={styles.leftcoursetitle}>{pageContent?.name} </div>
                                  <div className={styles.leftcoursetype}>{courseType}</div>
                                  <div className={styles.pricebox}>
                                    <span className={styles.oldprice}>
                                      {currency.symbol}
                                      {regular_price}
                                    </span>{" "}
                                    <span className={styles.newprice}>
                                      {currency.symbol}
                                      {sale_price}
                                    </span>
                                    <span
                                      className={styles.addtocartbtn}
                                      onClick={(e) => addtoCart(itm.product_type, pageContent.id)}
                                    >
                                      {currentLoading.id == pageContent.id &&
                                      currentLoading.product_type == itm.product_type ? (
                                        <>
                                          <CircularProgress
                                            style={{
                                              color: "white",
                                              width: "15px",
                                              height: "15px",
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <>Add to Cart</>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
                <div>
                  <hr />
                </div>
                {/* <div className={styles.relatedcourse}>
                  {relatedCourses.length > 0 && (
                    <>
                      <div className={styles.relatedtitle}>
                        Related Courses
                        <div className={styles.responsive}>
                          {relatedCourses.map((itm) => {
                            if (itm.id != pageContent.id) {
                              return (
                                <>
                                  <Course
                                    course={itm}
                                    currency={currency}
                                    cartData={cartData}
                                    addToCartAction={addToCartAction}
                                    setshowcartpopup={setshowcartpopup}
                                  />
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </>
                  )}
                  {showMoreCourses.length > 0 && (
                    <>
                      <div className={styles.relatedtitle}>
                        Poular Courses
                        <div className={styles.responsive}>
                          {showMoreCourses.map((itm) => {
                            if (itm.id != pageContent.id) {
                              return (
                                <>
                                  <Course
                                    course={itm}
                                    currency={currency}
                                    cartData={cartData}
                                    addToCartAction={addToCartAction}
                                    setshowcartpopup={setshowcartpopup}
                                  />
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div> */}
              </div>
            </div>
          </>
          {loading && (
            <>
              <div className={styles.loading}>
                <div className={styles.ball1}></div>
                <div className={styles.ball2}></div>
                <div className={styles.ball3}></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cart,
    userData: state.authData.userData,
    cart_count: state.cart.cart_count,
    enrolled: state.enrolled.enrolled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartAction: (id, type, currency) => dispatch(addToCart(id, type, currency)),
    removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cartpopup);
