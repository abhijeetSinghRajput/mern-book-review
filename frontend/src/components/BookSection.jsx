"use client";
import React, { useEffect, useState } from "react";
import { useBookStore } from "@/stores/useBookStore";
import { Star } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "./ui/badge";

const BookSection = ({ author = null, genre = null }) => {
  const { getBooks } = useBookStore();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getBooks({ limit: 20, author, genre });
      console.log(res);
      if (res?.success && Array.isArray(res.data)) setBooks(res.data);
    };
    fetchBooks();
  }, [author, genre, getBooks]);

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4 capitalize">{genre || "Recently Arrived"}</h2>
      <ScrollArea>
        <div className="flex gap-4 pb-4">
          {books?.length > 0 ? (
            books.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <p className="text-muted-foreground text-sm">No books found.</p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

const BookCard = ({ book }) => {
  const rating = book.rating || "4.5";
  const reviewCount = book.reviewCount || "120";

  return (
    <div className="min-w-[180px] bg-card rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all">
      <div className="bg-black h-42">
        <img
          src={book.coverPhoto || "/placeholder.jpg"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium truncate">{book.title}</h3>
        <p className="text-muted-foreground text-sm truncate">{book.author}</p>
        <div className="flex justify-between items-center mt-2 text-xs">
          <Badge variant="outline">{book.genre}</Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>4.5</span>
            <span className="text-muted-foreground">1.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
