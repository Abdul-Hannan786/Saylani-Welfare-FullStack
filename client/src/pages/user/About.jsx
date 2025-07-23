import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Spotlight } from "@/components/ui/spotlight";
import { CardHoverEffect } from "@/components/ui/pulse-card";
import {
  Globe,
  Users,
  Heart,
  Lightbulb,
  HeartHandshake,
  Sparkles,
  Rocket,
  Target,
  ShieldCheck,
  HelpingHand,
  GraduationCap,
} from "lucide-react";

const iconComponents = {
  Users: Users,
  Heart: Heart,
  Lightbulb: Lightbulb,
  Globe: Globe,
  Sparkles: Sparkles,
  Rocket: Rocket,
  Target: Target,
  HeartHandshake: HeartHandshake,
  ShieldCheck: ShieldCheck,
  HelpingHand: HelpingHand,
  GraduationCap: GraduationCap,
};

const defaultValues = [
  {
    title: "Compassion",
    description:
      "We serve humanity with kindness and empathy, ensuring dignity and respect for all.",
    icon: "HeartHandshake", // Symbolizes caring and humanitarian help
  },
  {
    title: "Transparency",
    description:
      "We maintain complete transparency in our operations, donations, and welfare activities.",
    icon: "ShieldCheck", // Represents trust and accountability
  },
  {
    title: "Service to Humanity",
    description:
      "We believe helping those in need is the highest form of worship and social responsibility.",
    icon: "HelpingHand", // Represents support and social work
  },
  {
    title: "Education for All",
    description:
      "We empower individuals through free quality education and IT training to build a better future.",
    icon: "GraduationCap", // Reflects Saylani's education and training mission
  },
];

const About = () => {
  const aboutData = {
    subtitle:
      "Serving humanity with compassion through education, healthcare, and welfare support.",
    mission:
      "Our mission is to serve humanity without discrimination by providing food, healthcare, education, and support to those in need — empowering individuals to lead better lives.",
    vision:
      "We envision a world free from hunger, illiteracy, and suffering, where every person has access to basic human rights and opportunities to thrive.",
    values: defaultValues,
    className: "relative overflow-hidden py-20",
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  return (
    <section className="w-full pt-10">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h1 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-muted-foreground mt-6 text-xl">
            {aboutData.subtitle}
          </p>
        </motion.div>
        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 grid gap-12 md:grid-cols-2"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="via-primary/40 from-transparent to-transparent"
              />
              <div className="from-primary/20 to-primary/5 mb-6 inline-flex aspect-square h-16 w-16 flex-1 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <Rocket className="text-primary h-8 w-8" />
              </div>
              <div className="space-y-4">
                <h2 className="from-primary/90 to-primary/70 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {aboutData.mission}
                </p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent via-blue-500/40 to-transparent"
                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm">
                <Target className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="mb-4 bg-gradient-to-r from-blue-500/90 to-blue-500/70 bg-clip-text text-3xl font-bold text-transparent">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>
        <div ref={valuesRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Our Core Values
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              The principles that guide everything we do and every decision we
              make.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values?.map((value, index) => {
              const IconComponent = iconComponents[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                    variant={
                      index === 0
                        ? "purple"
                        : index === 1
                        ? "blue"
                        : index === 2
                        ? "amber"
                        : "rose"
                    }
                    glowEffect={true}
                    size="lg"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
