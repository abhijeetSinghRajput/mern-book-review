import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Star,
  ChevronRight,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  TestTubeDiagonalIcon,
  BookOpenIcon,
  ScrollIcon,
  UserRoundIcon,
  CpuIcon,
  BrainIcon,
  Heart,
  Sparkles,
  Clock,
  Eye,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useBookStore } from "@/stores/useBookStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BookSection from "@/components/BookSection";

const HomePage = () => {
  const { getBooks } = useBookStore();
  const { authUser } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { success, data } = await getBooks();
        if (success) {
          setBooks(data);
          // Filter featured books (first 6)
          setFeaturedBooks(data.slice(0, 6));
          // Filter popular books (mix of fiction and romance)
          const popular = data
            .filter(
              (book) => book.genre === "fiction" || book.genre === "romance"
            )
            .slice(0, 4);
          setPopularBooks(popular);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [getBooks]);

  const genres = [
    { value: "fiction", label: "Fiction", count: 40, color: "bg-blue-500" },
    {
      value: "non-fiction",
      label: "Non-fiction",
      count: 18,
      color: "bg-green-500",
    },
    { value: "romance", label: "Romance", count: 9, color: "bg-pink-500" },
    {
      value: "children-ya",
      label: "Children & YA",
      count: 22,
      color: "bg-purple-500",
    },
    {
      value: "health-lifestyle",
      label: "Health & Lifestyle",
      count: 10,
      color: "bg-teal-500",
    },
    {
      value: "philosophy-religion",
      label: "Philosophy & Religion",
      count: 4,
      color: "bg-indigo-500",
    },
    {
      value: "business-economics",
      label: "Business & Economics",
      count: 2,
      color: "bg-orange-500",
    },
  ];

  const featuredAuthors = [
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

  const stats = [
    {
      label: "Total Books",
      value: "140+",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Active Readers",
      value: "10K+",
      icon: Users,
      color: "text-green-600",
    },
    { label: "Categories", value: "10", icon: Award, color: "text-purple-600" },
    {
      label: "Featured Authors",
      value: "50+",
      icon: Sparkles,
      color: "text-amber-600",
    },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-screen-xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-screen-xl mx-auto p-6">
        {/* Welcome Section */}
        {authUser && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-8 border shadow-sm">
              <h1 className="text-3xl font-bold text-foreground mb-3">
                Welcome back, {authUser.fullName?.split(" ")[0] || "Reader"}! 📚
              </h1>
              <p className="text-muted-foreground text-lg">
                Continue your reading journey with personalized recommendations
              </p>
            </div>
          </section>
        )}

        <BookSection />

        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SectionContainer
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            title="Popular Genres"
            description="Explore books by category"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {genres.map((genre, index) => (
                <GenreCard
                  key={index}
                  name={genre.label}
                  count={genre.count}
                  color={genre.color}
                  value={genre.value}
                />
              ))}
            </div>
          </SectionContainer>

          {/* Featured Author */}
          <SectionContainer
            icon={<Users className="h-6 w-6 text-primary" />}
            title="Featured Authors"
            description="Meet our bestselling writers"
            actionButton={
              <Button variant="ghost" className="gap-1 text-primary">
                Show All
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
          >
            <div className="grid grid-cols-2 gap-4">
              {featuredAuthors.map((author, index) => (
                <AuthorCard key={index} author={author} />
              ))}
            </div>
          </SectionContainer>
        </div>

        <BookSection genre="philosophy-religion" />
        <BookSection genre="romance" />
        <BookSection genre="fiction" />
      </div>
    </>
  );
};

// Reusable Section Container Component
const SectionContainer = ({
  icon,
  title,
  description,
  actionButton,
  children,
}) => {
  return (
    <section className="bg-background rounded-xl">
      <div className="flex sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg mt-1">{icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        {actionButton}
      </div>
      {children}
    </section>
  );
};

// Genre Card Component
const GenreCard = ({ name, count, color, value }) => {
  return (
    <div className="bg-card border rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-foreground block">{name}</span>
          <div className="text-sm text-muted-foreground mt-1">
            {count} books
          </div>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${color} group-hover:scale-125 transition-transform`}
        ></div>
      </div>
    </div>
  );
};

const BookCard = ({
  title,
  author,
  coverPhoto,
  price,
  genre,
  featured = false,
  rating = 4.0,
  reviewCount = 100,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border">
      <div className="flex flex-col">
        <CardContent className="p-0 relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={coverPhoto}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </CardContent>
        <div className="flex-1 p-4">
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">{author}</p>
          </CardHeader>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {genre}
              </Badge>
              <span className="font-medium text-foreground">₹{price}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const AuthorCard = ({ author }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
        <Avatar className="size-16">
          <AvatarImage
            src={author.photo}
            alt={author.name}
            className="w-full h-full object-cover"
          />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {author.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {author.genre}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {author.books} in collection
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HomePage;
