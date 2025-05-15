import React, { useState, useEffect } from "react";
import styles from '../../pages/pricing/Subscription.module.css'
const Brands = ({ data, custom_title = null, moreData = [] }) => {
  const [isMoreVisible, setMoreVisibility] = useState(false);
  const [buttonText, setButtonText] = useState("View More");
  const toggleMoreVisibility = () => {
    setMoreVisibility(!isMoreVisible);
    setButtonText(isMoreVisible ? "View More" : "View Less");
  };

  const [alldata,setAlldata] = useState([...data,...moreData])

  const [hoveData,setHoverData] = useState(-10)



  // useEffect(() => {
  //   const moreSlideElement = document.getElementById("more-slide");
  //   const moreLogoElement = document.getElementById("more-logo");

  //   if (moreSlideElement && moreLogoElement) {
  //     moreSlideElement.classList.toggle("visible", isMoreVisible);
  //     moreLogoElement.classList.toggle("space", isMoreVisible);
  //   }

  //   const animateSlide = () => {
  //     if (moreSlideElement) {
  //       moreSlideElement.style.display = "block";
  //       moreSlideElement.style.overflow = "hidden";
  //       moreSlideElement.style.transition = "height 2s ease";

  //       const originalHeight = moreSlideElement.scrollHeight;
  //       let height = isMoreVisible ? 0 : originalHeight;
  //       const animate = () => {
  //         if ((isMoreVisible && height < originalHeight) || (!isMoreVisible && height > 0)) {
  //           moreSlideElement.style.height = isMoreVisible ? height + 20 + "px" : height - 20 + "px";
  //           height += isMoreVisible ? 20 : -20;

  //           requestAnimationFrame(animate);
  //         } else {
  //           if (!isMoreVisible) {
  //             setTimeout(() => {
  //               moreSlideElement.style.display = "none";
  //             }, 2000);
  //           }
  //           moreSlideElement.style.height = isMoreVisible ? originalHeight + "px" : "0";
  //         }
  //       };

  //       animate();
  //     }
  //   };

  //   animateSlide();

  //   // Cleanup function
  //   return () => {
  //     if (moreSlideElement) {
  //       moreSlideElement.style.transition = ""; // Remove transition on unmount if needed
  //     }
  //     // Perform additional cleanup here (remove event listeners, etc.)
  //   };
  // }, [isMoreVisible]);
  return (
    <>
      {/* <!-- brands-block --> */}
      <div className="brands-block" id="brands-block">
        <div className="container">
         
          {custom_title ? (
            <div className="title">{custom_title}</div>
          ) : (
            <div className="title">
              We are blessed with some amazing clients. Here are just a few!
            </div>
          )}
          <div className="brand-logoes">
            {!alldata ? (
              <>Loading...</>
            ) : (
              alldata.map((brand,idx) => {
               if(idx < 12){
                return <>
                <div className={`${styles.brandsbox}`} >
                                      <figure key={brand.idx}>
                                        <>
                    <img className={`img-full ${styles.img1}`} id={`${idx}`}  src={brand.imgUrl} alt="brand" />
                    <img className={`img-full ${styles.img2}`}
                     id={`${idx}`}  src={`/images/${brand.alt}.png`} alt="brand" />
                    </>
                  </figure>
                </div>
                </>
               }
              })
            )}
          </div>
          
 
          {/* <div className="moreless-button" onClick={toggleMoreVisibility}>
            {buttonText}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Brands;
