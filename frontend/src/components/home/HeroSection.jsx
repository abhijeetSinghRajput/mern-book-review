import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";

const HeroSection = () => {
  const { authUser } = useAuthStore();
  return (
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
  );
};

export default HeroSection;
