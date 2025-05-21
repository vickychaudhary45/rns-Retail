import styles from "./PricingCard.module.css";
import CheckIcon from "@mui/icons-material/Check";
import * as pricingData from "../../lib/pricingData";

const PricingCard = ({
  plan_data,
  currentPlan,
  disableButton,
  openCheckoutPage,
  userData,
  buttonClickAction,
}) => {
  const handleSubsClick = async () => {
    const subsValues = {
      button_name: "contact",
      button_url: process.env.NEXT_PUBLIC_BASE_PATH + "" + "pricing",
      is_pricing_page: true,
    };
    window.open(`${process.env.NEXT_PUBLIC_BUSINESS_URL}request-demo-page`, "_blank");
    if (userData) {
      await buttonClickAction(userData.data, subsValues);
    }
  };

  return (
    <div style={{ margin: "0" }}>
      <div
        className={styles.pricing_box}
        style={plan_data.is_sandbox_access ? { border: "1px solid #2aa0d1" } : {}}
        id="pricing_card"
      >
        {plan_data.is_sandbox_access && <div className={styles.colorhead}>Popular choice</div>}
        <div className={styles.inner_box}>
          <div className={styles.plan_title}>{plan_data.subInfo.plan_title}</div>
          <div id={plan_data.type == "subs" ? "valuebox" : "valueboxE"}>
            <div className={styles.value}>
              {plan_data.type == "subs" ? (
                <>
                  {plan_data.campaign_offer ? (
                    <>
                      <div className={styles.discount}>
                        {plan_data.campaign_offer.campaign_details.discount_percent}% OFF
                      </div>
                      {plan_data.campaign_offer.campaign_details.calculation_based_on_regular ==
                      1 ? (
                        <>
                          <div className={`${styles.planprice}`}>
                            <span className={`${styles.strike} ${styles.campaign}`}>
                              ${(plan_data.price.usd / plan_data.subscription_for).toFixed(2)}
                            </span>
                            <span className={`${styles.campaign}`}>/</span>
                            <span className={`${styles.month} ${styles.strike}`}>mo</span>
                          </div>
                          <div className={styles.planprice}>
                            $
                            {(
                              plan_data.campaign_offer.price.usd / plan_data.subscription_for
                            ).toFixed(2)}
                            /<span className={styles.month}>mo</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`${styles.planprice}`}>
                            <span className={`${styles.strike} ${styles.campaign}`}>
                              ${(plan_data.offer_price.usd / plan_data.subscription_for).toFixed(2)}
                            </span>
                            <span className={`${styles.campaign}`}>/</span>
                            <span className={`${styles.month} ${styles.cmonth}`}> mo</span>
                          </div>
                          <div className={styles.planprice}>
                            $
                            {(
                              plan_data.campaign_offer.price.usd / plan_data.subscription_for
                            ).toFixed(2)}
                            /<span className={styles.month}>mo</span>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={styles.planprice}>
                        ${(plan_data.offer_price.usd / plan_data.subscription_for).toFixed(2)}/
                        <span className={styles.month}>mo</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className={styles.enterprise_desc} id="enterprice">
                  {plan_data.desc}
                </div>
              )}
              {plan_data.type == "subs" && (
                <div className={styles.pricinginfo}>
                  {plan_data.campaign_offer ? (
                    <>
                      ${parseFloat(plan_data.campaign_offer.price.usd).toFixed(2)} billed for the
                      1st
                      {plan_data.subscription_for == 12 ? <> year</> : <> month</>}
                    </>
                  ) : (
                    <>
                      {!plan_data.campaign_offer && plan_data.subscription_for == 12 && (
                        <>${parseFloat(plan_data.offer_price.usd).toFixed(2)} billed for the year</>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.button}
            style={plan_data.is_sandbox_access ? { background: "#2aa0d1", color: "white" } : {}}
            onClick={(e) => {
              e.preventDefault();
              plan_data.type == "subs"
                ? currentPlan && currentPlan?.plan_id === plan_data.id
                  ? disableButton()
                  : openCheckoutPage(plan_data)
                : handleSubsClick();
            }}
          >
            {plan_data.type == "subs" ? (
              <>
                {currentPlan
                  ? currentPlan.plan_id === plan_data.id
                    ? "Active"
                    : parseFloat(currentPlan?.plan?.offer_price?.usd) >
                      parseFloat(plan_data?.offer_price?.usd)
                    ? "Downgrade Now"
                    : "Upgrade Now"
                  : "Buy Now"}
              </>
            ) : (
              "Request Demo"
            )}
          </div>
          <div className={styles.planinfocol}>
            {plan_data.subInfo.plan_info.map((itm) => {
              return (
                <>
                  <div className={styles.planinfo}>
                    <CheckIcon />
                    {itm}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div
          className={`pricing-block ${styles.pricing_block_mobile}`}
          style={{ padding: "0px", background: "white" }}
        >
          <div className="choose-plans" style={{ margin: "10px 0px" }}>
            <div className="pricing-block" style={{ padding: "0px" }}>
              <div className="pricing-respo">
                <div className="block-group">
                  <div className="block">
                    <ul>
                      {pricingData.pricing_table_data.map((itm) => {
                        return (
                          <>
                            <li>
                              <div className="text">
                                <span>{itm.type}</span>
                                {itm.desc ? (
                                  <>
                                    <p className={styles.para}>{itm.desc}</p>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              {itm.access.includes(plan_data.ids) ? (
                                <>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </>
                              )}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
