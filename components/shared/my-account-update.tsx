import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const redirect = process.env.NEXT_PUBLIC_BASE_PATH;
import { useRouter } from "next/router";
import Link from "next/link";
import { UserAccountCloseModal } from "./Modals";
import cookie from "js-cookie";
import { Tooltip } from "@mui/material";
import styles from "../../public/styles/components/myAccountUpdate.module.css";

const MyAccountUpdate = ({ tabActive,
                            profile,
                            userId,
                            authLogout,
                            alertBox,
                            clearCart,
                            email_verified,
                            UpdateUserProfile,
                            userData,
                            mailSent,
                            Mailsentaction
                           }) => {

  const router = useRouter();
  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, []);

 
  const is_socialLogin = cookie.get("is_socialLogin");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [email, setEmail] = useState(profile && profile.email ? profile.email : null);
  const [hideresenemail,setresend] = useState(false)
  const [showCurrentPassword,setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateEmailForm = async (e) => {
    e.preventDefault();
    const response = await axios.put(baseUrl + "/users/profile/" + userId, {
      email: email,
    });
    if (response && response.data.status && response.data.status === 1) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Email updated",
      });
    }
  };
  const updatePasswordForm = async (formData, e) => {
    e.preventDefault();
    const response = await axios.put(baseUrl + "/users/profile/" + userId, {
      current_password: formData.current_password,
      password: formData.confirm_password,
    });
    if (response && response.data.status && response.data.status === 1) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Password updated",
      });
    } else if (response && response.data.status && response.data.status == "error") {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Current password does not match",
      });
    }
    e.target.reset();
  };

  const openCloseUserAccountModal = async (e) => {
    e.preventDefault();
    document.body.classList.add("open-modal-close-user-account");
  };

  const closeUserAccount = async (e) => {
    e.preventDefault();
    document.body.classList.remove("open-modal-close-user-account");
    const response = await axios.delete(baseUrl + "/users/profile/" + userId + "/close");
    if (response && response.data.msg) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "You account close request is submitted. Out team will get in touch with you shortly.",
      });
      return;
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const eyeIconRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (eyeIconRef.current && !eyeIconRef.current.contains(event.target)) {
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <UserAccountCloseModal handleUserAccountClose={closeUserAccount} />
      <div style={{ display: tabActive ? "block" : "none" }} id="account">
        <div className="container">
          <div className="tab-account">
            <div className="white-box">
              <div className="head-section">Your account email</div>
              <div className="box-content" style={{ display: email_verified ? "flex" : "", justifyContent: email_verified ? "space-between" : '' }}>
                {/* <form onSubmit={updateEmailForm}> */}
                <div className="input-box-group" style={{ margin: email_verified ? 0 : '', width: email_verified ? '100%' : '' }}>
                  <div className="input-box">
                    <label>Email Address</label>
                    <input
                      style={{ backgroundColor: "#e2e2e294", width:'100%' }}
                      readOnly
                      required
                      type="email"
                      placeholder="Enter Your Email"
                      defaultValue={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {email_verified == false && (
                  <div className="verify-acc">
                    {!mailSent && (
                      <div
                        className="txt"
                        onClick={async (e) => {
                          e.preventDefault();
                          await axios
                            .post(
                              `${baseUrl}/auth/mail/send_verify_mail`,{
                                email:email,
                                ref:redirect
                              }
                            )
                            .then((resp) => {
                              if (resp.data.status == 1) {
                                Mailsentaction()
                                alertBox({
                                  type: "SUCCESS",
                                  title: "Success",
                                  msg: "Verification mail has been sent!!",
                                });
                              }
                            });
                        }}
                      >
                        Verify your e-mail address
                      </div>
                    )}
                    {mailSent && <>
                      <Tooltip title={`${mailSent  ? "Please check your inbox and verify your e-mail address" : ""}`} 
                        placement="top" 
                        arrow
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -10],
                                },
                              },
                            ],
                          },
                        }}
                        
                      >
                        
                      <a className="txt" 
                      style={{marginRight:"5px"}}
                      >Verification pending!
                    </a>
                      </Tooltip>
                    <span onClick={async(e)=>{
                             e.preventDefault();
                             await axios
                               .post(
                                 `${baseUrl}/auth/mail/send_verify_mail`,{
                                  email:email,
                                  ref:redirect
                                 }
                               )
                               .then((resp) => {
                                 if (resp.data.status == 1) {
                                  alertBox({
                                    type: "SUCCESS",
                                    title: "Success",
                                    msg: "Verification mail has been sent!!",
                                  });
                                 }
                               });
                    }}
                    style={{margin:"0",cursor:"pointer",color:"#ff6c00"}}
                    >Resend e-mail!</span>
                    
                    </>
                    }
                  </div>
                )}
                {email_verified == true && (
                  <>
                    <div className="verified-buyer" style={{alignItems: email_verified? 'flex-end': "", margin: email_verified? "0 0 0.5rem 0.5rem": ''}}>
                      <i className="icon icon-font-verified-buyes" style={{color:"#4CAF50"}}></i>
                      <span style={{color:"black",marginLeft:"5px"}}>Verified</span>
                    </div>
                  </>
                )}
                {/* <button type="submit" className="btn btn-update">
                    Update
                  </button> */}
                {/* </form> */}
              </div>
            </div>
            {!is_socialLogin ? (
              <div className="white-box">
                <div className="head-section">Update your account password</div>
                <div className="box-content">
                  <form onSubmit={handleSubmit(updatePasswordForm)}>
                    <div className="input-box-group" ref={eyeIconRef}>
                      <div className="input-box">
                        <label>
                          Current Password<small>*</small>
                        </label>
                        <div className={styles.password_input_container}>
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            maxLength={40}
                            placeholder="Current Password"
                            name="current_password"
                           {...register("current_password",{ required: true })}
                          />
                          <span
                            onClick={toggleCurrentPasswordVisibility}
                            className={styles.password_toggle_icon}
                          >
                            {showCurrentPassword ? (
                              <svg
                                height="26px"
                                version="1.1"
                                viewBox="0 0 32 32"
                                width="26px"
                                // xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  fill="none"
                                  fillRule="evenodd"
                                  id="Page-1"
                                  stroke="none"
                                  stroke-width="1"
                                >
                                  <g fill="#929292" id="icon-22-eye">
                                    <path
                                      d="M17,9 C8,9 4,16 4,16 C4,16 8,23.000001 17,23 C26,22.999999 30,16 30,16 C30,16 26,9 17,9 L17,9 Z M17,20 C19.2091391,20 21,18.2091391 21,16 C21,13.7908609 19.2091391,12 17,12 C14.7908609,12 13,13.7908609 13,16 C13,18.2091391 14.7908609,20 17,20 L17,20 Z M17,19 C18.6568543,19 20,17.6568543 20,16 C20,14.3431457 18.6568543,13 17,13 C15.3431457,13 14,14.3431457 14,16 C14,17.6568543 15.3431457,19 17,19 L17,19 Z M17,17 C17.5522848,17 18,16.5522848 18,16 C18,15.4477152 17.5522848,15 17,15 C16.4477152,15 16,15.4477152 16,16 C16,16.5522848 16.4477152,17 17,17 L17,17 Z"
                                      id="eye"
                                    />
                                  </g>
                                </g>
                              </svg>
                            ) : (
                              <>
                                <svg
                                  height="24px"
                                  version="1.1"
                                  viewBox="0 0 32 32"
                                  width="24px"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <title />
                                  <desc />
                                  <defs />
                                  <g
                                    fill="none"
                                    fillRule="evenodd"
                                    id="Page-1"
                                    stroke="none"
                                    stroke-width="1"
                                  >
                                    <g fill="#929292" id="icon-21-eye-hidden">
                                      <path
                                        d="M8.10869891,20.8913011 C4.61720816,18.8301147 3,16 3,16 C3,16 7,9 16,9 C17.3045107,9 18.5039752,9.14706466 19.6014388,9.39856122 L18.7519017,10.2480983 C17.8971484,10.0900546 16.9800929,10 16,10 C8,10 4.19995117,16 4.19995117,16 C4.19995117,16 5.71472808,18.3917225 8.84492713,20.1550729 L8.10869891,20.8913011 L8.10869891,20.8913011 L8.10869891,20.8913011 Z M12.398561,22.601439 C13.4960246,22.8529356 14.6954892,23.0000001 16,23 C25,22.999999 29,16 29,16 C29,16 27.3827918,13.1698856 23.8913008,11.1086992 L23.1550727,11.8449273 C26.2852719,13.6082776 27.8000488,16 27.8000488,16 C27.8000488,16 24,21.999999 16,22 C15.019907,22.0000001 14.1028515,21.9099455 13.2480981,21.7519019 L12.398561,22.601439 L12.398561,22.601439 L12.398561,22.601439 Z M19.8986531,15.1013469 C19.9649658,15.3902115 20,15.6910144 20,16 C20,18.2091391 18.2091391,20 16,20 C15.6910144,20 15.3902115,19.9649658 15.1013469,19.8986531 L16,19 C16.7677669,19.0000001 17.5355339,18.7071068 18.1213203,18.1213203 C18.7071068,17.5355339 19.0000001,16.7677669 19,16 L19.8986531,15.1013469 L19.8986531,15.1013469 L19.8986531,15.1013469 Z M16.8986531,12.1013469 C16.6097885,12.0350342 16.3089856,12 16,12 C13.7908609,12 12,13.7908609 12,16 C12,16.3089856 12.0350342,16.6097885 12.1013469,16.8986531 L13,16 C12.9999999,15.2322331 13.2928932,14.4644661 13.8786797,13.8786797 C14.4644661,13.2928932 15.2322331,12.9999999 16,13 L16.8986531,12.1013469 L16.8986531,12.1013469 L16.8986531,12.1013469 Z M24,7 L7,24 L8,25 L25,8 L24,7 L24,7 Z"
                                        id="eye-hidden"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              </>
                            )}
                          </span>
                        </div>
                        {errors.current_password && errors.current_password.type === "required" && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                      </div>
                      <div className="input-box">
                        <label>
                          New Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className={styles.password_input_container}>
                          <input
                            type={showNewPassword ? "text" : "password"}
                            minLength={8}
                            maxLength={50}
                            placeholder="New Password"
                            name="new_password"
                            {...register("new_password", { required: true })}
                          />
                          <span
                            onClick={toggleNewPasswordVisibility}
                            className={styles.password_toggle_icon}
                          >
                            {showNewPassword ? (
                              <svg
                                height="26px"
                                version="1.1"
                                viewBox="0 0 32 32"
                                width="26px"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  fill="none"
                                  fillRule="evenodd"
                                  id="Page-1"
                                  stroke="none"
                                  stroke-width="1"
                                >
                                  <g fill="#929292" id="icon-22-eye">
                                    <path
                                      d="M17,9 C8,9 4,16 4,16 C4,16 8,23.000001 17,23 C26,22.999999 30,16 30,16 C30,16 26,9 17,9 L17,9 Z M17,20 C19.2091391,20 21,18.2091391 21,16 C21,13.7908609 19.2091391,12 17,12 C14.7908609,12 13,13.7908609 13,16 C13,18.2091391 14.7908609,20 17,20 L17,20 Z M17,19 C18.6568543,19 20,17.6568543 20,16 C20,14.3431457 18.6568543,13 17,13 C15.3431457,13 14,14.3431457 14,16 C14,17.6568543 15.3431457,19 17,19 L17,19 Z M17,17 C17.5522848,17 18,16.5522848 18,16 C18,15.4477152 17.5522848,15 17,15 C16.4477152,15 16,15.4477152 16,16 C16,16.5522848 16.4477152,17 17,17 L17,17 Z"
                                      id="eye"
                                    />
                                  </g>
                                </g>
                              </svg>
                            ) : (
                              <>
                                <svg
                                  height="24px"
                                  version="1.1"
                                  viewBox="0 0 32 32"
                                  width="24px"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <title />
                                  <desc />
                                  <defs />
                                  <g
                                    fill="none"
                                    fillRule="evenodd"
                                    id="Page-1"
                                    stroke="none"
                                    stroke-width="1"
                                  >
                                    <g fill="#929292" id="icon-21-eye-hidden">
                                      <path
                                        d="M8.10869891,20.8913011 C4.61720816,18.8301147 3,16 3,16 C3,16 7,9 16,9 C17.3045107,9 18.5039752,9.14706466 19.6014388,9.39856122 L18.7519017,10.2480983 C17.8971484,10.0900546 16.9800929,10 16,10 C8,10 4.19995117,16 4.19995117,16 C4.19995117,16 5.71472808,18.3917225 8.84492713,20.1550729 L8.10869891,20.8913011 L8.10869891,20.8913011 L8.10869891,20.8913011 Z M12.398561,22.601439 C13.4960246,22.8529356 14.6954892,23.0000001 16,23 C25,22.999999 29,16 29,16 C29,16 27.3827918,13.1698856 23.8913008,11.1086992 L23.1550727,11.8449273 C26.2852719,13.6082776 27.8000488,16 27.8000488,16 C27.8000488,16 24,21.999999 16,22 C15.019907,22.0000001 14.1028515,21.9099455 13.2480981,21.7519019 L12.398561,22.601439 L12.398561,22.601439 L12.398561,22.601439 Z M19.8986531,15.1013469 C19.9649658,15.3902115 20,15.6910144 20,16 C20,18.2091391 18.2091391,20 16,20 C15.6910144,20 15.3902115,19.9649658 15.1013469,19.8986531 L16,19 C16.7677669,19.0000001 17.5355339,18.7071068 18.1213203,18.1213203 C18.7071068,17.5355339 19.0000001,16.7677669 19,16 L19.8986531,15.1013469 L19.8986531,15.1013469 L19.8986531,15.1013469 Z M16.8986531,12.1013469 C16.6097885,12.0350342 16.3089856,12 16,12 C13.7908609,12 12,13.7908609 12,16 C12,16.3089856 12.0350342,16.6097885 12.1013469,16.8986531 L13,16 C12.9999999,15.2322331 13.2928932,14.4644661 13.8786797,13.8786797 C14.4644661,13.2928932 15.2322331,12.9999999 16,13 L16.8986531,12.1013469 L16.8986531,12.1013469 L16.8986531,12.1013469 Z M24,7 L7,24 L8,25 L25,8 L24,7 L24,7 Z"
                                        id="eye-hidden"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              </>
                            )}
                          </span>
                        </div>
                        {errors.new_password && errors.new_password.type === "required" && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                        {errors.new_password && errors.new_password.type === "minLength" && (
                          <span style={{ color: "red" }}>
                            Password length must be 8 characters.
                          </span>
                        )}
                      </div>
                      <div className="input-box">
                        <label>
                          Confirm Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className={styles.password_input_container}>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirm_password"
                            minLength={8}
                            maxLength={50}
                           {...register("confirm_password",{
                              required: true,
                              validate: (value) => value === watch("new_password"),
                            })}
                          />
                          <span
                            onClick={toggleConfirmPasswordVisibility}
                            className={styles.password_toggle_icon}
                          >
                            {showConfirmPassword ? (
                              <svg
                                height="26px"
                                version="1.1"
                                viewBox="0 0 32 32"
                                width="26px"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  fill="none"
                                  fillRule="evenodd"
                                  id="Page-1"
                                  stroke="none"
                                  stroke-width="1"
                                >
                                  <g fill="#929292" id="icon-22-eye">
                                    <path
                                      d="M17,9 C8,9 4,16 4,16 C4,16 8,23.000001 17,23 C26,22.999999 30,16 30,16 C30,16 26,9 17,9 L17,9 Z M17,20 C19.2091391,20 21,18.2091391 21,16 C21,13.7908609 19.2091391,12 17,12 C14.7908609,12 13,13.7908609 13,16 C13,18.2091391 14.7908609,20 17,20 L17,20 Z M17,19 C18.6568543,19 20,17.6568543 20,16 C20,14.3431457 18.6568543,13 17,13 C15.3431457,13 14,14.3431457 14,16 C14,17.6568543 15.3431457,19 17,19 L17,19 Z M17,17 C17.5522848,17 18,16.5522848 18,16 C18,15.4477152 17.5522848,15 17,15 C16.4477152,15 16,15.4477152 16,16 C16,16.5522848 16.4477152,17 17,17 L17,17 Z"
                                      id="eye"
                                    />
                                  </g>
                                </g>
                              </svg>
                            ) : (
                              <>
                                <svg
                                  height="24px"
                                  version="1.1"
                                  viewBox="0 0 32 32"
                                  width="24px"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <title />
                                  <desc />
                                  <defs />
                                  <g
                                    fill="none"
                                    fillRule="evenodd"
                                    id="Page-1"
                                    stroke="none"
                                    stroke-width="1"
                                  >
                                    <g fill="#929292" id="icon-21-eye-hidden">
                                      <path
                                        d="M8.10869891,20.8913011 C4.61720816,18.8301147 3,16 3,16 C3,16 7,9 16,9 C17.3045107,9 18.5039752,9.14706466 19.6014388,9.39856122 L18.7519017,10.2480983 C17.8971484,10.0900546 16.9800929,10 16,10 C8,10 4.19995117,16 4.19995117,16 C4.19995117,16 5.71472808,18.3917225 8.84492713,20.1550729 L8.10869891,20.8913011 L8.10869891,20.8913011 L8.10869891,20.8913011 Z M12.398561,22.601439 C13.4960246,22.8529356 14.6954892,23.0000001 16,23 C25,22.999999 29,16 29,16 C29,16 27.3827918,13.1698856 23.8913008,11.1086992 L23.1550727,11.8449273 C26.2852719,13.6082776 27.8000488,16 27.8000488,16 C27.8000488,16 24,21.999999 16,22 C15.019907,22.0000001 14.1028515,21.9099455 13.2480981,21.7519019 L12.398561,22.601439 L12.398561,22.601439 L12.398561,22.601439 Z M19.8986531,15.1013469 C19.9649658,15.3902115 20,15.6910144 20,16 C20,18.2091391 18.2091391,20 16,20 C15.6910144,20 15.3902115,19.9649658 15.1013469,19.8986531 L16,19 C16.7677669,19.0000001 17.5355339,18.7071068 18.1213203,18.1213203 C18.7071068,17.5355339 19.0000001,16.7677669 19,16 L19.8986531,15.1013469 L19.8986531,15.1013469 L19.8986531,15.1013469 Z M16.8986531,12.1013469 C16.6097885,12.0350342 16.3089856,12 16,12 C13.7908609,12 12,13.7908609 12,16 C12,16.3089856 12.0350342,16.6097885 12.1013469,16.8986531 L13,16 C12.9999999,15.2322331 13.2928932,14.4644661 13.8786797,13.8786797 C14.4644661,13.2928932 15.2322331,12.9999999 16,13 L16.8986531,12.1013469 L16.8986531,12.1013469 L16.8986531,12.1013469 Z M24,7 L7,24 L8,25 L25,8 L24,7 L24,7 Z"
                                        id="eye-hidden"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              </>
                            )}
                          </span>
                        </div>
                        {errors.confirm_password && errors.confirm_password.type === "required" && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                        {errors.confirm_password &&
                          errors.confirm_password.type === "minLength" && (
                            <span style={{ color: "red" }}>
                              Confirm Password length must be 6 characters.
                            </span>
                          )}
                        {errors.confirm_password && errors.confirm_password.type === "validate" && (
                          <span style={{ color: "red" }}>
                            New password and confirm password does not match
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <button type="submit" className="btn btn-update">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* <div className={!is_socialLogin ? "white-box full" : "white-box"}>
              <div className="head-section">Close Your Account</div>
              <div className="box-content">
                <p>
                  If you’re facing problem, please consider{" "}
                  <Link legacyBehavior  href="/contact-us/">
                    <a>Contacting us</a>
                  </Link>{" "}
                  about it before closing your account.
                </p>
                <p className="warning-text">
                  <strong>Warning:</strong> If you close your account, you will be unsubscribed from
                  all your courses, and will lose access forever.{" "}
                </p>
                <button onClick={(e) => openCloseUserAccountModal(e)} className="btn btn-acc-close">
                  Close My Account
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountUpdate;
