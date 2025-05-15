import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import cookie from "js-cookie";
import UploadImage from "./UploadImage";
import UserAvatar from "../plugins/UserAvatar";
import { Autocomplete, CircularProgress, FormControl, FormControlLabel, IconButton, MenuItem, Modal, Paper, Select, Switch, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, } from "@mui/material";
import reviewPopUp_logo from "../../public/images/reviewPopUp_logo.png";
import feedback_thumbsUp_logo from "../../public/images/feedback_thumbsUp_logo.png";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;
const MEDIA_URL = process.env.NEXT_PUBLIC_USER_CERTIFICATE_URL;

const MyProfile = ({
  tabActive,
  profile,
  professional,
  countries = null,
  statesList = null,
  citiesList = null,
  userId,
  alertBox,
  navigateToAccountTab,
  orders,
  subscriptionCompData
}) => {
  const years = [];
  for (let index = 0; index < 20; index++) {
    years.push(new Date().getFullYear() - index);
  }
  // console.log("professional", professional);
  const [secondarySkills, setSecondarySkills] = useState(() => {
    if (
      professional?.skills &&
      professional?.skills.length > 0
      ) {
      return professional?.skills;
    } else {
      return [
        {
          skill: null,
        },
      ];
    }
  });

  const [states, setStates] = useState(statesList || []);
  const [cities, setCities] = useState(citiesList || []);
  const [datas, setDatas] = useState({
    username: (profile && profile.username) || "",
    email: (profile && profile.email) || "",
    firstname: (profile && profile.firstname) || "",
    lastname: (profile && profile.lastname) || "",
    phone: (profile && profile.phone) || "",
    dob: (profile && profile.dob) || '',
    gender: (profile && profile.gender) || "",
    profile_picture:
      ((profile && profile.profile_picture) && (profile.profile_picture.includes("202") || profile.profile_picture.includes("201")))
        ? profile.profile_picture
        : (profile && profile.profile_picture) || "",
    address_line_1: (profile && profile.address_line_1) || "",
    address_line_2: (profile && profile.address_line_2) || "",
    country_id: (profile && profile.country_id) || "",
    state: (profile && profile.city?.state_id) || "",
    state_id: (profile && profile.state_id) || "",
    city: (profile && profile.city?.id) || "",
    city_id: (profile && profile.city_id) || "",
    facebook: (profile && profile.facebook) || "",
    google: (profile && profile.google) || "",
    linkedin: (profile && profile.linkedin) || "",
    twitter: (profile && profile.twitter) || "",
    website: (profile && profile.website) || "",
    organization_name: (profile && profile.organization_name) || "",
    designation: (profile && profile.designation) || "",
    highest_education: (profile && profile.highest_education) || "",
    total_experience: (profile && profile.total_experience) || "",
    skills: (profile && profile.skills) || "",
    enable_professional: (profile && profile.user_preferences && profile.user_preferences.enable_professional) || false,
  });
  const [professionalData, setProfessionalData] = useState({
    user_id: userId,
    summary: professional?.summary || "",
    primary_skill: professional?.primary_skill || "",
    skills: professional?.skills || [],
    education: professional?.education || "",
    total_experience: professional?.total_experience || "",
    city: professional?.city || "",
    state: professional?.state || "",
    country: professional?.country || "",
    work_experience: professional?.work_experience || [],
    certifications: professional?.certifications || [],
    availability: professional?.availability || "",
    public_profile: professional?.public_profile,
    job_change: professional?.job_change,
    profile_sharing: professional?.profile_sharing,
    profile_hire: professional?.profile_hire,
    verified: professional?.verified || false,
    active: professional?.active || false,
  });

  const [uploadModal, setUploadModal] = useState(false);
  const [uploadProcess, setUploadProcess] = useState(false);
  const [startDate, setStartDate] = useState(new Date("1900/01/01"));
  const [workExperience, setWorkExperience] = useState(professional?.work_experience || []);
  const [certifications, setCertifications] = useState(professional?.certifications || []);
  const [enableProfessional, setEnableProfessional] = useState(profile && profile.user_preferences?.enable_professional);
  const [openCert, setOpenCert] = useState(false);
  const [certPreview, setCertPreview] = useState({
    name: "",
    issued_date: "",
    url: "",
  });
  const [certList, setCertList] = useState([]);
  const [certProviders, setCertProviders] = useState([]);

  const goToTab = (value) => {
    if (window) window.scrollTo({ top: 0, behavior: "smooth" });
    navigateToAccountTab(value);
  };

  const onImageChange = async (imageUrl) => {
    let cookieUser: any = JSON.parse(cookie.get("userData"));
    if (imageUrl) {
      setUploadProcess(true);
      const formData = new FormData();
      formData.append("file", imageUrl);
      let uploadResponse: any = await axios.post(ADMIN_URL + "/s3-file-upload", formData);
      if (uploadResponse && uploadResponse.data.url) {
        await axios.put(baseUrl + "/users/profile/" + userId, {
          profile_picture: uploadResponse.data.url,
        });
        if (cookieUser.data && cookieUser.data.profile_img && cookieUser.data.profile_img) {
          cookieUser.data.profile_img = uploadResponse.data.url;
          cookie.set("userData", JSON.stringify(cookieUser));
        }
        document
          .querySelector(".user-block img")
          .setAttribute("src", process.env.NEXT_PUBLIC_LEARN_MEDIA_URL + uploadResponse.data.url);
        setDatas({ ...datas, profile_picture: uploadResponse.data.url });
        setUploadProcess(false);
        setUploadModal(false);
        alertBox({
          type: "SUCCESS",
          title: "Success",
          msg: "Profile picture updated",
        });
      }
    }
  };

//Total Experience
  const ExperienceOptions = [
    { name: "0-1 Years" },
    { name: "1-2 Years" },
    { name: "2-3 Years" },
    { name: "3-5 Years" },
    { name: "5-7 Years" },
    { name: "7-10 Years" },
    { name: "10+ Years" }
  ];
  const [totalExperience, setTotalExperience] = useState(professional?.total_experience || "");

  useEffect(() => {
    if (professional?.total_experience !== totalExperience) {
      setTotalExperience(professional?.total_experience || "");
    }
  }, [professional?.total_experience]);

  const handleExperienceChange = (event, newValue) => {
    const experienceName = newValue ? newValue.name : "";
    setProfessionalData({ ...professional, total_experience: experienceName });
    setTotalExperience(newValue?.name);
  };

// Work availability

const AvailabilityOptions = [
  { name: "Part-Time" },
  { name: "Full-Time" },
  { name: "Freelance" },
  { name: "Contract" }
];
const [availability, setAvailability] = useState(professional?.availability || "");

useEffect(() => {
  if (professional?.availability !== availability) {
    setAvailability(professionalData?.availability || "");
  }
}, [professionalData?.availability]);

const handleAvailabilityChange = (event, newValue) => {
  const availabilityName = newValue ? newValue.name : "";
  setProfessionalData({ ...professionalData, availability: availabilityName });
  setAvailability(availabilityName);
};




  const handleUploadImage = (e, i) => {
    // console.log("e", e.target.files[0]);
    if (e.target.files[0]) {
      var cert_img = e.target.files[0];
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    async function Main(cert_img) {
      if(cert_img !== "") {
        const fileData = cert_img;
        await toBase64(fileData).then(result => {
          let file = result;
          const formData = new FormData();
          formData.append('file', fileData);
          formData.append('fs3folderpath', 'user_certificates/');
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST',`${ADMIN_URL}/s3-file-upload-cert`)
          xhr.onload = function() {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
              if(response.message === "success") {
                // console.log("Image Upload", response.url);
                setCertifications(
                  certifications.map((item, index) => {
                    if (index === i) {
                      item.cert_img = response.url;
                    }
                    return item;
                  })
                );
                alertBox({
                  type: "SUCCESS",
                  title: "Success",
                  msg: "File Uploaded Successfully",
                });
              }
            }
            else {
              alertBox({
                type: "ERROR",
                title: "Error",
                msg: "Something went wrong",
              });
            }
          };
          xhr.send(formData);
        })
      }
    }
    Main(cert_img);
  }

  const onRemoveImage = (event) => {
    setDatas({ ...datas, profile_picture: "/images/user-not-found.svg" });
  };

  const changeDOB = (date) => {
    setDatas({ ...datas, dob: moment(new Date(date)).format("YYYY-MM-DD") });
  };

  const InputChange = (event) => {
    event.persist();
    setDatas((datas) => ({
      ...datas,
      [event.target.name]: event.target.value,
    }));
  };

  const CheckBoxChange = (event) => {
    event.persist();
    setDatas((datas) => ({
      ...datas,
      [event.target.name]: event.target.checked ? event.target.value : null,
    }));
  };

  const addMoreSkills = () => {
    setProfessionalData({
      ...professionalData,
      skills: [...professionalData.skills, { skill: null }],
    });
  };

  const addMoreExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        company_name: "",
        designation: "",
        start_date: new Date(),
        end_date: new Date(),
        currently_working: false,
      },
    ]);
  };

  const removeExperience = (i) => {
    const list = [...workExperience];
    list.splice(i, 1);
    setWorkExperience(list);
  };

  const changeExperience = (event, index) => {
    const { name, value } = event.target;
    let list = [...workExperience];
    list[index][name] = value;
    setWorkExperience(list);
    // console.log(workExperience);
  };

  const removeSkills = (index) => {
    const list = [...professionalData.skills];
    list.splice(index, 1);
    setProfessionalData({
      ...professionalData,
      skills: list,
    });
  };

  const addMoreCertificate = () => {
    setCertifications([...certifications, { certification_provider: null, certification_type: null, start_date: new Date(), end_date: new Date(), no_expiry: false, certificate_id: null, url: null, cert_img: null }]);
  };

  const removeCertificate = (index) => {
    const list = [...certifications];
    list.splice(index, 1);
    setCertifications(list);
  };

  const changeCertificate = (event, index) => {
    const { name, value } = event.target;
    const list = [...certifications];
    list[index][name] = value;
    setCertifications(list);
  };

  const getCertificate = async () => {
    const userDataCookie = cookie.get("userData");
    if (userDataCookie) {
      const userToken = JSON.parse(cookie.get("userData")).data.token;
      await axios.get(baseUrl + "/users/profiles/cloud_certs", {
          headers: {
            Authorization: userToken,
          },
        })
        .then((response) => {
          // console.log("response", response.data.data);
          setCertList(response.data.data);
          setCertProviders(response.data.providers);
        }
        )
    }
  }

  const changeSkills = (event, index) => {
    const { name, value } = event.target;
    const list = [...professionalData.skills];
    list[index][name] = value;
    setProfessionalData({
      ...professionalData,
      skills: list,
    });
  };

  const [autocompleteCountry, setAutocompleteCountry] = useState(countries.find((country) => country.id === datas.country_id) || null);


  const [countryChanged, setCountryChanged] = useState(false)
  const changeCountry = async (e) => {
    setStates([]);
    setCities([]);
    setDatas({
      ...datas,
      state: '',
      state_id: '',
      city: '',
      city_id: '',
    });
    if (!e || !e?.id) { 
      setStates([]);
      setCities([]);
      setDatas({
        ...datas,
        country_id: '',
        state: '',
        state_id: '',
        city: '',
        city_id: '',
      });
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your country",
      });
      return;
    }
    //const countryId = await e.target.value;
    const countryId =  e.id.toString();
    
    if (countryId === '') {
      setStates([]);
      setCities([]);
      setDatas({
        ...datas,
        country_id: '',
        state: '',
        state_id: '',
        city: '',
        city_id: '',
      });
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your country",
      });
      return;
    }

    if (countryId !== datas.country_id) {
      setCountryChanged(true);
    } else {
      setCountryChanged(false);
    }

    if (countryId) {
      const stateResp = await axios.get(baseUrl + "/data/states/" + countryId);
      setDatas((datas) => ({
        ...datas,
        country_id: countryId,
      }));
      setStates(stateResp.data.data);
    }
  };

  const [autocompleteState, setAutocompleteState] = useState(states.find((state) => state.id === datas.state_id) || null);


  const [citySelectionOptional, setCitySelectionOptional] = useState(false);
  const [stateChanged, setStateChanged] = useState(false);
  const [individualStateId, setIndividualStateId] = useState('');

  const changeState = async (e) => {
    setStateChanged(true);
    setCities([]);
    setDatas(prev => ({
      ...prev,
      city: '',
      city_id: ''
    }));
    if (!e || !e?.id) { 
      setCities([]);
      setDatas({
        ...datas,
        state: '',
        state_id: '',
        city: '',
        city_id: '',
      });
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your state",
      });
      return;
    }
    //const stateId = await e.target.value;
    const stateId =  e.id.toString();
    if (stateId === '') {
      setCities([]);
      setDatas({
        ...datas,
        state: '',
        state_id: '',
        city: '',
        city_id: '',
      });
      setCitySelectionOptional(false);
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your state",
      });
      return;
    }
    if (stateId) {
      setIndividualStateId(stateId)
      const cityResp = await axios.get(baseUrl + "/data/cities/" + stateId);

      setDatas((prevDatas) => ({
        ...prevDatas,
        city: '',
        city_id: '',
      }));

      if (cityResp.data.data.length === 0) {
        setCities([]);
        setDatas({
          ...datas,
          state_id: stateId,
          city: '',
          city_id: '',
        });
        setCitySelectionOptional(true);
        return;
      }
      if (countryChanged) {
        setCountryChanged(false)
      }

      setDatas({ ...datas, state_id: stateId });
      setCities(cityResp.data.data);
      setCitySelectionOptional(false);
      setCityRequired(true);
    }
  };

  const [autocompleteCity, setAutocompleteCity] = useState(cities.find((city) => city.id === datas.city_id) || null);


  const [cityRequired, setCityRequired] = useState(false);
  const changeCity = async (e) => {
    if (!e || !e?.id) { 
      setDatas({
        ...datas,
        city: '',
        city_id: '',
      });
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your city",
      });
      return;
    }
    //const cityId = await e.target.value;
    const cityId =  e.id.toString();
    if (cityId === '' && !citySelectionOptional) {
      setDatas({
        ...datas,
        city: '',
        city_id: '',
      });
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your city",
      });
      return;
    }
    setStateChanged(false);
    if (cityId) {
      setDatas({ ...datas, city_id: cityId });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(datas.country_id);
    //console.log(cityRequired)
    if (countryChanged) {
      setDatas((prevDatas) => ({
        ...prevDatas,
        state: "",
        state_id: "",
        city: "",
        city_id: "",
      }));
      // console.log(datas,"countryChanged")
    }

    if (datas.country_id === "") {
      setDatas({
        ...datas,
        state: "",
        state_id: "",
        city: "",
        city_id: "",
      });
      //console.log(datas,"countryChanged 2")
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your country",
      });
      return;
    }

    if (datas.state_id === "" || states.length === 0) {
      //console.log(datas,"stateChanged")
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your state",
      });
      return;
    }
    if (stateChanged) {
      if (!datas.city_id || datas.city_id === "") {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: "Select your city",
        });
        return;
      }
      setDatas((prevDatas) => ({
        ...prevDatas,
        city: '',
        city_id: '',
      }));
      setCitySelectionOptional(false)
    }
    if (!citySelectionOptional && (!datas.city_id || datas.city_id === "")) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Please select your city"
      });
      return;
    }
    //console.log(datas.city_id)
    if ((datas.city_id === "" && !citySelectionOptional) || cities.length === 0) {
      //console.log(datas, "cityChanged")
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Select your city",
      });
      return;
    }
    if (stateChanged) {
      const selectedCity = cities.find(city => city.id === datas.city_id);
      if (!selectedCity || selectedCity.state_id !== individualStateId) {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: "Select your city",
        });
        return;
      }
    }
    if(enableProfessional === true && professionalData?.total_experience === ''){
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Please Select Total Experience",
      });
      return;
    }
    if(enableProfessional === true && professionalData?.availability === ''){
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Please Select Work Availability",
      });
      return;
    }

    if(professionalData.summary.length < 250 && (enableProfessional === true)){
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Summary should be atleast 250 characters",
      });
    }else if(((professionalData.primary_skill.trim() === "" ) || (workExperience[0].company_name.trim() === "" ) || (workExperience[0].designation.trim() === "" ) || (professionalData.summary.trim() === "" )) && (enableProfessional === true)){
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Please fill all the required fields",
      });
    }else if((datas.firstname === "" ) || (datas.lastname === "" ))
     {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Please fill all the required fields",
      });
    } else if (/^0/.test(datas.phone)) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Phone number cannot start with 0. Please enter a valid phone number.",
      });
      return;
    }else if (!/^[1-9][0-9]{6,15}$/.test(datas.phone)) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Please enter a valid phone number.",
      });
      return;
    } else {
      const formData = {
        username: datas.username,
        email: datas.email,
        firstname: datas.firstname,
        lastname: datas.lastname,
        phone: datas.phone,
        dob: datas.dob,
        gender: datas.gender,
        profile_picture: datas.profile_picture,
        address_line_1: datas.address_line_1,
        address_line_2: datas.address_line_2,
        country_id: datas.country_id,
        state_id: datas.state_id,
        city_id: datas.city_id,
        facebook: datas.facebook,
        google: datas.google,
        linkedin: datas.linkedin,
        twitter: datas.twitter,
        website: datas.website,
        organization_name: datas.organization_name,
        designation: datas.designation,
        highest_education: professionalData.education,
        total_experience: datas.total_experience,
        skills: datas.skills,
        user_preferences: {
          // looking_for_job_change: datas.looking_for_job_change === "YES" ? true : false,
          // profile_share: datas.profile_share === "YES" ? true : false,
          // user_certificates: certifications,
          secondary_skills: secondarySkills,
          // profile_hire: datas.profile_hire === "YES" ? true : false,
          // summary: datas.summary,
          enable_professional: enableProfessional,
        },
      };
      const formData2 = {
        data: {
          user_id: userId,
          summary: professionalData.summary,
          primary_skill: professionalData.primary_skill,
          skills: professionalData.skills,
          company_name: datas.organization_name,
          designation: datas.designation,
          education: professionalData.education,
          total_experience: professionalData.total_experience,
          city: datas.city_id,
          state: datas.state_id,
          country: datas.country_id,
          work_experience: workExperience,
          certifications: certifications,
          availability: professionalData.availability,
          public_profile: professionalData.public_profile,
          job_change: professionalData.job_change,
          profile_sharing: professionalData.profile_sharing,
          profile_hire: professionalData.profile_hire,
          // secondarySkills: secondarySkills,
          // verified: datas.verified,
          // active: datas.active,
        },
      };
      // console.log("formData2", formData2);
      const userToken = JSON.parse(cookie.get("userData")).data.token;
      const response = await axios.post(baseUrl + "/users/profiles/update", formData2, {
        headers: {
          Authorization: userToken,
        },
      });
      if (response && response.data.status && response.data.status === "success") {
        alertBox({
          type: "SUCCESS",
          title: "Success",
          msg: "Profile updated.",
        });
      }

      const response2 = await axios.put(baseUrl + "/users/profile/" + userId, formData);
      if (response2 && response2.data.status && response2.data.status === 1) {
        alertBox({
          type: "SUCCESS",
          title: "Success",
          msg: "Profile updated.",
        });
      }
    }
  };

  useEffect(() => {
    if(professionalData.skills.length === 0){
      addMoreSkills();
    }
    if(workExperience.length === 0){
      addMoreExperience();
    }
    getCertificate();
    // if(certifications.length === 0){
    //   addMoreCertificate();
    // }
  },[]);


  const openUploadImageModal = (e) => {
    e.preventDefault();
    setUploadModal(true);
  };

  const removeCertificateImg = (i) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setCertifications((prevState) => {
        let temp = [...prevState];
        temp[i].cert_img = "";
        return temp;
      }
      )
    }
  };

  // feedback PopUp
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(null);
  const [ratingSelected, setRatingSelected] = useState(false);

  const [feedback, setFeedback] = useState([
    {
      user_id: "",
      subscription_id: null,
      course_id: null,
      rating_count: null,
      rating_feedback: "",
      type: "",
      product_id: null,
    },
  ]);
  
  const handleClick = (value) => {
    setRating(value);
    setRatingSelected(true);
  };

  const handleRating = (index, type, productId) => {
    setFeedback(prevFeedback => {
      const feedbackIndex = prevFeedback.findIndex(item => item.type === type && item.product_id === productId);
      if (feedbackIndex !== -1) {
        const updatedFeedback = [...prevFeedback];
        updatedFeedback[feedbackIndex] = {
          ...updatedFeedback[feedbackIndex],
          rating_count: index + 1
        };
        return updatedFeedback;
      } else {
        return [
          ...prevFeedback,
          {
            user_id: subscriptionCompData?.userData?.id,
            subscription_id: type === "subscription" ? productId : null, 
            course_id: type === "course" ? productId : null, 
            rating_count: index + 1,
            rating_feedback: "",
            type,
            product_id: productId
          }
        ];
      }
    });
  };
  
  const handleSuggestion = (e, type, productId, ratingCount) => {
    const value = e.target.value;
    setFeedback(prevFeedback => {
      const feedbackIndex = prevFeedback.findIndex(item => item.type === type && item.product_id === productId);
      if (feedbackIndex !== -1) {
        const updatedFeedback = [...prevFeedback];
        updatedFeedback[feedbackIndex] = {
          ...updatedFeedback[feedbackIndex],
          rating_feedback: value,
      };
        return updatedFeedback;
      } else {
        return [
          ...prevFeedback,
          {
            user_id: subscriptionCompData?.userData?.id,
            subscription_id: type === "subscription" ? productId : null, 
            course_id: type === "course" ? productId : null, 
            rating_count: ratingCount,
            rating_feedback: value,
            type,
            product_id: productId
          }
        ];
      }
    });
  };

  const [jsxType, setJsxType] = useState("");
  const [jsxProductId, setJsxProductId] = useState(null);
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoString = thirtyDaysAgo.toISOString().split('T')[0];

  const checkSubscriptionAndFeedback = async () => {
    const activeSubscriptions = subscriptionCompData?.profile?.active_plans.filter((e) => {
      const startDateString = e.start_date.split('T')[0];
      return e.is_plan_active === true && startDateString === thirtyDaysAgoString;
    });
    if (activeSubscriptions && activeSubscriptions.length > 0) {

      for (const subscription of activeSubscriptions) {
        const hasFeedback = await checkFeedbackForSubscription(subscriptionCompData?.userData?.id, subscription.id);

        if (!hasFeedback) {

          feedbackPopUp("subscription", subscription.id);
          setJsxType("subscription");
          setJsxProductId(subscription.id)
          setShowFeedback(true);
        }
      }
    } else {
      let hasActiveOrders = false;
      let activeOrders = [];
    
      if (orders?.length > 0) {
        activeOrders = orders.filter((order) => {
          const orderDate = new Date(order.order_date).toISOString().split('T')[0];
          return orderDate === thirtyDaysAgoString;
        });

        hasActiveOrders = activeOrders?.length > 0;

        if (hasActiveOrders) {
          activeOrders?.map(async (e) => {
            const feedbackAvailable = await checkFeedbackForOrders(subscriptionCompData?.userData?.id, e.id);
            if (!feedbackAvailable) {
              feedbackPopUp("course", e.id);
              setJsxType("course");
              setJsxProductId(e.id)
              setShowFeedback(true);

            }
          })
        }
      }
    }
  };
  
  const checkFeedbackForSubscription = async (user_Id, subscriptionId) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/feedback/checkFeedback/?user_id=${user_Id}&type=subscription&product_id=${subscriptionId}`);
      return response.data.success; 
    } catch (error) {
      console.error("Error checking feedback:", error);
      return false;
    }
  };
  const checkFeedbackForOrders = async (user_Id, subscriptionId) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/feedback/checkFeedback/?user_id=${user_Id}&type=course&product_id=${subscriptionId}`);
      return response.data.success; 
    } catch (error) {
      console.error("Error checking feedback:", error);
      return false;
    }
  };

  useEffect(() => {
    checkSubscriptionAndFeedback();
  }, []);

  const submitFeedbackForm = async () => {
    if (rating == null) {
      setRatingSelected(false);
      return;
    }

    const currentFeedback = feedback.find(item => item.type === jsxType && item.product_id === jsxProductId);

    try {
      const response = await axios.post(`${BASE_URL}/users/feedback/createFeedback`, currentFeedback);

      if (response.data.message === "Feedback added successfully") {
        setShowFeedback(false);
        setShowThankYou(true);
      } else {
        console.error("Feedback submission failed:", response.data.message);
        setShowFeedback(false);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const getColorClass = (index) => {
    if (index + 1 <= 6) {
      return "rating_buttons_red";
    } else if (index + 1 <= 8) {
      return "rating_buttons_yellow";
    } else {
      return "rating_buttons_green";
    }
  };

  const feedbackPopUp = (type, productId) => {
    if (!type || !productId) {
      return null; 
    }
    return (
      <Dialog
        onClose={() => setShowFeedback(false)}
        open={showFeedback}
        className="feedback_dialog"
      >
        <DialogActions
          style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: 0 }}
        >
          <Button
            onClick={() => {
              setShowFeedback(false);
            }}
            style={{ color: "#000000", cursor: "pointer" }}
          >
            <CloseIcon />
          </Button>
        </DialogActions>

        <div>
          <img src={reviewPopUp_logo.src} alt="feedback_Logo" className="dialog-logo" />
        </div>

        <DialogTitle className="feedback_header">Rate your experience with us!</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography className="feedback_subheader">
            How likely are you to recommend WHIZLABS to your friends or colleagues? 
            </Typography>
            {/* {!ratingSelected && (<Typography style={{color:'red', fontFamily:"'Poppins', sans-serif", marginBottom:"1rem"}}>Please Select a rating</Typography>)} */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleClick(index + 1);
                    handleRating(index, type, productId);
                  }}
                  className={`rating_buttons ${getColorClass(index)} ${index + 1 === rating ? "selected" : ""}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
              <Typography className="rating_buttons_hints">1 - Extremely unlikely</Typography>
              <Typography className="rating_buttons_hints">10 - Extremely likely</Typography>
            </div>
            <div className="feedback_suggestions">
              <Typography className="feedback_suggestions_header">
                Your suggestions (Optional)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                onChange={(e) => {
                  handleSuggestion(e, type, productId,(rating+1));
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ color: "#FFFFFF", background: "#2aa0d1", textTransform: "none" }}
                onClick={() => submitFeedbackForm()}
              >
                Submit feedback
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  const [showThankYou, setShowThankYou] = useState(false);
  const feedbackReceivedPopUp = () => {
    return (
      <Dialog
        onClose={() => setShowThankYou(false)}
        open={showThankYou}
        className="feedback_thank_dialog"
      >
        <DialogActions
          style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: 0 }}
        >
          <Button
            onClick={() => setShowThankYou(false)}
            style={{ color: "#000000", cursor: "pointer" }}
          >
            <CloseIcon />
          </Button>
        </DialogActions>
        <div>
          <img src={feedback_thumbsUp_logo.src} alt="Thanks_Logo" className="dialog-logo" />
        </div>
        <DialogTitle className="feedback_thanks_header">
          Thank you for providing your valuable feedback!
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography className="feedback_thanks_subheader">
              Your input helps us to improve our services to better meet your needs.
              <br />
              We appreciate your time and commitment to improving your learning experience.
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      {tabActive && showFeedback && feedbackPopUp(jsxType, jsxProductId)}
      {showThankYou && feedbackReceivedPopUp()}
      <UploadImage
        uploadProcess={uploadProcess}
        onImageChange={onImageChange}
        openStatus={uploadModal}
        setUploadModal={setUploadModal}
      />
      <div id="myprofile" style={{ display: tabActive ? "block" : "none" }}>
        <div className="container">
          <div className="details-group">
            <div className="left">
              {/* <a href="/labs/challenge">
                <img
                  width={640}
                  height={200}
                  src="/images/my-acc-banner.png"
                  style={{
                    margin: "5px 0",
                    borderRadius: "6px",
                    maxWidth: "100%",
                  }}
                />
              </a> */}
              <div className="white-box personal">
                <div className="head-section">Personal Details</div>
                <form onSubmit={submitForm}>
                  <div className="user-section">
                    <figure style={{ maxWidth: "85px", maxHeight: "85px" }}>
                      <UserAvatar
                        img={datas.profile_picture}
                        alt={datas.firstname}
                        username={datas.firstname}
                        background={"#F98600"}
                      />
                      {/* <img
                        style={{ maxWidth: "85px", maxHeight: "85px" }}
                        className="img-full"
                        src={
                          datas.profile_picture
                            ? process.env.NEXT_PUBLIC_LEARN_MEDIA_URL + datas.profile_picture
                            : "/images/user-not-found.svg"
                        }
                        alt=""
                      /> */}
                    </figure>
                    <div className="btn-group">
                      <div
                        className="btn"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => openUploadImageModal(e)}
                      >
                        Edit photo
                      </div>
                      {/* <div
                        className="btn"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => onRemoveImage(e)}
                      >
                        Remove
                      </div> */}
                    </div>
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>
                        First Name<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        defaultValue={datas.firstname}
                        name="firstname"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="input-box">
                      <label>
                        Last Name<small>*</small>
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        defaultValue={datas.lastname}
                        name="lastname"
                        required
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="input-box">
                      <label>Phone</label>
                      <input
                        type="text"
                        placeholder="Add Phone"
                        defaultValue={datas.phone}
                        name="phone"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="input-box calender-blk">
                      <label>Date of Birth</label>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          sx={{
                            border: "#DDD",                          
                            "& input:focus": {
                              borderColor: "#fff !important",
                              boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                            },                                           
                          }}
                          onChange={(date) => changeDOB(date)}
                          minDate={moment(startDate)}
                          maxDate={moment()}
                          value={moment(datas.dob)}
                        />
                      </LocalizationProvider>
                      {/* <DatePicker
                        onChange={(date) => changeDOB(date)}
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        adjustDateOnChange
                        minDate={startDate}
                        maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        selected={new Date(datas.dob)}
                      /> */}
                    </div>
                    <div className="input-box">
                      <label>Gender</label>
                      <div className="rbtn-group">
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="gender"
                            value="M"
                            onChange={(e) => CheckBoxChange(e)}
                            defaultChecked={datas.gender === "M" ? true : false}
                          />
                          <span className="radio-style"></span>
                          <span className="name">Male</span>
                        </label>
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="gender"
                            value="F"
                            onChange={(e) => CheckBoxChange(e)}
                            defaultChecked={datas.gender === "F" ? true : false}
                          />
                          <span className="radio-style"></span>
                          <span className="name">Female</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="Address line one"
                        defaultValue={datas.address_line_1}
                        name="address_line_1"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="input-box">
                      <label>&nbsp;</label>
                      <input
                        type="text"
                        placeholder="Address line Two"
                        defaultValue={datas.address_line_2}
                        name="address_line_2"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="location-group-myprofile" style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom:"16px" }}>
                      <div
                        //className="input-box country"
                        style={{ width: '100%', marginRight: '1rem' }}
                      >
                        <label style={{ color: '#1F2430', fontWeight: "500" }}>
                          Country <small style={{color:"#FF615E"}}>*</small>
                        </label>
                        <div>
                          {/* <select onChange={(e) => changeCountry(e)} title="Select your country">
                          <option value="">Select Country </option>
                          {countries.map((item, i) => (
                            <option
                              key={i}
                              selected={datas.country_id === item.id ? true : false}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select> */}
                          <Autocomplete
                            className="country_without_border"
                            sx={{
                              "& input:focus": {
                                borderColor: "#fff !important",
                                boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                              },                      
                            }}
                            size="small"
                            autoHighlight
                            value={autocompleteCountry}
                            onChange={(event, newValue) => {
                              setAutocompleteCountry(newValue);
                              changeCountry(newValue);
                              setAutocompleteState(null)
                              setAutocompleteCity(null)
                            }}
                            options={countries}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            renderInput={(params) => (<TextField {...params} placeholder="Select Country"/>)}
                            PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                          />
                        </div>
                      </div>
                      {/* <div className="inputbox-25" style={{justifyContent:"space-between"}}> */}
                      <div
                        //className="input-box w-25" 
                        style={{ width: "100%", marginRight: '1rem' }}>
                        <label style={{ color: '#1F2430', fontWeight: "500" }}>
                          State <small style={{color:"#FF615E"}}>*</small>
                        </label>
                        <div>
                          {/* <select onChange={(e) => changeState(e)} title="Select your state">
                            <option value="">Select State</option>
                            {states.map((item, i) => (
                              <option
                                key={i}
                                selected={datas.state_id === item.id ? true : false}
                                value={item.id}
                              >
                                {item.name}
                              </option>
                            ))}
                          </select> */}
                          <Autocomplete
                            className="country_without_border"
                            sx={{
                              "& input:focus": {
                                borderColor: "#fff !important",
                                boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                              },                      
                            }}
                            size="small"
                            autoHighlight
                            value={autocompleteState}
                            onChange={(event, newValue) => {
                              setAutocompleteState(newValue);
                              changeState(newValue);
                              setAutocompleteCity(null)
                            }}
                            options={states}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            renderInput={(params) => (<TextField {...params} placeholder="Select State"/>)}
                            PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                            
                          />
                        </div>
                      </div>
                      <div
                        //className="input-box w-25"
                        style={{ width: "100%" }}>
                        <label style={{ color: '#1F2430', fontWeight: "500" }}>
                          City <small style={{color:"#FF615E"}}>*</small>
                        </label>
                        <div>
                          {/* <select onChange={(e) => changeCity(e)} title="Select your city">
                            <option value="">Select City</option>
                            {cities.map((item, i) => (
                              <option
                                key={i}
                                selected={datas.city_id === item.id ? true : false}
                                value={item.id}
                              >
                                {item.name}
                              </option>
                            ))}
                          </select> */}
                          <Autocomplete
                            className="country_without_border"
                            sx={{
                              "& input:focus": {
                                borderColor: "#fff !important",
                                boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                              },                      
                            }}
                            size="small"
                            autoHighlight
                            value={autocompleteCity}
                            onChange={(event, newValue) => {
                              setAutocompleteCity(newValue);
                              changeCity(newValue);
                            }}
                            options={cities}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            renderInput={(params) => (<TextField {...params} placeholder="Select City"/>)}
                            PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>Social Presence</label>
                      <label>Website</label>
                      <input
                        type="text"
                        placeholder="Website (http(s)://..)"
                        defaultValue={datas.website}
                        name="website"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="input-box" style={{ marginTop: "30px" }}>
                      <label>Linkedin</label>
                      <input
                        type="text"
                        placeholder="Add Linkedin Link"
                        defaultValue={datas.linkedin}
                        name="linkedin"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    <div className="input-box">
                      <label>Twitter</label>
                      <input
                        type="text"
                        placeholder="Add Twitter Link"
                        defaultValue={datas.twitter}
                        name="twitter"
                        onChange={(e) => InputChange(e)}
                      />
                    </div>
                    {/* <div className="input-box">
                      <label>Facebook</label>
                      <input
                        type="text"
                        placeholder="Add Facebook Link"
                        defaultValue={datas.facebook}
                        name="facebook"
                        onChange={(e) => InputChange(e)}
                      />
                    </div> */}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={enableProfessional}
                          onChange={() => setEnableProfessional(!enableProfessional)}
                          color="warning"
                        />
                      }
                      label="Add Professional Details"
                    />
                  </div>
                  { !enableProfessional ? (
                    <div className="footer-section">
                      <button type="submit" className="btn btn-save">
                        Save
                      </button>
                    </div>
                  ) : null }
                </form>
              </div>
              {/* <div className="white-box update-password">
                <div className="caption">
                  <figure>
                    <img className="img-full" src="/images/key.svg" alt="" />
                  </figure>
                  <p>Want to update you Account Password?</p>
                </div>
                <div className="btn btn-update" onClick={goToTab} style={{ cursor: "pointer" }}>
                  Update Now
                </div>
              </div> */}
            </div>

            <div className="right">
              <div
                className="white-box professional"
                style={{ display: enableProfessional ? "block" : "none"}}
              >
                <div className="head-section">Professional Details</div>
                <form onSubmit={submitForm}>
                  <div className="input-box-group">
                    <div className="input-box full">
                      <label>
                        Summary<small>*</small>
                      </label>
                      <textarea
                        required
                        placeholder="Add Profile Summary (Min 250 characters)"
                        value={professionalData.summary}
                        name="summary"
                        minLength={250}
                        maxLength={600}
                        onChange={(e) => {setProfessionalData({...professionalData, summary: e.target.value})}}
                      ></textarea>
                    </div>
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>
                        Primary Skill<small>*</small>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Add Primary Skill"
                        value={professionalData.primary_skill}
                        name="skills"
                        onChange={(e) => {setProfessionalData({...professionalData, primary_skill: e.target.value})}}
                      />
                    </div>
                    {professionalData?.skills?.map((x, i) => (
                      <>
                        <div className="addmore-box">
                          <div className="input-box">
                            <label>Secondary Skill</label>
                            <input
                              type="text"
                              placeholder="Add Skill"
                              name="skill"
                              value={x.skill}
                              onChange={(event) => changeSkills(event, i)}
                            />
                            {professionalData.skills.length > 1 && (
                              <span className="btn-addmore" onClick={() => removeSkills(i)}>
                                - Remove
                              </span>
                            )}
                            {professionalData.skills.length - 1 === i && (
                              <span
                                className="btn-addmore"
                                style={{ marginLeft: "10px" }}
                                onClick={() => addMoreSkills()}
                              >
                                + Add More
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                    {professionalData?.skills?.length === 0 && (
                      <div className="input-box">
                        <div
                          className="btn-addmore"
                          style={{ margin: "10px 10px", cursor: "pointer" }}
                          onClick={() => addMoreSkills()}
                        >
                          + Add Secondary Skill
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>Highest Education<small>*</small></label>
                      <input
                        type="text"
                        required
                        placeholder="Add Education"
                        defaultValue={professionalData.education}
                        name="education"
                        onChange={(e) => {setProfessionalData({...professionalData, education: e.target.value})}}
                      />
                    </div>
                    <div className="input-box">                      
                    </div>
                    <div className="input-box">
                      <label>Total Experience<small>*</small></label>
                      {/* <select
                        required
                        name="experience"
                        defaultValue={professionalData.total_experience}
                        onChange={(e) => {setProfessionalData({...professionalData, total_experience: e.target.value})}}
                      >
                        <option value="">Select</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="2-3 Years">2-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5-7 Years">5-7 Years</option>
                        <option value="7-10 Years">7-10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select> */}
                      <Autocomplete
                        className="country_without_border"
                        sx={{
                          "& input:focus": {
                            borderColor: "#fff !important",
                            boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                          },                      
                        }}
                        size="small"
                        autoHighlight
                        value={ExperienceOptions.find(option => option.name === totalExperience)|| null}
                        onChange={handleExperienceChange}
                        options={ExperienceOptions}
                        getOptionLabel={(option) => {
                          return option.name;
                        }}
                        renderInput={(params) => (<TextField {...params} />)}
                        PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                      />
                    </div>
                    
                    <div className="input-box">                      
                    </div>
                    {/* <input
                        type="text"
                        required
                        placeholder="Add Education"
                        defaultValue={professionalData.total_experience}
                        name="total_experience"
                        onChange={(e) => {setProfessionalData({...professionalData, total_experience: e.target.value})}}
                      />
                    </div> */}
                    <div className="input-box">
                      <label>Work Availability<small>*</small></label>
                      {/* <select
                        required
                        name="vailability"
                        defaultValue={professionalData.availability}
                        onChange={(e) => {setProfessionalData({...professionalData, availability: e.target.value})}}
                      >
                        <option value="">Select</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Full-Time">Full Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Contract">Contract</option>
                      </select> */}
                      <Autocomplete
                        className="country_without_border"
                        sx={{
                          "& input:focus": {
                            borderColor: "#fff !important",
                            boxShadow: "0 0 0 4px rgb(255, 255, 255)" 
                          },                      
                        }}
                        size="small"
                        autoHighlight
                        value={AvailabilityOptions.find(option => option.name === availability) || null}
                        onChange={handleAvailabilityChange}
                        options={AvailabilityOptions}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        PaperComponent={({ children }) => (<Paper style={{ border: '2px solid #d3d3d3' }}>{children}</Paper>)}
                      />
                    </div>
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>Work Experience<small>*</small></label>
                    </div>
                    <div className="addmore-box">
                      {workExperience.map((item, i) => (
                        <>
                          <div className="input-box"  style={{ marginTop: "10px" }}>
                            <label>Company Name<small>*</small></label>
                            <input
                              type="text"
                              required
                              placeholder="Company Name"
                              defaultValue={item.company_name}
                              name="company_name"
                              onChange={(e) => changeExperience(e, i)}
                            />
                          </div>
                          <div className="input-box"  style={{ marginTop: "10px" }}>
                            <label>Designation<small>*</small></label>
                            <input
                              type="text"
                              required
                              placeholder="Designation"
                              defaultValue={item.designation}
                              name="designation"
                              onChange={(e) => changeExperience(e, i)}
                            />
                          </div>
                          <div className="input-box calender-blk" style={{ marginTop: "10px" }}>
                            <label>
                              Start Date<small>*</small>
                            </label>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DatePicker
                                sx={{
                                  border: "#DDD",
                                }}
                                onChange={(date) => {
                                  setWorkExperience((prevState) => {
                                    let temp = [...prevState];
                                    temp[i].start_date = date.utc().toDate();
                                    return temp;
                                  })
                                }}
                                minDate={moment(startDate)}
                                maxDate={moment()}
                                value={moment(item.start_date)}
                              />
                            </LocalizationProvider>
                            {/* <DatePicker
                                name="start_date"
                                selected={new Date(item.start_date)}
                                onChange={(e) =>
                                  setWorkExperience((prevState) => {
                                    let temp = [...prevState];
                                    temp[i].start_date = e;
                                    return temp;
                                  })
                                }
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                adjustDateOnChange
                                dateFormat="dd/MM/yyyy"
                                minDate={startDate}
                                maxDate={new Date()}
                              /> */}
                          </div>
                          <div className="input-box calender-blk" style={{ marginTop: "10px" }}>
                            <label>
                              {" "}
                              End Date<small>*</small>{" "}
                            </label>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DatePicker
                                sx={{
                                  border: "#DDD",
                                }}
                                onChange={(date) => {
                                  setWorkExperience((prevState) => {
                                    let temp = [...prevState];
                                    temp[i].end_date = date.utc().toDate();
                                    return temp;
                                  })
                                }}
                                minDate={moment(startDate)}
                                maxDate={moment()}
                                value={item.currently_working ? moment() : moment(item.end_date)}
                              />
                            </LocalizationProvider>
                            {/* <DatePicker
                                // disabled={item.currently_working}
                                name="end_date"
                                selected={item.currently_working ? new Date() : new Date(item.end_date)}
                                style={{ color: "black" }}
                                onChange={(e) =>
                                  setWorkExperience((prevState) => {
                                    let temp = [...prevState];
                                    temp[i].end_date = e;
                                    return temp;
                                  })
                                }
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                adjustDateOnChange
                                dateFormat="dd/MM/yyyy"
                                minDate={startDate}
                                maxDate={new Date()}
                              /> */}
                          </div>
                          <div className="input-box" style={{ marginTop: "10px" }}>
                            <input
                              type="checkbox"
                              name="currently_working"
                              checked={item.currently_working}
                              onChange={(e) =>
                                setWorkExperience((prevState) => {
                                  let temp = [...prevState];
                                  temp[i].currently_working = e.target.checked;
                                  return temp;
                                })
                              }
                            />
                            <span>current</span>
                          </div>
                          {workExperience.length > 1 && (
                            <span
                              className="btn-addmore"
                              style={{ marginLeft: "10px", cursor: "pointer", color: "#f98600" }}
                              onClick={() => removeExperience(i)}
                            >
                              - Remove
                            </span>
                          )}
                          {workExperience.length > 1 && i === workExperience.length - 1 && (
                            <span
                              className="btn-addmore"
                              style={{ marginLeft: "10px", cursor: "pointer", color: "#f98600" }}
                              onClick={() => addMoreExperience()}
                            >
                              + Add More
                            </span>
                          )}
                        </>
                      ))}
                      {workExperience.length === 1  && (
                        <span
                          className="btn-addmore"
                          style={{ marginLeft: "10px", cursor: "pointer", color: "#f98600" }}
                          onClick={() => addMoreExperience()}
                        >
                          + Add Experience
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>Certifications</label>
                    </div>
                    <div className="addmore-box">
                      {certifications &&
                        certifications?.map((x, i) => (
                          <>
                            <div className="input-box" style={{ marginTop: "10px" }}>
                              <label>Certification Provider</label>
                              <select
                                name="certification_provider"
                                value={x.certification_provider}
                                onChange={(e) => {
                                  changeCertificate(e, i);
                                }}
                              >
                                <option value="">Select Certification Provider</option>
                                {certProviders.map((item) => (
                                  <option value={item.provider}>{item.provider}</option>
                                ))}
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            {x.certification_provider !== "Other" && (
                              <div className="input-box" style={{ marginTop: "10px" }}>
                                <label>Certification Name</label>
                                <select name="certification_type"
                                  value={x.certification_type}
                                  onChange={(e) => changeCertificate(e, i)}>
                                  <option value="">Select Certification Name</option>
                                  {
                                    certList .filter((item) => item.provider === x.certification_provider)
                                    .map((item) => (
                                      <option value={item.certification_name}>{item.certification_name}</option>
                                    ))
                                    }
                                </select>
                              </div>
                            )}
                            {x.certification_provider === "Other" && (
                              <div className="input-box" style={{ marginTop: "10px" }}>
                                <label>Certification Name</label>
                                <input type="text" name="certification_type" value={x.certification_type} onChange={(e) => changeCertificate(e, i)} />
                              </div>
                            )}
                            <div className="input-box calender-blk" style={{ marginTop: "10px" }}>
                              <label>Achieved On</label>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                  sx={{
                                    border: "#DDD",
                                  }}
                                  onChange={(date) => {
                                    setCertifications((prevState) => {
                                      let temp = [...prevState];
                                      temp[i].start_date = date.utc().toDate();
                                      return temp;
                                    })
                                  }}
                                  maxDate={moment()}
                                  value={moment(x.start_date)}
                                />
                              </LocalizationProvider>
                              {/* <DatePicker
                              name="start_date"
                              selected={new Date(x.start_date)}                              
                              onChange={(e) =>
                                setCertifications((prevState) => {
                                  let temp = [...prevState];
                                  temp[i].start_date = e;
                                  return temp;
                                })
                              }
                              // required
                              dropdownMode="select"
                              showMonthDropdown
                              showYearDropdown
                              adjustDateOnChange
                              dateFormat="dd/MM/yyyy"
                              maxDate={new Date()}
                            /> */}
                            </div>
                            {/* <div className="input-box calender-blk" style={{ marginTop: "10px" }}>
                            <label>Date Expires</label>
                            <DatePicker
                              name="end_date"
                              // required
                              disabled={x.no_expiry}
                              selected={x.no_expiry ? new Date() : new Date(x.end_date)}
                              onChange={(e) =>
                                setCertifications((prevState) => {
                                  let temp = [...prevState];
                                  temp[i].end_date = e;
                                  return temp;
                                })
                              }
                              dropdownMode="select"
                              showMonthDropdown
                              showYearDropdown
                              adjustDateOnChange
                              dateFormat="dd/MM/yyyy"
                              // maxDate={new Date()}
                            />
                            <div style={{ marginTop: "10px" }}>
                              <input
                                type="checkbox"
                                name="no_expiry"
                                checked={x.no_expiry}
                                onChange={(e) =>
                                  setCertifications((prevState) => {
                                    let temp = [...prevState];
                                    temp[i].no_expiry = e.target.checked;
                                    return temp;
                                  })
                                }
                              />
                              <span>Never Expire</span>
                            </div>
                          </div> */}
                            {/* <div className="input-box"  style={{ marginTop: "10px" }}>
                            <label>Certificate ID</label>
                            <input
                              type="text"
                              placeholder="Certificate ID"
                              value={x.certificate_id}
                              name="certificate_id"
                              onChange={(e) => changeCertificate(e, i)}
                            />
                          </div> */}
                            <div className="input-box" style={{ marginTop: "10px", marginLeft: "20px" }}>
                              <label>Certification URL (Optional)</label>
                              <input
                                type="text"
                                placeholder="URL"
                                value={x.url}
                                name="url"
                                onChange={(e) => changeCertificate(e, i)}
                              />
                            </div>
                            {x.cert_img ? (
                              <div className="input-box">
                                <div>Certificate Already Uploaded <Tooltip title="View Certificate" arrow>
                                    {/* <a href={MEDIA_URL + x.cert_img} target="_blank" rel="noreferrer" > */}
                                    <IconButton>
                                      <Visibility color="primary" fontSize="small" onClick={() => { setCertPreview({ name: x.certification_type, url: MEDIA_URL + x.cert_img, issued_date: x.start_date, }); setOpenCert(true)}} />
                                    </IconButton>
                                    {/* </a> */}
                                  </Tooltip>
                                  <Tooltip title="Remove Certificate" arrow>
                                    <IconButton>
                                      <DeleteIcon color="secondary" fontSize="small" onClick={() => 
                                        removeCertificateImg(i)} />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </div>
                            ) : (
                              <div className="input-box" style={{ marginTop: "10px" }}>
                                <label>Upload Certificate</label>
                                <input
                                  type="file"
                                  name="certificate_file"
                                  onChange={(e) => handleUploadImage(e, i)}
                                />
                              </div>
                            )}
                            { certifications.length > 0 && (
                              <span className="btn-addmore"
                                style={{ marginLeft: "10px", cursor: "pointer", color: "#f98600" }}
                                onClick={() => removeCertificate(i)}>
                                - Remove
                              </span>
                            )}
                            { certifications.length > 0 && i === certifications.length - 1 && (
                              <span
                                className="btn-addmore"
                                style={{ marginLeft: "10px", cursor: "pointer", color: "#f98600" }}
                                onClick={() => addMoreCertificate()}
                              >
                                + Add More
                              </span>)}
                          </>
                        ))}

                      {certifications?.length === 0  && (
                        <span
                          className="btn-addmore"
                          style={{ marginLeft: "10px", cursor: "pointer", color: "#f98600" }}
                          onClick={() => addMoreCertificate()}
                        >
                          + Add Certification
                        </span>)}
                    </div>
                  </div>
                  <div className="input-box-group">
                    <div className="input-box input-radio full">
                      <label>Are you looking for job change?</label>
                      <div className="rbtn-group">
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            defaultChecked={professionalData.job_change === true ? true : false}
                            name="job_change"
                            value="YES"
                            onChange={(e) => {setProfessionalData({...professionalData, job_change: true})}}
                          />
                          <span className="radio-style"></span>
                          <span className="name">Yes</span>
                        </label>
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="job_change"
                            defaultChecked={professionalData.job_change === false ? true : false}
                            value="NO"
                            onChange={(e) => {setProfessionalData({...professionalData, job_change: false})}}
                          />
                          <span className="radio-style"></span>
                          <span className="name">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="input-box input-radio full">
                      <label>
                        Would you be interested if Whizlabs share your profile to Employers for job
                        openings?
                      </label>
                      <div className="rbtn-group">
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="profile_sharing"
                            defaultChecked={professionalData.profile_sharing === true ? true : false}
                            value="YES"
                            onChange={(e) => {setProfessionalData({...professionalData, profile_sharing: true})}}
                          />
                          <span className="radio-style"></span>
                          <span className="name">Yes</span>
                        </label>
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="profile_sharing"
                            defaultChecked={professionalData.profile_sharing === false ? true : false}
                            value="NO"
                            onChange={(e) => {setProfessionalData({...professionalData, profile_sharing: false})}}
                          />
                          <span className="radio-style"></span>
                          <span className="name">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="input-box input-radio full">
                      <label>Make my profile visible to hiring/recruitment</label>
                      <div className="rbtn-group">
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="profile_hire"
                            defaultChecked={professionalData.public_profile === true ? true : false}
                            value="YES"
                            onChange={(e) => {setProfessionalData({...professionalData, public_profile: true})}}
                          />
                          <span className="radio-style"></span>
                          <span className="name">Yes</span>
                        </label>
                        <label className="custom-radiobutton">
                          <input
                            type="radio"
                            name="profile_hire"
                            defaultChecked={professionalData.public_profile === false ? true : false}
                            value="NO"
                            onChange={(e) => {setProfessionalData({...professionalData, public_profile: false})}}
                          />
                          <span className="radio-style"></span>
                          <span className="name">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="footer-section">
                    <button type="submit" className="btn btn-save">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openCert} onClose={()=>setOpenCert(!openCert)} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <Box sx={{ marginTop: 20, width: 700, bgcolor: 'background.paper', boxShadow: 24, p: 2, borderRadius: '10px' }}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Typography>Issued on: {moment(certPreview.issued_date).format('DD MMM YYYY')}</Typography>
          <IconButton>
            <CloseIcon onClick={()=>setOpenCert(!openCert)} />
          </IconButton>
        </div>
        <Box style={{textAlign: 'center'}}>
            <Typography variant="h6" component="h2" align='center'>{certPreview.name}</Typography>
            <br />
            <div className="modal-content">
              {certPreview.url.includes('.pdf') ? (
              <iframe src={certPreview.url} width="600" height="400" title="Certificate">
              </iframe>) : (
              <img src={certPreview.url} alt="Certificate" width={600} />
              )}
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MyProfile;
