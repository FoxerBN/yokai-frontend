import React from 'react';
import HeroSection from '../sections/homepage/HeroSection';
import FeaturedSection from '../sections/homepage/FeaturedSection';
import CategoriesSection from '../sections/homepage/CategoriesSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
    </>
  );
};

export default HomePage;