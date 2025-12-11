import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "HR Managers register their company",
      desc: "They receive a default subscription package (5 employees).",
    },
    {
      title: "Employees register independently",
      desc: "They get automatically affiliated with the correct company.",
    },
    {
      title: "Asset Tracking",
      desc: "Assets move from Inventory → Assignment → Return.",
    },
    {
      title: "Multi‑company support",
      desc: "Employees can work with multiple companies at once.",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">

        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text mb-12">
          How the System Works
        </h2>

        {/* Steps Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Number Badge */}
              <div className="absolute -top-3 -left-3 bg-secondary text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
                {i + 1}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
