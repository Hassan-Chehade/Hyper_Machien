import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Types from "../components/Types";
import Services from "../components/Services";
import Products from "../components/Products";
import Banner from "../components/Banner";
import Reviews from "../components/Reviews";
import Insta from "../components/Insta";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Types />
      <Services />
      <Products />
      <Banner />
      <Reviews />
      <Insta />
      <Footer />
    </>
  );
}

export default Home;
