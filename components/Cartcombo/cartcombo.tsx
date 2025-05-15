import { useEffect, useState } from "react";
import style from "../../public/styles/CartCombo.module.css";
import InboxIcon from "@mui/icons-material/Inbox";
import axios from "axios";
import { connect } from "react-redux";
import { updateRedirection } from "../../redux/Redirection/redirect-actions";
import { useRouter } from "next/router";
import { addComboSlugAction } from "../../redux/ComboSlug/combo-slug-action";
import { Alert, Checkbox, Snackbar } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CartCombo = ({
  cart,
  currency,
  userData,
  redirectionAction,
  comboSlugAction,
  campaign_data,
}) => {
  const [combodata, setcomboData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const getCombo = async (category) => {
    let comboData = await axios.post(`${BASE_URL}/combo/getcombo`, {
      category_id: category,
    });
    let combos = [];
    let cartCourseId = cart.map((v) => v.courseId);
    comboData.data.combos_data.forEach((itm) => {
      if (itm.is_global == 0) {
        let prod = itm.products;
        let prod_id = prod.map((x) => x.course_id);

        //prod_id includes car courseID
        //push it

        prod_id.forEach((i) => {
          if (cartCourseId.join("").includes(i)) {
            let comboIndex = combos.findIndex((y) => y.id == itm.id);
            if (comboIndex == -1) {
              combos.push(itm);
            }
          }
        });
      } else {
        let comboIndex = combos.findIndex((y) => y.id == itm.id);
        if (comboIndex == -1) {
          combos.push(itm);
        }
      }
    });
    return combos;
  };

  const getComboBasedOnPoductIds = async (product_ids) => {
    let combo_products = await axios.post(`${BASE_URL}/combo/getcomboonproduct`, {
      product_ids: product_ids,
    });
    return combo_products.data.combos_data;
  };

  const getCombosBasedByMultipleOnProductIds = async (product_ids) => {
    let combo_products = await axios.post(`${BASE_URL}/combo/getcomboonbymultiple`, {
      product_ids: product_ids,
    });
    return combo_products.data.combos_data;
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let category = cart.map((itm) => itm.course_page_id);
      let product_ids = cart.map((itm) => itm.courseId);
      Promise.all([
        getCombosBasedByMultipleOnProductIds(product_ids),
        getCombo(category),
        getComboBasedOnPoductIds(product_ids),
      ]).then((results) => {
        let productsByMultiple = results[0];
        let categoryANDGlobalComobs = results[1];
        let productCombos = results[2];
        categoryANDGlobalComobs.sort((a, b) => {
          return a.is_global - b.is_global;
        });
        // setcomboData([,...productCombos, ...categoryANDGlobalComobs]);
        const data = [...productsByMultiple, ...productCombos, ...categoryANDGlobalComobs];
        if (data && data.length > 0) {
          setcomboData([data[0]]);
        }else{
          setcomboData([])
          localStorage.setItem("selectedCombo", JSON.stringify([]));
        }
      });
    } else {
      setcomboData([]);
      localStorage.setItem("selectedCombo", JSON.stringify([]));
    }
  }, [cart, currency]);

  const handleCheckout = (slug) => {
    comboSlugAction(slug);
    if (userData) {
      //route to checkout
      router.push(`/combo/${slug}`);
    } else {
      redirectionAction("REDIRECT", `/combo/${slug}`);
      document.querySelector("body").classList.add("open-modal-login");
    }
  };
  const [selectedCombo, setSelectedCombo] = useState(
    cart && cart.length ? JSON.parse(localStorage.getItem("selectedCombo")) || [] : []
  );
  useEffect(() => {
    if (combodata && combodata.length) {
      const dataFromStorage = JSON.parse(localStorage.getItem("selectedCombo"));
      const dd = [];
      if (dataFromStorage) {
        combodata.map((itm) => {
          const id = itm.id;
          const data = dataFromStorage.filter((i) => {
            return i[id] ? true : false;
          });
          if (data && data.length) {
            dd.push(data[0]);
          } else {
            dd.push({
              [id]: itm.products.map((itm) => itm.course_id),
            });
          }
        });

        setSelectedCombo(dd);
      } else {
        setSelectedCombo(
          combodata.map((item) => {
            return {
              [item.id]: item.products.map((itm) => itm.course_id),
            };
          })
        );
      }
    }
  }, [combodata]);

  useEffect(() => {
    localStorage.setItem("selectedCombo", JSON.stringify(selectedCombo));
  }, [selectedCombo]);
  return (
    <>
      <div className="container">
        {combodata.map((itm) => {
          let total_price = 0;
          let total_discount_price = 0;
          let design = itm.design_type;
          if (design === 1 && itm.products.length) {
            return (
              <>
                <div className={style.title}>{itm.title}</div>
                <div className={style.combo_container}>
                  <div className={style.product_container}>
                    {itm.products.map((x, idx) => {
                      let prods = x.product_type.map((itm) => itm.course_type);
                      let sale_price = 0;
                      let regular_price = 0;

                      x.product_type.forEach((im) => {
                        if (im.course_type != "SANDBOX") {
                          sale_price = sale_price + parseFloat(im.sale_price[currency.type]);
                          regular_price =
                            regular_price + parseFloat(im.regular_price[currency.type]);
                          total_price = total_price + parseFloat(im.regular_price[currency.type]);
                          total_discount_price =
                            total_discount_price + parseFloat(im.sale_price[currency.type]);
                        } else {
                          let validity = Object.keys(im.sale_price)[0];
                          sale_price =
                            sale_price + parseFloat(im.sale_price[validity][currency.type]);
                          regular_price =
                            regular_price + parseFloat(im.regular_price[validity][currency.type]);
                          total_price =
                            total_price + parseFloat(im.regular_price[validity][currency.type]);
                          total_discount_price =
                            total_discount_price +
                            parseFloat(im.sale_price[validity][currency.type]);
                        }
                      });
                      return (
                        <>
                          <div className={`${style.course_itm}`}>
                            <div className={style.left}>
                              <div
                                className={style.img}
                                onClick={(e) => {
                                  router.push(`/${x.course_slug}`);
                                }}
                              >
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                    x.featured_img.replace("media/", "")
                                  }
                                />
                              </div>
                              <div className={style.course_content}>
                                <div
                                  className={style.course_title}
                                  onClick={(e) => {
                                    router.push(`/${x.course_slug}`);
                                  }}
                                >
                                  {x.course_name}
                                </div>
                                <div
                                  className={
                                    prods.length == 4
                                      ? `${style.course_highlights}`
                                      : `${style.course_highlights} ${style.course_hls_correction}`
                                  }
                                >
                                  {prods.includes("PT") && (
                                    <div className={style.course_type}>
                                      <i className="icon-font-note2 pIconclass"></i>Practice Tests
                                    </div>
                                  )}
                                  {prods.includes("OC") && (
                                    <div className={style.course_type}>
                                      <i className="icon-font-play pIconclass"></i>Video Course
                                    </div>
                                  )}
                                  {prods.includes("LAB") && (
                                    <div className={style.course_type}>
                                      <i className="icon-font-bicker pIconclass"></i>Hands-on Labs
                                    </div>
                                  )}
                                  {prods.includes("SANDBOX") && (
                                    <div className={style.course_type}>
                                      {" "}
                                      <InboxIcon
                                        style={{ fontSize: "14px", paddingRight: "5px" }}
                                      />
                                      Cloud Sandbox
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className={style.right}>
                              <div className={style.regular_price}>
                                {currency.symbol}
                                {regular_price.toFixed(2)}
                              </div>
                              <div className={style.sale_price}>
                                {currency.symbol}
                                {sale_price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          {itm.products?.length != idx + 1 ? (
                            <>
                              <div className={style.plus}>+</div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <div className={`${style.total_container}`}>
                    <div className={style.total}>
                      <div className={style.total_txt}>Total</div>
                      <div className={style.total_price}>
                        {currency.symbol}
                        {total_discount_price.toFixed(2)}
                      </div>
                    </div>
                    <div className={style.discount}>
                      <div className={style.discount_box}>
                        Buy for combo price <strong>{itm.discount_percentage}% off</strong>{" "}
                        <span className={style.greenbox}>
                          <i
                            className="icon saving-icon icon-font-saving"
                            style={{
                              display: "inline-block",
                              color: "#00BE7E",
                              fontSize: "20px",
                              margin: "0px",
                            }}
                          ></i>
                          <span style={{ paddingLeft: "5px" }}>Savings</span>{" "}
                          <span className={style.savingtxt}>
                            {currency.symbol}
                            {(
                              total_discount_price *
                              (parseFloat(itm.discount_percentage) / 100)
                            ).toFixed(2)}
                          </span>
                        </span>
                      </div>
                      <div className={style.discount_price}>
                        {currency.symbol}
                        {(
                          total_discount_price -
                          total_discount_price * (parseFloat(itm.discount_percentage) / 100)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className={`${style.checkout_wrapper}`}>
                    <div
                      className={style.checkout_btn}
                      onClick={(e) => {
                        handleCheckout(itm.slug);
                      }}
                    >
                      {userData != null ? <>Proceed to Checkout</> : <>Sign In to Proceed</>}
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (design === 2 && itm.products.length) {
            return (
              <>
                <div className={style.title}>{itm.title}</div>
                <div className={`${style.combo_container} ${style.border} ${style.nopadding}`}>
                  <div className={style.product_container}>
                    <div className={style.header}>
                      <div className={style.c_name}>Course Name</div>
                      <div className={style.pricetxt}>Price</div>
                    </div>

                    {itm.products.map((x, idx) => {
                      let prods = x.product_type.map((itm) => itm.course_type);
                      let sale_price = 0;
                      let regular_price = 0;
                      x.product_type.forEach((im) => {
                        if (im.course_type != "SANDBOX") {
                          sale_price = sale_price + parseFloat(im.sale_price[currency.type]);
                          regular_price =
                            regular_price + parseFloat(im.regular_price[currency.type]);
                          total_price = total_price + parseFloat(im.regular_price[currency.type]);
                          total_discount_price =
                            total_discount_price + parseFloat(im.sale_price[currency.type]);
                        } else {
                          let validity = Object.keys(im.sale_price)[0];
                          sale_price =
                            sale_price + parseFloat(im.sale_price[validity][currency.type]);
                          regular_price =
                            regular_price + parseFloat(im.regular_price[validity][currency.type]);
                          total_price =
                            total_price + parseFloat(im.regular_price[validity][currency.type]);
                          total_discount_price =
                            total_discount_price +
                            parseFloat(im.sale_price[validity][currency.type]);
                        }
                      });

                      return (
                        <>
                          <div
                            className={`${style.course_itm} ${style.border_bottom} ${style.padding}`}
                          >
                            <div className={style.left}>
                              <div
                                className={style.img}
                                onClick={(e) => {
                                  router.push(`/${x.course_slug}`);
                                }}
                              >
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                    x.featured_img.replace("media/", "")
                                  }
                                />
                              </div>
                              <div className={style.course_content}>
                                <div
                                  className={style.course_title}
                                  onClick={(e) => {
                                    router.push(`/${x.course_slug}`);
                                  }}
                                >
                                  {x.course_name}
                                </div>
                                <div
                                  className={
                                    prods.length == 4
                                      ? `${style.course_highlights}`
                                      : `${style.course_highlights} ${style.course_hls_correction}`
                                  }
                                >
                                  {prods.includes("PT") && (
                                    <div className={style.course_type}>
                                      <i className="icon-font-note2 pIconclass"></i>Practice Tests
                                    </div>
                                  )}
                                  {prods.includes("OC") && (
                                    <div className={style.course_type}>
                                      <i className="icon-font-play pIconclass"></i>Video Course
                                    </div>
                                  )}
                                  {prods.includes("LAB") && (
                                    <div className={style.course_type}>
                                      <i className="icon-font-bicker pIconclass"></i>Hands-on Labs
                                    </div>
                                  )}
                                  {prods.includes("SANDBOX") && (
                                    <div className={style.course_type}>
                                      {" "}
                                      <InboxIcon
                                        style={{ fontSize: "14px", paddingRight: "5px" }}
                                      />
                                      Cloud Sandbox
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className={style.right}>
                              <div className={style.regular_price}>
                                {currency.symbol}
                                {regular_price.toFixed(2)}
                              </div>
                              <div className={style.sale_price}>
                                {currency.symbol}
                                {sale_price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          {itm.products?.length != idx + 1 && design === 1 ? (
                            <>
                              <div className={style.plus}>+</div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <div className={`${style.total_container} ${style.noBorder} ${style.padding}`}>
                    <div className={style.total}>
                      <div className={style.total_txt}>Total</div>
                      <div className={style.total_price}>
                        {currency.symbol}
                        {total_discount_price.toFixed(2)}
                      </div>
                    </div>
                    <div className={style.discount}>
                      <div className={style.discount_box}>
                        Buy for combo price <strong>{itm.discount_percentage}% off</strong>{" "}
                        <span className={style.greenbox}>
                          <i
                            className="icon saving-icon icon-font-saving"
                            style={{
                              display: "inline-block",
                              color: "#00BE7E",
                              fontSize: "20px",
                              margin: "0px",
                            }}
                          ></i>
                          <span style={{ paddingLeft: "5px" }}>Savings</span>{" "}
                          <span className={style.savingtxt}>
                            {currency.symbol}
                            {(
                              total_discount_price *
                              (parseFloat(itm.discount_percentage) / 100)
                            ).toFixed(2)}
                          </span>
                        </span>
                      </div>
                      <div className={style.discount_price}>
                        {currency.symbol}
                        {(
                          total_discount_price -
                          total_discount_price * (parseFloat(itm.discount_percentage) / 100)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className={`${style.checkout_wrapper} ${style.padding}`}>
                    <div
                      className={style.checkout_btn}
                      onClick={(e) => {
                        handleCheckout(itm.slug);
                      }}
                    >
                      {userData != null ? <>Proceed to Checkout</> : <>Sign In to Proceed</>}
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (design === 3 && itm.products.length) {
            return (
              <>
                <div className={style.title}>{itm.title}</div>
                <div className={`${style.combo_container}`}>
                  <div className={style.product_container}>
                    <div
                      className={
                        style.product_list +
                        " " +
                        `${
                          itm.products.length === 4
                            ? style.product_list4
                            : itm.products.length === 3
                            ? style.product_list3
                            : itm.products.length === 2
                            ? style.product_list2
                            : ""
                        }`
                      }
                    >
                      {itm.products.map((x, idx) => {
                        // let x = itm.products[0];
                        let prods = x.product_type.map((itm) => itm.course_type);
                        let sale_price = 0;
                        let regular_price = 0;
                        x.product_type.forEach((im) => {
                          if (im.course_type != "SANDBOX") {
                            sale_price = sale_price + parseFloat(im.sale_price[currency.type]);
                            regular_price =
                              regular_price + parseFloat(im.regular_price[currency.type]);
                            total_price = total_price + parseFloat(im.regular_price[currency.type]);
                            if (selectedCombo.find((i) => i[itm.id]?.includes(x.course_id))) {
                              total_discount_price =
                                total_discount_price + parseFloat(im.sale_price[currency.type]);
                            }
                          } else {
                            let validity = Object.keys(im.sale_price)[0];
                            sale_price =
                              sale_price + parseFloat(im.sale_price[validity][currency.type]);
                            regular_price =
                              regular_price + parseFloat(im.regular_price[validity][currency.type]);
                            total_price =
                              total_price + parseFloat(im.regular_price[validity][currency.type]);
                            if (selectedCombo.find((i) => i[itm.id]?.includes(x.course_id))) {
                              total_discount_price =
                                total_discount_price +
                                parseFloat(im.sale_price[validity][currency.type]);
                            }
                          }
                        });

                        return (
                          <div className={style.product_list_ff}>
                            <div className={`${style.course_itm}`}>
                              <div className={style.headerMain}>
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                    x.featured_img.replace("media/", "")
                                  }
                                  onClick={(e) => {
                                    router.push(`/${x.course_slug}`);
                                  }}
                                />

                                <Checkbox
                                  sx={{
                                    position: "absolute",
                                    left: "86%",
                                    top: "-8%",
                                    color: "primary",
                                    "&.Mui-checked": {
                                      color: "#00BE7E",
                                    },
                                    "& .MuiSvgIcon-root": { fontSize: 18 },
                                    // display:
                                    //   itm.products.length > 2 &&
                                    //   !cart.find((item) => item.course_id === x.course_id)
                                    //     ? "block"
                                    //     : "none",
                                  }}
                                  checked={
                                    selectedCombo.find((i) => i[itm.id]?.includes(x.course_id))
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    let selected = selectedCombo.find((i) => i[itm.id]);
                                    let selectedCourse = selected[itm.id];
                                    if (e.target.checked) {
                                      if (selected) {
                                        if (selectedCourse.includes(x.course_id)) {
                                          let index = selectedCourse.findIndex(
                                            (i) => i == x.course_id
                                          );
                                          selectedCourse.splice(index, 1);
                                          setSelectedCombo([
                                            ...selectedCombo.filter((i) => !i[itm.id]),
                                            { [itm.id]: selectedCourse },
                                          ]);
                                        } else {
                                          setSelectedCombo([
                                            ...selectedCombo.filter((i) => !i[itm.id]),
                                            {
                                              [itm.id]: [...selectedCourse, x.course_id],
                                            },
                                          ]);
                                        }
                                      } else {
                                        setSelectedCombo([
                                          ...selectedCombo,
                                          { [itm.id]: [x.course_id] },
                                        ]);
                                      }
                                    } else {
                                      if (selected) {
                                        if (selectedCourse.includes(x.course_id)) {
                                          // Filter out the x.course_id from selectedCourse array
                                          const updatedSelectedCourse = selectedCourse.filter(
                                            (id) => id !== x.course_id
                                          );

                                          if (updatedSelectedCourse.length >= 2) {
                                            // Check if the course_id is present in selectedCombo
                                            if (selectedCombo.some((combo) => combo[itm.id])) {
                                              // If yes, update the existing combo
                                              setSelectedCombo(
                                                selectedCombo.map((combo) => {
                                                  if (combo[itm.id]) {
                                                    return {
                                                      ...combo,
                                                      [itm.id]: updatedSelectedCourse,
                                                    };
                                                  }
                                                  return combo;
                                                })
                                              );
                                            } else {
                                              setSelectedCombo([
                                                ...selectedCombo,
                                                { [itm.id]: updatedSelectedCourse },
                                              ]);
                                            }
                                          } else {
                                            setErrorMessage("At least 2 courses required");
                                          }
                                        }
                                      }
                                    }
                                  }}
                                />
                              </div>
                              <div className={style.course_content}>
                                <div
                                  className={style.course_title}
                                  onClick={(e) => {
                                    router.push(`/${x.course_slug}`);
                                  }}
                                >
                                  {x.course_name}
                                </div>
                                <div
                                  className={`${style.course_highlights} ${style.course_hls_correction}`}
                                >
                                  <div>
                                    {prods.includes("PT") && (
                                      <div className={style.course_type}>
                                        <i className="icon-font-note2 pIconclass"></i>
                                        Practice Tests
                                      </div>
                                    )}
                                    {prods.includes("LAB") && (
                                      <div className={style.course_type}>
                                        <i className="icon-font-bicker pIconclass"></i>
                                        Hands-on Labs
                                      </div>
                                    )}
                                  </div>
                                  <div className={style.course_price}>
                                    {prods.includes("OC") && (
                                      <div className={style.course_type}>
                                        <i className="icon-font-play pIconclass"></i>
                                        Video Course
                                      </div>
                                    )}

                                    {prods.includes("SANDBOX") && (
                                      <div className={style.course_type}>
                                        {" "}
                                        <InboxIcon
                                          style={{
                                            fontSize: "10px",
                                            paddingRight: "5px",
                                          }}
                                        />
                                        Cloud Sandbox
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className={style.price}>
                                <div className={style.sale_price}>
                                  {currency.symbol}
                                  {sale_price.toFixed(2)}
                                </div>
                                <div className={style.regular_price}>
                                  {currency.symbol}
                                  {regular_price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            {itm.products.length != idx + 1 ? (
                              <>
                                <div className={style.plus}>+</div>
                              </>
                            ) : (
                              <>
                                <div className={style.plus}>=</div>
                              </>
                            )}
                          </div>
                        );
                      })}
                      <div className={`${style.product_list_ff}`}>
                        <div className={style.discount}>
                          <div className={style.discount_box}>
                            <div className={style.discount_title}>
                              Buy together for <br />
                              <strong>{itm.discount_percentage}% off</strong>{" "}
                            </div>
                            <div className={style.discount_price}>
                              <div>
                                {currency.symbol}
                                {(
                                  total_discount_price -
                                  total_discount_price * (parseFloat(itm.discount_percentage) / 100)
                                ).toFixed(2)}
                              </div>
                              <div
                                className={style.total_price}
                                style={{
                                  marginLeft: "7px !important",
                                }}
                              >
                                {currency.symbol}
                                {total_discount_price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <div className={`${style.checkout_wrapper}`}>
                            <div
                              className={style.checkout_btn}
                              onClick={(e) => {
                                handleCheckout(itm.slug);
                              }}
                            >
                              {userData != null ? (
                                <>Proceed to Checkout</>
                              ) : (
                                <>Sign In to Proceed</>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={"warning"}>{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    campaign_data: state.timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    comboSlugAction: (data) => dispatch(addComboSlugAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCombo);
