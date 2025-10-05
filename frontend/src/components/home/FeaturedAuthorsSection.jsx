import React from "react";
import { Users, ChevronRight } from "lucide-react";
import SectionContainer from "./SectionContainer";
import AuthorCard from "./AuthorCard";
import { Button } from "@/components/ui/button";

const FeaturedAuthorsSection = () => {
  const authors = [
    {
      name: "Ruskin Bond",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ruskin_Bond_in_Bangalore%2C_India_%28Jim_Ankan_Deka_photography%29.jpg/500px-Ruskin_Bond_in_Bangalore%2C_India_%28Jim_Ankan_Deka_photography%29.jpg",
      bookCount: 100,
      genre: "Children's Literature, Fiction",
      books: 4,
    },
    {
      name: "J.K. Rowling",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/500px-J._K._Rowling_2010.jpg",
      bookCount: 15,
      genre: "Fantasy, Young Adult",
      books: 3,
    },
    {
      name: "Jeffrey Archer",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jeffrey_Archer_20241127.jpg/500px-Jeffrey_Archer_20241127.jpg",
      bookCount: 40,
      genre: "Thriller, Suspense",
      books: 2,
    },
    {
      name: "Michael Morpurgo",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Michael_Morpurgo_20090315_Salon_du_livre_1.jpg/500px-Michael_Morpurgo_20090315_Salon_du_livre_1.jpg",
      bookCount: 120,
      genre: "Children's Literature",
      books: 2,
    },
    {
      name: "Devdutt Pattanaik",
      photo:
        "https://www.seema.com/wp-content/uploads/2023/08/Devdutt-Pattanaik-768x621.jpg",
      bookCount: 50,
      genre: "Mythology, Culture",
      books: 2,
    },
    {
      name: "Satoshi Yagisawa",
      photo: "https://images.gr-assets.com/authors/1654969597p8/7362871.jpg",
      bookCount: 6,
      genre: "Contemporary Fiction",
      books: 2,
    },
  ];

  return (
    <SectionContainer
      icon={<Users className="h-6 w-6 text-primary" />}
      title="Featured Authors"
      description="Meet our bestselling writers"
      actionButton={
        <Button variant="ghost" className="gap-1 text-primary">
          Show All <ChevronRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        {authors.map((author) => (
          <AuthorCard key={author.name} author={author} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default FeaturedAuthorsSection;
