import React, { useState } from "react";
import { VideoReviewModal } from "@/components/shared/Modals";
import Image from "next/image";
function TestimonialsBlock() {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const openVideoModal = (url) => {
    document.body.classList.add("open-modal-review-video");
    setActiveVideoUrl(url);
  };
  const datas = [
    {
      thumbnail: "Daniel-whizlabs-review.webp",
      VUrl: "https://www.youtube.com/embed/O4lC2QZ28D8",
      ialt: "daniel about his learning experience in whizlabs platform",
    },
    {
      thumbnail: "karthik-whizlabs-review.webp",
      VUrl: "https://www.youtube.com/embed/HDKi-4ISvvo",
      ialt: "karthik shares his review about whizlabs courses",
    },
    {
      thumbnail: "krishna-whizlabs-review.webp",
      VUrl: "https://www.youtube.com/embed/75HgZTcef3Y",
      ialt: "krishna shares his experience about the quality of whizlabs courses",
    },
    {
      thumbnail: "casey-whizlabs-review.webp",
      VUrl: "https://www.youtube.com/embed/iFbeWbZZ9FU",
      ialt: "casey shares her feedback on whizlabs training materials",
    },
  ];
  return (
    <>
      <div className="testimonialContainer" style={{ position: "relative" }}>
        <h4>Global Learners</h4>
        <div className="reviewsectionleft">
          <Image
            width={1000}
            height={1000}
            // layout="responsive"
            style={{
              width: "100%",
              height: "100%",
            }}
            src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-reviews.webp`}
            alt="whizlabs is the most trusted upskilling platform for your workforce"
          />
        </div>
        {/* <div className="testimonialwrapper">
          <VideoReviewModal videoUrl={activeVideoUrl} />
          <div className="container">
            <div className="learners">
              {datas &&
                datas.map((item, i) => (
                  <div className="learner-box" key={i}>
                    <figure className="main-img">
                      <Image
                        width={1000}
                        height={1000}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="img-full"
                        src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}${item.thumbnail}`}
                        alt={item.ialt}
                      />
                    </figure>
                    <figure className="play-icon" id="playIcon">
                      <a
                        className="learner keen-slider__slide"
                        onClick={() => openVideoModal(item.VUrl)}
                        target="_blank"
                      >
                        <Image
                          width={1000}
                          height={1000}
                          // layout="responsive"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          className="img-full"
                          src={"/images/play-border.png"}
                          alt=""
                        />
                      </a>
                    </figure>
                    <div className="user-block"></div>
                    <div className="gradient"></div>
                  </div>
                ))}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default TestimonialsBlock;
