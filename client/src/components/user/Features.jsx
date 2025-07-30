import { GraduationCap, Leaf, Stethoscope } from "lucide-react";
import React from "react";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Accessible Education",
    description:
      "Providing quality learning opportunities to children and youth in underserved communities.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Community Healthcare",
    description:
      "Delivering essential medical support and health awareness to remote and at-risk populations.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Sustainable Development",
    description:
      "Promoting eco-friendly initiatives and skill-building programs for long-term community growth.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];
const Features = () => {
  return (
    <div className="bg-[#f9fcff] my-10 mb-16 px-4 py-10">
      <div className="mx-auto container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold mb-5 !leading-[1.2] tracking-tight text-gray-800">
            Our <span className="text-primary">Core</span> Initiatives
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We focus on empowering underserved communities through strategic
            programs in education, healthcare, and sustainable development —
            creating impact that lasts for generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-xl hover:scale-105 cursor-pointer transition-all duration-500"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto  ${feature.bgColor} mb-4`}
              >
                <div className={feature.color}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center font-serif">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
