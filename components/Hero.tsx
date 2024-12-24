import Image from "next/image";

import { Button } from "./ui/button";
import Img from "@/public/downloads.png";
const Hero = () => {
  return (
    <section className="h-[80vh] grid grid-cols-12">
      <div className="col-span-12 md:col-span-6   flex gap-4 flex-col px-6">
        <div className="h-[55%] mt-3 flex flex-col border-b border-dashed justify-center">
          <h1 className="text-2xl sm:text-3xl mt-6 tracking-tight font-bold">
            {" "}
            The online community for Rwandan frontend devs
          </h1>
          <p className="text-sm text-muted-foreground">
            Interact with our multi-language editor, share designs <br /> with
            our community and win prizes
          </p>
          <div className="mt-4">
            <Button className="bg-lime-400 text-black w-full mb-2">
              Join the community
            </Button>
          </div>
        </div>

        <div className="min-h-[10%] mt-4 md:mt-0 grid grid-cols-2">
          <div className="h-full border-r flex justify-center sm:3xl text-3xl md:text-4xl lg:text-5xl tracking-tighter font-medium flex-col">
            <p>85.4%</p>
            <p className="text-xs text-muted-foreground font-normal tracking-normal">
              Daily active users
            </p>
          </div>
          <div className="h-full flex flex-col  sm:text-3xl text-3xl md:text-4xl lg:text-5xl tracking-tighter font-medium ml-6">
            <div>40+</div>

            <p className="text-xs text-muted-foreground font-normal tracking-normal">
              Pulses created
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-center h-full transition duration-700">
        <div className="relative h-[300px] overflow-hidden md:min-h-[70%] border-b md:border w-full dark:bg-orange-500 transition-rounded duration-300 rounded-[33px] hover:rounded-none  flex items-center justify-center">
          <Image
            src={Img}
            alt="Image"
            className="object-cover max-w-[400px] md:max-w-[400px] lg:max-w-[500px] absolute bottom-0"
          />
        </div>
      </div>
      <div className="border border-red-400 w-full col-span-12"> yoooo</div>
    </section>
  );
};

export default Hero;
