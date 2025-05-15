import Link from "next/link";
import cookie from "js-cookie";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";

const CookieConsent = () => {
  useEffect(() => {
    const cookieAccepted = cookie.get("cookie_consent_accept");
    if (!cookieAccepted) {
      document.querySelector(".cookies-msg").classList.add("open");
    }
  }, []);
  const closeCookieModal = () => {
    if (document) {
      document.querySelector(".cookies-msg").classList.remove("open");
      document.querySelector(".cookies-msg").classList.add("close");
    }
    cookie.set("cookie_consent_accept", "true", { expires: 365 });
  };
  const closeCookieModalDecline = () => {
    if (document) {
      document.querySelector(".cookies-msg").classList.remove("open");
      document.querySelector(".cookies-msg").classList.add("close");
    }
    cookie.set("cookie_consent_accept", "false", { expires: 365 });
  };

  return (
    <div className="cookies-msg">
      <div>
        <div className="question">
          <h6>Do you allow us to use cookies?</h6>
        </div>
        <div>
          <p>
            This website uses cookies to ensure you get the best experience on our website.{" "}
            <div className="button">
              <div>
                <Button
                  className="icon-close icon-font-true-tick"
                  onClick={() => closeCookieModal()}
                >
                  Accept
                </Button>
                <Button
                  id="decline-button"
                  className="icon-close icon-font-cross"
                  onClick={() => closeCookieModalDecline()}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Reject
                </Button>
                <Link legacyBehavior href="/privacy-policy">
                  <a style={{ cursor: "pointer" }} target="_blank">
                    <strong>LEARN MORE</strong>
                  </a>
                </Link>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
