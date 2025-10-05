"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBookStore } from "@/stores/useBookStore";
import { Plus, Loader2 } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

export default function CreateBookDialog() {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: 0,
    description: "",
    genre: "",
    cover: "",
  });

  const fileInputRef = useRef(null);
  const { createBook, loader } = useBookStore();

  const genres = [
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-fiction" },
    { value: "romance", label: "Romantic" },
    { value: "children-ya", label: "Children & Young Adult" },
    { value: "educational", label: "Educational & Academic" },
    { value: "philosophy-religion", label: "Philosophy & Religion" },
    { value: "science-tech", label: "Science & Technology" },
    { value: "art-entertainment", label: "Art, Music & Entertainment" },
    { value: "business-economics", label: "Business & Economics" },
    { value: "health-lifestyle", label: "Health & Lifestyle" },
  ];

  // Show preview immediately when user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setBook((prev) => ({ ...prev, cover: previewUrl }));

    // Optional: if you want to upload immediately, call your API here
    // handleImageUpload(file);
  };

  const handleSubmit = async () => {
    await createBook(book);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className="overflow-auto">
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <ScrollArea className="max-w-screen-md p-4 mx-auto w-full max-h-[100svh]">
          <div className="space-y-2 sm:space-y-4">
            <DialogHeader>
              <DialogTitle>Create New Book</DialogTitle>
            </DialogHeader>

            {/* Avatar + file input */}
            <div>
              <Avatar
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl aspect-[9/16] cursor-pointer hover:opacity-90 overflow-hidden w-[160px] h-[200px]"
              >
                <AvatarImage
                  className="w-full h-full object-cover bg-accent"
                  src={book?.cover}
                  alt="Book Cover"
                />
                <AvatarFallback className="text-muted-foreground rounded-none">
                  <Plus size={34} />
                </AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Book title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Book title"
                  className="h-11"
                  value={book.title}
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="Book title"
                  className="h-11"
                  value={book.price}
                  onChange={(e) => setBook({ ...book, price: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Author</Label>
                <Input
                  className="h-11"
                  placeholder="Author name"
                  value={book.author}
                  onChange={(e) => setBook({ ...book, author: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Genre</Label>
                <Combobox
                  className={"h-11 w-full"}
                  items={genres}
                  value={book.genre}
                  setValue={(val) => setBook({ ...book, genre: val })}
                  placeholder="Select Genre..."
                />
              </div>
            </div>

            {/* Description */}
            <Textarea
              placeholder="Book description"
              rows={3}
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
            />

            <DialogFooter className={"p-0 sticky bottom-0"}>
              {/* Submit button */}
              <Button size="lg" onClick={handleSubmit}>
                {loader.createBook ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Posting
                  </>
                ) : (
                  <>
                    <Plus className="mr-2" />
                    Post
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
