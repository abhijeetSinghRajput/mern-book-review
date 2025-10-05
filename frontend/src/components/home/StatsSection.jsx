import React from 'react'
import { BookOpen, Users, Award, Sparkles } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { label: "Total Books", value: "140+", icon: BookOpen, color: "text-blue-600" },
    { label: "Active Readers", value: "10K+", icon: Users, color: "text-green-600" },
    { label: "Categories", value: "10", icon: Award, color: "text-purple-600" },
    { label: "Featured Authors", value: "50+", icon: Sparkles, color: "text-amber-600" },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


export default StatsSection
