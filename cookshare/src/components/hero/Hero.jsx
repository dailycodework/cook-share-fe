import React from "react";
import { Link } from "react-router-dom";
import HeroImageSlider from "./HeroImageSlider";

const Hero = () => {
  return (
    <div className='hero'>
      <HeroImageSlider />
      <div className='hero-content'>
        <h1 className='hero-title'>Welcome to CookShare!</h1>
        <p className='hero-sub-title'>
          Your go-to platform for sharing an discovering delicious recipes
        </p>
        <Link className='hero-button'>Explore recipes for your next meal!</Link>
      </div>
    </div>
  );
};

export default Hero;
