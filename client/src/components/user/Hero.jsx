import { Button } from "../ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";

const Hero = () => {
  return (
    <div className=" flex flex-col items-center py-3 px-6 pb-8 md:pb-[70px]">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight text-gray-800 ">
            Together <span className="text-primary">We Create</span> Brighter Futures
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Join us in supporting underprivileged communities by providing
            access to quality education, essential healthcare services, and
            sustainable development programs that create lasting change and
            brighter futures.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base cursor-pointer"
            >
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none cursor-pointer"
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
