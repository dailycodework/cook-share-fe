import React from "react";
import HeroImageSlider from "./HeroImageSlider";
import CustomLink from "../common/CustomLink";

const Hero = () => {
  return (
    <div className='hero'>
      <HeroImageSlider />
      <div className='hero-content'>
        <h1 className='hero-title'>Welcome to CookShare!</h1>
        <p className='hero-sub-title'>
          Your go-to platform for sharing an discovering delicious recipes
        </p>
        <CustomLink
          to='explore'
          className='hero-button'
          style={{ cursor: "pointer" }}>
          Explore recipes for your next meal!
        </CustomLink>
      </div>
    </div>
  );
};

export default Hero;
