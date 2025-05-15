import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { alertBox } from "../../redux/AlertBox/alert-actions";
import { connect } from "react-redux";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

const CourseFeedback = ({ alertBox }) => {
  const router = useRouter();
  const {
    query: { rate, token },
  } = router;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const fetchData = async () => {
    await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/course-feedback/store`,
      data: {
        rating_count: rate,
        token,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.data.existingFeedback) {
          setIsAlreadySubmitted(true);
          setIsSubmitted(true);
          // alertBox({
          //   type: "SUCCESS",
          //   title: "Success",
          //   msg: res.data.msg,
          // });
          // setTimeout(() => {
          //   // console.log("redirecting");
          //   router.push("/");
          // }, 5000);
        } else {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsLoading(false);
          setIsDisabled(true);
          alertBox({
            type: "SUCCESS",
            title: "",
            msg: "Thank you ",
          });
          setTimeout(() => {
            router.push("/");
          }, 5000);
        } else {
          setIsLoading(false);
          setIsDisabled(true);
          alertBox({
            type: "ERROR",
            title: "Error",
            msg: "Something went wrong",
          });
        }
      });
  };

  const updateData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (data) {
      await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/course-feedback/update`,
        data: {
          rating_count: rate,
          token,
          rating_feedback: e.target.reason.value,
        },
      })
        .then((res) => {
          setIsLoading(false);
          setIsSubmitted(true);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsDisabled(true);
          alertBox({
            type: "ERROR",
            title: "Error",
            msg: "Something went wrong",
          });
        });
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (rate != null && token != null) {
      if (!rate || !token) {
        router.push("/404");
      } else {
        fetchData();
      }
    }
  }, [rate, token]);

  return (
    <div className="course-feedback">
      {isSubmitted ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={"/images/feedback/thumsup.png"} width={53} height={53} alt="thumsup" />

            <Typography
              sx={{
                fontSize: "20px !important",
                fontWeight: "500 !important",
                color: "#2E2E2E !important",
                lineHeight: "1.2 !important",
                marginTop: "15px !important",
                fontFamily: "Poppins !important",
                lineHight: "30px !important",
              }}
            >
              {isAlreadySubmitted ? (
                <Box
                  sx={{
                    textAlign: "center !important",
                  }}
                >
                  Feedback already provided. <br /> Thank you for providing your valuable feedback!
                </Box>
              ) : (
                "Thank you for providing your valuable feedback!"
              )}
            </Typography>
            {!isAlreadySubmitted ? (
              <Typography
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "400 !important",
                  color: "#2E2E2E !important",
                  lineHeight: "1.2 !important",
                  marginTop: "25px !important",
                  fontFamily: "Poppins !important",
                  lineHight: "21px !important",
                  textAlign: "center !important",
                }}
              >
                Your input helps us to improve our services to better meet your needs.
                <br /> We appreciate your time and commitment to improving your learning experience.
              </Typography>
            ) : null}

            <Button
              sx={{
                backgroundColor: "#2aa0d1",
                marginTop: "30px !important",
                color: "#fff !important",
                padding: "10px 20px !important",
                fontSize: "20px !important",
                fontWeight: "500 !important",
                lineHeight: "1.2 !important",
                fontFamily: "Poppins !important",
                lineHight: "30px !important",
                textAlign: "center !important",
                "&:hover": {
                  backgroundColor: "#2aa0d1",
                },
              }}
              onClick={() => {
                router.push("/");
              }}
            >
              Back To Home
            </Button>
          </Box>
        </>
      ) : (
        <>
          <img src={"/images/feedback/whizlabsLogo.png"} width={"335px"} />
          <div className="course-feedback-content">
            <p>
              Thank you for your valuable feedback! we'd love to understand how to improve. please
              describe why you selected the rating: {rate}.
            </p>
            <form onSubmit={updateData}>
              <textarea
                required
                placeholder="Please mention reason here..."
                name="reason"
                disabled={isLoading}
              />
              <div className="submit-div">
                <button className="btn submit" disabled={isLoading || isDisabled}>
                  {isLoading ? (
                    <img
                      src="/images/loader.svg"
                      alt="loading..."
                      style={{
                        height: "100%",
                      }}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBox: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(CourseFeedback);
