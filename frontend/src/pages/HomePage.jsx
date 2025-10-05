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
} from "lucide-react";
import React from "react";

const HomePage = () => {
  const { authUser } = useAuthStore();

  const subjects = [
    { name: "Science", count: "1.2k", icon: TestTubeDiagonalIcon },
    { name: "Fiction", count: "890", icon: BookOpenIcon },
    { name: "History", count: "756", icon: ScrollIcon },
    { name: "Biography", count: "634", icon: UserRoundIcon },
    { name: "Technology", count: "1.5k", icon: CpuIcon },
    { name: "Philosophy", count: "543", icon: BrainIcon },
  ];

  return (
    <>
      <Header />

      <div className="max-w-screen-xl mx-auto p-6">
        {/* Welcome Section */}
        {authUser && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {authUser.fullName?.split(" ")[0] || "Reader"}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Continue your reading journey with these recommendations
              </p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* First Column */}
          <div className="space-y-8">
            {/* Previous Reading Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Previous Reading
                </h2>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <BookCard key={index} variant="horizontal" />
                ))}
              </div>
            </section>

            {/* Subjects Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Popular Subjects
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex gap-4  bg-card border rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <div
                      className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <subject.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground block">
                        {subject.name}
                      </span>
                      <div className="text-sm text-muted-foreground mt-1">
                        {subject.count} books
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* New Books Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    New Arrivals
                  </h3>
                </div>
                <Button variant="ghost" className="gap-1 text-primary">
                  See all
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <BookCard key={index} variant="vertical" />
                ))}
              </div>
            </section>
          </div>

          {/* Second Column */}
          <div className="space-y-8">
            {/* Popular Books Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Popular This Week
                  </h3>
                </div>
                <Button variant="ghost" className="gap-1 text-primary">
                  Show all
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <BookCard
                    key={index}
                    variant="vertical"
                    featured={index === 0}
                  />
                ))}
              </div>
            </section>

            {/* Writers and Authors Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Featured Authors
                  </h3>
                </div>
                <Button variant="ghost" className="gap-1 text-primary">
                  Show all
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <AuthorCard key={index} />
                ))}
              </div>
            </section>

            {/* Special Books Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Editor's Choice
                  </h3>
                </div>
                <Button variant="ghost" className="gap-1 text-primary">
                  Show all
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <BookCard key={index} variant="vertical" special={true} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

const BookCard = ({
  variant = "vertical",
  featured = false,
  special = false,
}) => {
  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 group border ${
        featured ? "ring-2 ring-primary/20" : ""
      }`}
    >
      <div
        className={`flex ${
          variant === "horizontal" ? "flex-row" : "flex-col"
        } ${variant === "horizontal" ? "h-32" : ""}`}
      >
        <CardContent
          className={`p-0 relative ${
            variant === "horizontal"
              ? "w-24 h-full flex-shrink-0"
              : "w-full h-48"
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
            alt="book cover"
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              variant === "horizontal" ? "rounded-l-lg" : "rounded-t-lg"
            }`}
          />
          {featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Trending
            </Badge>
          )}
          {special && (
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 bg-amber-500 text-white"
            >
              Editor's Pick
            </Badge>
          )}
        </CardContent>
        <div
          className={`flex-1 p-4 ${
            variant === "horizontal" ? "flex flex-col justify-center" : ""
          }`}
        >
          <CardHeader className="p-0">
            <CardTitle
              className={`text-foreground group-hover:text-primary transition-colors ${
                variant === "horizontal" ? "text-base" : "text-lg"
              }`}
            >
              The Great Novel
            </CardTitle>
            <div className="mt-1">
              <div className="text-muted-foreground text-sm">J.K. Rowling</div>
            </div>
          </CardHeader>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-xs text-muted-foreground">(1.2k)</span>
            </div>
            <Badge variant="outline" className="text-xs">
              Fiction
            </Badge>
          </div>
          {variant === "vertical" && (
            <div className="mt-3">
              <div className="text-xs text-muted-foreground line-clamp-2">
                A captivating story about adventure and discovery that will keep
                you engaged from start to finish.
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const AuthorCard = () => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border">
      <div className="flex items-center p-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-4 border-2 border-primary/20">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="author"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            Stephen King
          </h4>
          <p className="text-sm text-muted-foreground mt-1">Horror, Fiction</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">24 books</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">4.7</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HomePage;
