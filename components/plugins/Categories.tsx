import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

const Categories = ({ data }) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width > 1023) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
    }
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: isBreakpoint ? 1 : 5,
      spacing: 5,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      {/* <!-- explore-catogary --> */}
      <div className="explore-category">
        <div className="container" style={{ position: "relative" }}>
          <div className="block-heading">
            <h2>Explore by Category</h2>
            <Link legacyBehavior href="/library/">
              <a target="_blank">
                Browse All<i className="icon-font-arrow-right"></i>
              </a>
            </Link>
          </div>
          <div className="category-group keen-slider" ref={sliderRef}>
            {data.map((cat) => (
              // <Link legacyBehavior  href={"/" + cat.slug + "/"} key={cat.id}>
              <div
                className="category keen-slider__slide"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`/${cat.slug}/`);
                }}
              >
                <div className="title">{cat.title}</div>
                <figure>
                  <img className="img-full" src={cat.imgUrl} alt={cat.title} />
                </figure>
                <hr />
                <p>{cat.content}</p>
              </div>
              // </Link>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <div className="dots">
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
