import Head from "next/head";
import { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import FourOhFour from "pages/404";
import { connect } from "react-redux";
import { alertBox } from "../../../redux/AlertBox/alert-actions";
import { useDropzone } from "react-dropzone";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;
import { useRouter } from "next/router";
import { loadScript } from "helpers/customHooks";

const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";
import styles from "../../../public/styles/career/career.module.css"
import { Autocomplete, Paper, TextField } from "@mui/material";

const ApplyPositions = ({
  jobData,
  experienceList,
  alertBoxAction,
  seoHomePageData,
  countries,
}) => {
  const router = useRouter();
  const recaptcha = useRef(null);
  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const validateInputField = (value) => {
    if (value.trim().length !== value.length) {
      return "Value cannot contain only spaces";
    }
    return true;
  };
  const [resume, setResume] = useState({
    name: "",
    path: "",
  });
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    document.querySelector("#wrapper").classList.add("carees-upload-resume-page");
  }, []);

  useEffect(() => {
    loadScript(JS_SCRIPT);
    }, []);

  const onDrop = useCallback((acceptedFiles) => {
    uploadImage(acceptedFiles);
  }, []);

  const uploadImage = async (file) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("fs3folderpath", "assist/career/");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let uploadResponse: any = await axios.post(ADMIN_URL + "/file-upload", formData, config);
    if (uploadResponse && uploadResponse.data.msg && uploadResponse.data.status == "failed") {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: uploadResponse.data.msg,
      });
      setUploadLoading(false);
      return;
    }
    if (uploadResponse && uploadResponse.data.url && uploadResponse.data.status == "success") {
      setResume({
        name: file[0]?.name,
        path: uploadResponse.data.url,
      });
    }
    setUploadLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const recaptchaLoader = () => {};
  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const changeCountry = async (e) => {
    setStates([]);
    setCities([]);
    // const countryId = e.target.value;
    const countryId = e.toString();
    if (countryId) {
      const stateResp = await axios.get(baseUrl + "/data/states/" + countryId);
      setStates(stateResp.data.data);
    }
  };

  const changeState = async (e) => {
    setCities([]);
    //const stateId = e.target.value;
    const stateId = e.toString();
    if (stateId) {
      const cityResp = await axios.get(baseUrl + "/data/cities/" + stateId);
      setCities(cityResp.data.data);
    }
  };

  const onSubmit = async (formData, e) => {
    const insertData = JSON.stringify({
      position_id: jobData.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      contact_no: formData.phone,
      total_experience: formData.total_experience,
      expertise: formData.skills,
      resume: resume.path,
      status: 1,
      country_id: formData.country_id,
      state_id: formData.state_id,
      city_id: formData.city_id,
      about_strengths: formData.about_strengths,
      why_applied: formData.why_applied,
    });

    if (!resume?.path) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Resume field is required...Please upload your resume.",
      });
      return;
    }

    if (!recaptchaVerified) {
      alertBoxAction({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
      return;
    }

    if (resume?.path && recaptchaVerified) {
      const { data } = await axios.post(baseUrl + "/web/career-candidates", insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data && data.status && data.status == "error") {
        recaptcha.current.reset();
        SetRecaptchaVerified(false);
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: data.message,
        });
      }
      if (data && data.data && !data.status) {
        e.target.reset();
        setResume({
          name: "",
          path: "",
        });
        alertBoxAction({
          type: "SUCCESS",
          title: "success",
          msg: "Details submitted successfully...",
        });
        setTimeout(() => {
          router.push("/careers");
        }, 2000);
      }
      recaptcha.current.reset();
    }
  };

  if (!jobData || !jobData.id) return <FourOhFour />;


  //Experience
  const [totalExperience, setTotalExperience] = useState(null);
  const [ExperienceOption, setExperienceOption] = useState([
    { label: "Student", value: 26 },
    { label: "Fresher", value: 27 },
    ...experienceList.map((experience) => ({
      label: `${experience} ${experience === 1 ? "Year" : "Years"}`,
      value: experience,
    })),

  ]);
  

  const [autocompleteCountry, setAutocompleteCountry] = useState(countries.find((country) => country.id === watch("country_id")) || null);
  const [autocompleteState, setAutocompleteState] = useState(states.find((state) => state.id === watch("state_id")) || null);
  const [autocompleteCity, setAutocompleteCity] = useState(cities.find((city) => city.id === watch("city_id")) || null);

  return (
    <>
      {/* <Head>
        <title>Career | Whizlabs</title>
      </Head> */}
      <div id="content-area">
        <div className="banner-empty"></div>
        <div className="container">
          <div className="apply-block">
            <h1>
              Apply for the <strong>{jobData.position_title}</strong>
            </h1>
            <div className="template-area">
              {!resume?.path && !uploadLoading ? (
                <div className="upload-group" {...getRootProps()}>
                  <div className="drag-form">
                    <div className="dropzone-desc">
                      <figure>
                        <img className="img-full" src="/images/drag-icon.svg" alt="drag icon" style={{width:'30px'}} />
                      </figure>
                      <span>
                        Drag/Drop your Resume or <a>Browse</a>
                      </span>
                      <input {...getInputProps()} />
                    </div>
                    <label>
                      Only DOC or PDF with max file size of <strong>15MB</strong>
                    </label>
                  </div>
                  <div className="file-add">
                    {/* <div className="google-icons">
                          <a href="#" className="icon-img">
                            <figure><img className="img-full" src="images/onedrive.png"></figure>
                          </a>
                          <a href="#" className="icon-img">
                            <figure><img className="img-full" src="images/dropbox.png"></figure>
                          </a>
                          <a href="#" className="icon-img">
                            <figure><img className="img-full" src="images/googledrive.png"></figure>
                          </a>
                        </div> */}
                    <div className="uploader-file">
                      <label className="btn-upload">Upload</label>
                      <input
                        className="file-add__input"
                        type="file"
                        onChange={(e) => uploadImage(e.target.files)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {uploadLoading && (
                <div className="status">
                  <strong>File Uploading....</strong>
                </div>
              )}

              {resume && resume.path && resume.name && (
                <div className="status">
                  {resume.name}
                  <figure style={{ cursor: "pointer" }}>
                    <img
                      className="img-full"
                      src="/images/round-cross.svg"
                      onClick={(e) => setResume({ name: "", path: "" })}
                    />
                  </figure>
                </div>
              )}
            </div>
            <div className="info-block">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="title">Personal Information</div>
                <div className="input-box-group">
                  <div className="input-box">
                    <label>
                      First Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      placeholder="Enter First Name"
                      name="first_name"
                      {...register("first_name",{ required: true ,validate:validateInputField})}
                      // ref={register({ required: true ,validate:validateInputField})}
                    />
                    {errors.first_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      placeholder="Enter Last Name"
                      name="last_name"
                      {...register("last_name",{ required: true ,validate:validateInputField})}
                      // ref={register({ required: true ,validate:validateInputField})}
                    />
                    {errors.last_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      Email<span>*</span>
                    </label>
                    <input
                      type="email"
                      className="bg-ghostwhite"
                      placeholder="Enter Email address"
                      name="email"
                      {...register("email",{ required: true })}
                      // ref={register({ required: true })}
                    />
                    {errors.email && <span style={{ color: "red" }}>This field is required</span>}
                  </div>
                  <div className="input-box">
                    <label>
                      Phone<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      placeholder="Enter Phone number"
                      name="phone"
                      {...register("phone",{ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i })}
                      // ref={register({ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i })}
                    />
                    {errors.phone && errors.phone.type === "pattern" && (
                      <span style={{ color: "red" }}>Please enter valid phone number.</span>
                    )}
                    {errors.phone && errors.phone.type === "required" && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box box">
                    <label>
                      Total Experience<span>*</span>
                    </label>
                    <div className="">
                      {/* <select
                        name="total_experience"
                        {...register("total_experience",{ required: true })}
                        // ref={register({ required: true })}
                        style={{
                          borderColor: "#c3c3c3 !important",
                          display: "block",
                        }}
                      >
                        <option value="">Select your Experience</option>
                        <option value="26">Student</option>
                        <option value="27">Fresher</option>
                        {experienceList &&
                          experienceList.map(function (data, key) {
                            return (
                              <>
                              <option key={key} value={data}>
                                {data} {data == 1 ? "Year" : "Years"}
                              </option>
                              </>
                            );
                          })}
                      </select> */}
                      <Autocomplete
                        size="small" 
                        style={{borderColor: "#c3c3c3 !important",}}
                        sx={{
                          "& input:focus": {
                            borderColor: "#fff !important",
                            boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                          },                      
                        }}
                        value={totalExperience}
                        {...register("total_experience", { required: true })}
                        className="career_experience"
                        options={ExperienceOption}
                        onChange={(event, selectedOption) => {
                          setTotalExperience(selectedOption);
                          setValue('total_experience', selectedOption ? selectedOption.value.toString() : ''); 
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => ( <TextField {...params} placeholder="Select Total Experience"/>)}
                        PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                      />
                      {errors.total_experience && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.selectLocation} location-box`}>
                    <div
                      className="input-box country"
                      style={{
                        width: "100%",                        
                      }}
                    >
                      <label>
                        Country <small>*</small>
                      </label>
                      <div>
                        {/* <select
                          {...register("country_id", {
                            required: true,
                            onChange: (e) => changeCountry(e),
                          })}
                          // ref={register({ required: true })}
                          name="country_id"
                        >
                          <option value="">Select Country </option>
                          {countries.map((item, i) => (
                            <option
                              key={i}
                              value={item.id}
                              // selected={datas.country_id === item.id ? true : false}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select> */}
                        <Autocomplete
                          className="career_experience"
                          sx={{
                            "& input:focus": {
                              borderColor: "#fff !important",
                              boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                            },                      
                          }}
                          {...register("country_id", {required: true,})}
                          value={autocompleteCountry}
                          options={countries}
                          onChange={(event, selectedOption) => {
                            const selectedCountryId = selectedOption ? selectedOption.id : "";
                            setValue("country_id", selectedCountryId);
                            changeCountry(selectedCountryId);
                            setAutocompleteCountry(selectedOption)
                            setAutocompleteState(null);
                            setAutocompleteCity(null);
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (<TextField  {...params} placeholder="Select Country" />)}
                          PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                        />
                        {errors.country_id && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                      </div>
                    </div>
                    <div className="input-box box" style={{ paddingRight: "5px" }}>
                      <label>
                        State <small>*</small>
                      </label>
                      <div>
                        {/* <select
                          {...register("state_id", {
                            required: true,
                            onChange: (e) => changeState(e),
                          })}
                          // ref={register({ required: true })}
                          name="state_id"
                        >
                          <option value="">Select State</option>
                          {states.map((item, i) => (
                            <option
                              key={i}
                              // selected={datas.state_id === item.id ? true : false}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select> */}
                        <Autocomplete
                          className="career_experience"
                          sx={{
                            "& input:focus": {
                              borderColor: "#fff !important",
                              boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                            },                      
                          }}
                          {...register("state_id", {required: true,})}
                          value={autocompleteState}
                          onChange={(event, selectedOption) => {
                            const selectedStateId = selectedOption ? selectedOption.id : "";
                            setValue("state_id", selectedStateId);
                            changeState(selectedStateId);
                            setAutocompleteState(selectedOption);
                            setAutocompleteCity(null);
                          }}
                          options={states}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (<TextField {...params} placeholder="Select State" />)}
                          PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                        />
                        {errors.state_id && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                      </div>
                    </div>
                    <div className="input-box box">
                      <label>
                        City<small>*</small>
                      </label>
                      <div>
                        {/* <select
                          // onChange={(e) => changeCity(e)}
                          // ref={register({ required: true })}
                          {...register("city_id",{ required: true })}
                          // name="city_id"
                        >
                          <option value="">Select City</option>
                          {cities.map((item, i) => (
                            <option
                              key={i}
                              // selected={datas.city_id === item.id ? true : false}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select> */}
                        <Autocomplete
                          className="career_experience"
                          sx={{
                            "& input:focus": {
                              borderColor: "#fff !important",
                              boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                            },                      
                          }}
                          {...register("city_id",{ required: true })}
                          value={autocompleteCity}
                          onChange={(event, selectedOption) => {
                            setValue("city_id", selectedOption ? selectedOption.id : "");
                            setAutocompleteCity(selectedOption)
                          }}
                          options={cities}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => ( <TextField  {...params} placeholder="Select City" /> )}
                          PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                        />
                        {errors.city_id && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="input-box box">
                    <label>
                      Expertise/Skills<span>*</span>
                    </label>
                    <textarea
                      placeholder="Enter Skills"
                      name="skills"
                      {...register("skills",{ required: true ,validate:validateInputField})}
                      // ref={register({ required: true ,validate:validateInputField})}
                    ></textarea>
                    {errors.skills && <span style={{ color: "red" }}>This field is required</span>}
                  </div>
                  <div className="input-box box">
                    <label>
                      Write a few lines about your strengths. <span>*</span>
                    </label>
                    <textarea
                      placeholder="Enter your strengths"
                      name="about_strengths"
                      {...register("about_strengths",{ required: true, validate: validateInputField })}
                      // ref={register({ required: true, validate: validateInputField })}
                    ></textarea>
                    {errors.about_strengths && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box box">
                    <label>
                      Why you would like to apply for Whizlabs?<span>*</span>
                    </label>
                    <textarea
                      placeholder="Enter Reason"
                      name="why_applied"
                      {...register("why_applied", { required: true, validate: validateInputField })}
                      // ref={register({ required: true, validate: validateInputField })}
                    ></textarea>
                    {errors.why_applied && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box box">
                    <ReCAPTCHA
                      ref={recaptcha}
                      sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                      onChange={verifyCallback}
                      theme="light"
                    />
                  </div>
                </div>
                <div className="btn-group">
                  {uploadLoading ? (
                    <p className="btn btn-submit">Submit</p>
                  ) : (
                    <button className="btn btn-submit">Submit</button>
                  )}
                  {/* <button className="btn btn-cancel">Cancel</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  let jobData = [];
  const seoHomePageData = {
    seoPageType: "career",
    title: "Career | Whizlabs",
    metaTags: [
      { name: "", property: "", content: "" },
    ],
    };
  try {
    let positionResponse = await axios.get(baseUrl + "/web/career-positions", {
      params: {
        slug: slug,
      },
    });

    if (
      positionResponse &&
      positionResponse.data &&
      positionResponse.data.data &&
      positionResponse.data.data[0]
    ) {
      jobData = positionResponse.data.data[0];
    }
  } catch (error) {
    console.error(error);
  }

  const experienceList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  ];

  const countriesResp = await axios.get(baseUrl + "/data/countries");
  const countries = countriesResp.data.data;

  return {
    props: { jobData, experienceList, seoHomePageData, countries },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(ApplyPositions);
