import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BookOpen } from "lucide-react";

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

export default AuthorCard;
