import { Button } from "../ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";

const Hero = () => {
  return (
    <div className=" flex flex-col items-center py-3 px-6 pb-8 md:pb-[70px]">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight text-gray-800 ">
            HealthMate <br />
            <span className="text-primary">Sehat ka Smart Dost.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Meet your smart health friend! Store all your reports, understand
            them with AI-powered explanations, and track your well-being over
            time. Designed for you and your family, in the language you
            understand best.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base cursor-pointer active:scale-95 transition"
            >
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none cursor-pointer active:scale-95 transition"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
