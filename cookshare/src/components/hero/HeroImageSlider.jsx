import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import c1 from "../../assets/images/cover1.png";
import c2 from "../../assets/images/cover2.jpg";
import c3 from "../../assets/images/cover3.jpg";
import c4 from "../../assets/images/cover4.jpg";
import c5 from "../../assets/images/cover5.jpg";

const images = [c1, c2, c3, c4, c5];

const HeroImageSlider = () => {
  const settings = {
    duration: 10000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className='slide-container'>
      <Fade {...settings}>
        {images.map((image, index) => (
          <div key={index} className='each-fade'>
            <div className='image-container'>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default HeroImageSlider;
