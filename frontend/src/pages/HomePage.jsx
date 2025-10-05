import React from "react";
import Header from "@/components/Header";
import { useAuthStore } from "@/stores/useAuthStore";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import GenreSection from "@/components/home/GenreSection";
import FeaturedAuthorsSection from "@/components/home/FeaturedAuthorsSection";
import BookSection from "@/components/BookSection";

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto p-6">
        <HeroSection authUser={authUser} />
        <BookSection />
        <StatsSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <GenreSection />
          <FeaturedAuthorsSection />
        </div>
        <BookSection genre="philosophy-religion" />
        <BookSection genre="romance" />
        <BookSection genre="fiction" />
      </div>
    </>
  );
};

export default HomePage;
