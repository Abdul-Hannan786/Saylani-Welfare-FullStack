import {
  FileText,
  GraduationCap,
  Leaf,
  LineChart,
  Shield,
  Stethoscope,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: <FileText className="w-8 h-8" />, // Assuming you have a FileText icon for reports
    title: "AI-Powered Reports",
    description:
      "Upload any medical report and get an easy-to-understand summary in both English and Roman Urdu, powered by Gemini AI.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: <LineChart className="w-8 h-8" />, // Assuming a LineChart icon for tracking
    title: "Health Tracking",
    description:
      "Manually log and track key vitals like BP, Sugar, and Weight over time, even without a lab report.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: <Shield className="w-8 h-8" />, // A Shield icon for security
    title: "Secure Health Vault",
    description:
      "Store all your prescriptions, reports, and health data securely in one place with encrypted privacy.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];
const Features = () => {
  return (
    <div className="bg-[#f9fcff] my-10 mb-16 px-4 py-10">
      <div className="mx-auto container px-4">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold mb-5 !leading-[1.2] tracking-tight text-gray-800">
              Our <span className="text-primary">Core</span> Initiatives
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We focus on empowering individuals to take control of their health
              through innovative technology. HealthMate demystifies medical
              data, provides AI-powered insights in simple language, and offers
              a secure vault for all health records — creating a lasting impact
              on personal well-being.
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
                <p className="text-gray-600 leading-relaxed text-center font-serif">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 max-w-4xl mx-auto text-center">
          <div className="bg-white shadow-xl rounded-2xl relative overflow-hidden p-8">
            <div className="absolute top-0 left-0 rounded-full w-20 h-20 bg-[#2ecc7133] -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#2ecc7133] rounded-full translate-x-16 translate-y-16"></div>

            <div className="z-30">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">
                Our Vision for future
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We envision a future where managing your health is effortless
                and empowering for everyone. A world where complex medical
                information is instantly clear, and every individual has a smart
                companion to guide them on their lifelong health journey,
                leading to earlier understanding and better well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
