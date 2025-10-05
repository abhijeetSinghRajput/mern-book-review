import React from 'react'
import { TrendingUp } from "lucide-react";
import SectionContainer from "./SectionContainer";
import GenreCard from "./GenreCard";

const GenreSection = () => {
  const genres = [
    { value: "fiction", label: "Fiction", count: 40, color: "bg-blue-500" },
    { value: "non-fiction", label: "Non-fiction", count: 18, color: "bg-green-500" },
    { value: "romance", label: "Romance", count: 9, color: "bg-pink-500" },
    { value: "children-ya", label: "Children & YA", count: 22, color: "bg-purple-500" },
    { value: "health-lifestyle", label: "Health & Lifestyle", count: 10, color: "bg-teal-500" },
    { value: "philosophy-religion", label: "Philosophy & Religion", count: 4, color: "bg-indigo-500" },
    { value: "business-economics", label: "Business & Economics", count: 2, color: "bg-orange-500" },
  ];

  return (
    <SectionContainer
      icon={<TrendingUp className="h-6 w-6 text-primary" />}
      title="Popular Genres"
      description="Explore books by category"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <GenreCard key={genre.value} {...genre} />
        ))}
      </div>
    </SectionContainer>
  );
};


export default GenreSection
