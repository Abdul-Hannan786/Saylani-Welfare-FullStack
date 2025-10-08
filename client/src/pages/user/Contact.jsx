// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

const Contact = () => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.3 });

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
    { icon: <Facebook className="w-6 h-6" />, name: "Facebook", color: "hover:text-blue-600" },
    { icon: <Twitter className="w-6 h-6" />, name: "Twitter", color: "hover:text-blue-400" },
    { icon: <Instagram className="w-6 h-6" />, name: "Instagram", color: "hover:text-pink-600" },
    { icon: <Youtube className="w-6 h-6" />, name: "YouTube", color: "hover:text-red-600" },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full pt-10"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Whether you need assistance or wish to collaborate, we're just a message away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -40 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-white shadow-xl rounded-2xl p-8 md:p-10 overflow-hidden"
          >
            <BorderBeam 
              duration={10} 
              size={250} 
              className="from-primary/40 via-transparent to-transparent"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              {["name", "email", "cause"].map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Label htmlFor={field} className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    placeholder={
                      field === "name" ? "Enter your full name" :
                      field === "email" ? "Enter your email address" :
                      "What would you like to talk about?"
                    }
                    className="w-full px-4 py-5"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Label htmlFor="message" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  className="resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="button" className="w-full cursor-pointer py-5 font-semibold active:scale-95 transition">
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 40 }}
            animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-[#f8f9fa] rounded-full flex items-center justify-center ${info.color}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 font-inter">{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={infoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Follow Us on Social Media
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={infoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-[#f8f9fa] cursor-pointer rounded-full flex items-center justify-center text-gray-600 transition-all active:scale-90 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;