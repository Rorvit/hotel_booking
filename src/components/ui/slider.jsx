import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Slider = ({ autoscroll, interval }) => {
  const images = [
    {
      title: "Slide 1",
      src: "https://images.pexels.com/photos/1708601/pexels-photo-1708601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      title: "Slide 2",
      src: "https://images.pexels.com/photos/9211816/pexels-photo-9211816.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
      title: "Slide 3",
      src: "https://images.pexels.com/photos/5775055/pexels-photo-5775055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },

    {
      title: "Slide 4",
      src: "https://images.pexels.com/photos/2403402/pexels-photo-2403402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];
  const [currectIndex, setCurrectIndex] = useState(0);
  const timerId = useRef();

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  });

  const timer = () => {
    nextHandler();
    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(timer, interval);
  };

  const restartTimer = () => {
    if (autoscroll) {
      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(timer, interval);
    }
  };

  const prevHandler = () => {
    if (currectIndex === 0) {
      setCurrectIndex(images.length - 1);
    } else {
      setCurrectIndex(currectIndex - 1);
    }
    restartTimer();
  };

  const nextHandler = () => {
    setCurrectIndex((prevState) => {
      if (prevState === images.length - 1) {
        return 0;
      } else {
        return prevState + 1;
      }
    });
    restartTimer();
  };

  const setSlideHandler = (index) => {
    setCurrectIndex(index);
    restartTimer();
  };

  return (
    <div className="m-20 container">
      <div>
        <div className="carousel slide">
          <div className="carousel-indicators">
            {images.map((image, i) => (
              <button
                key={i}
                type="button"
                className={i === currectIndex ? "active" : ""}
                data-bs-target="#carouselExampleCaptions"
                onClick={() => setSlideHandler(i)}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {images.map((image, i) => (
              <div
                key={i}
                className={
                  "carousel-item" + (i === currectIndex ? " active" : "")
                }
              >
                <div className="w-80 h-80">
                  <img src={image.src} className="img-fluid " alt="" />
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <h5>{image.title}</h5>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            onClick={prevHandler}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={nextHandler}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
Slider.defaultProps = {
  autoscroll: true,
  interval: 5000,
};
Slider.propTypes = {
  autoscroll: PropTypes.bool,
  interval: PropTypes.number,
};

export default Slider;
