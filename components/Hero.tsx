import Image from "next/image";
import HeroImage from "@/public/hero.svg";
import bg from "@/public/bg.svg";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import Img from "@/public/downloads.png";
const Hero = () => {
  return (
    <section className="h-[80vh] grid grid-cols-12">
      <div className="col-span-6  border border-dashed border-r-0 flex flex-col px-6">
        <div className="h-[55%] flex flex-col border-b border-dashed justify-center">
          <h1 className="text-4xl tracking-tight font-bold">
            {" "}
            The online community for <br /> Rwandan frontend devs
          </h1>
          <p className="text-sm text-muted-foreground">
            Interact with our multi-language editor, share designs <br /> with
            our community and win prizes
          </p>
          <div className="mt-4">
            <Button className="bg-lime-400 text-black">
              Join the community
            </Button>
          </div>
        </div>
        <div className="h-[15%] border-b border-dashed grid grid-cols-2 ">
          <div className="border-r hover:bg-muted/20 transition duration-400 flex items-center gap-2 text-muted-foreground hover:text-lime-300 text-lg group">
            <p>Join the community</p>
            <ArrowUpRight className="group-hover:translate-x-3 group-hover:-translate-y-[2px] transition" />
          </div>
          <div className="hover:bg-muted/20 transition duration-400 flex items-center gap-2 text-muted-foreground hover:text-lime-400 text-lg group pl-6">
            <p>Open the editor</p>
            <ArrowUpRight className="group-hover:translate-x-3 group-hover:-translate-y-[2px] transition" />
          </div>
        </div>
        <div className="h-[30%]  grid grid-cols-2">
          <div className="h-full border-r flex justify-center text-5xl tracking-tighter font-medium flex-col">
            <p>85.4%</p>
            <p className="text-sm text-muted-foreground font-normal tracking-normal">
              Daily active users
            </p>
          </div>
          <div className="h-full flex items-center text-5xl tracking-tighter font-medium ml-6">
            40+
          </div>
        </div>
      </div>
      <div className="col col-span-6 flex flex-col items-center justify-center h-full transition duration-700">
        <div className="relative h-[70%] border w-full bg-orange-500 transition-rounded duration-300 rounded-[33px] hover:rounded-none  flex items-center justify-center">
          <Image
            src={Img}
            alt="Image"
            className="object-cover max-w-[500px] absolute bottom-0"
          />
        </div>

        <div className="h-[30%]"> yoo</div>
      </div>
    </section>
  );
};

export default Hero;
