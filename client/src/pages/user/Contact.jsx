import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Our Headquarters",
    details: "Saylani Head Office Bahadurabad, Karachi",
    color: "text-blue-600",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    details: "+92 3002640700",
    color: "text-blue-600",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    details: "abdulhannanhere@gmail.com",
    color: "text-blue-600",
  },
];

const socialLinks = [
  {
    icon: <Facebook className="w-6 h-6" />,
    name: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    name: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    name: "Instagram",
    color: "hover:text-pink-600",
  },
  {
    icon: <Youtube className="w-6 h-6" />,
    name: "YouTube",
    color: "hover:text-red-600",
  },
];

const Contact = () => {
  return (
    <section className="w-full pt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Whether you need assistance or wish to collaborate, we’re just a
            message away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-inter font-medium text-gray-700 mb-2"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-5"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-inter font-medium text-gray-700 mb-2"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-5"
                />
              </div>

              <div>
                <Label
                  htmlFor="cause"
                  className="block text-sm font-inter font-medium text-gray-700 mb-2"
                >
                  Cause
                </Label>
                <Input
                  type="text"
                  id="cause"
                  name="cause"
                  placeholder="What would you like to talk about?"
                  className="w-full px-4 py-5"
                />
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="block text-sm font-inter font-medium text-gray-700 mb-2"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  className="resize-none"
                />
              </div>
              <Button className="w-full py-5 font-semibold">
                Send Message
              </Button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className={`w-12 h-12 bg-[#f8f9fa] rounded-full flex items-center justify-center ${info.color}`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 font-inter">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Follow Us on Social Media
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    className={`w-12 h-12 bg-[#f8f9fa] cursor-pointer rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} hover:scale-110`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
