import React from "react";

const GenreCard = ({ name, count, color, label, value }) => {
  return (
    <div className="bg-card border rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-foreground block">{label}</span>
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

export default GenreCard;
