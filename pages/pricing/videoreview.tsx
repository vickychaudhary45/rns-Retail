import next from "next"
// import "../../public/images/play-border.png"
import { useState } from "react";
import styles from "./Subscription.module.css"
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
import { VideoReviewModal } from "@/components/shared/Modals";

const VideoReview = () =>{
const [activeVideoUrl, setActiveVideoUrl] = useState(null);

const openVideoModal = (url) => {
    document.body.classList.add("open-modal-review-video");
    setActiveVideoUrl(url);
};

    const datas = [
        {
            thumbnail: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "learners_1.webp",
            VUrl:"https://www.youtube.com/embed/O4lC2QZ28D8",
            name:"Daniel",
            role:"AWS Certified Developer Associate"
        },
        {
            thumbnail: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "learners_2.webp",
            VUrl:"https://www.youtube.com/embed/HDKi-4ISvvo",
            name:"Karthick",
            role:"AWS Certified Solutions Architect Associate"
        },
        {
            thumbnail: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "learners_3.webp",
            VUrl:"https://www.youtube.com/embed/75HgZTcef3Y",
            name:"Krishna",
            role:"AWS Certified Cloud Practitioner"
        },
        {
            thumbnail: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "learners_4.webp",
            VUrl:"https://www.youtube.com/embed/iFbeWbZZ9FU",
            name:"Casey",
            role:"Microsoft Certified: Azure Fundamentals"
        },
    ]
    return (
      <div>
        <VideoReviewModal videoUrl={activeVideoUrl} />
        <div className="container">
          {/* <h2>Why do our Learners love us?</h2>
                <div className="learners" >
                    {datas && datas.map((item, i) => (
                        <div className="learner-box" key={i}>
                          <figure className="main-img"><img className="img-full" src={item.thumbnail} alt=""/></figure>
                          <figure className="play-icon" id="playIcon"><a className="learner keen-slider__slide" onClick={()=>openVideoModal(item.VUrl)} target="_blank"><img className="img-full" src={"/images/play-border.png"} alt=""/></a></figure>
                          <div className="user-block"></div> 
                          <div className="gradient"></div>
                        </div>
                    ))}	
                </div> */}
          <div className={styles.learners_title}>Why do our Learners love us?</div>
          <div className={styles.learner_box}>
            {datas &&
              datas.map((itm) => {
                return (
                  <>
                    <div className={styles.learner}>
                        <img className="img-full" src={itm.thumbnail} alt=""></img>
                        <figure className={styles.playIcon} id="playIcon">
                          <a className="learner" onClick={()=>openVideoModal(itm.VUrl)} target="_blank">
                            <img className="img-full" src={"/images/play-border.png"} alt=""/></a></figure>
                        <div className={styles.learner_name}>
                            <div className={styles.name_title}>{itm.name}
                            <div className={styles.role}>{itm.role}</div>
                            </div>
                            
                        </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    );
}

export default VideoReview;