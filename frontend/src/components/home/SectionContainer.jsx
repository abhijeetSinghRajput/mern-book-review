import React from "react";

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

export default SectionContainer;
