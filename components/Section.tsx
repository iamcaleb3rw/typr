"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Sparkles } from "lucide-react";
import { FaHtml5 } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
import DotPattern from "./ui/dot-pattern";
import { cn } from "@/lib/utils";

const defaultCards = [
  {
    icon: <FaHtml5 className="size-4" color="orange" />,
    title: "index.html",
    description: "<button>Click me</button>",
    date: "Just now",
    iconClassName: "",
    titleClassName: "text-muted-foreground",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <TbBrandJavascript className="size-4 text-blue-300" color="yellow" />,
    title: "script.js",
    description: "console.log('Hello World')",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "styles.css",
    description: "button{color:blue}",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] border gap-2 p-5 w-full flex-col lg:flex-row items-center justify-evenly py-20">
      <div>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Multi-language editor
          </h1>
        </div>
        <p className="max-w-[300px] md:max-w[400px] text-center md:text-left text-muted-foreground ">
          The 3 pillars of web development: HTML, CSS and JavaScript are
          available in our editor. Create components, style them and add
          interactivity without leaving the platform
        </p>
      </div>
      <div className="relative w-full max-w-xl border flex items-center justify-center overflow-hidden min-h-[300px] rounded-2xl">
        <DisplayCards cards={defaultCards} />
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] -z-10"
          )}
        />
      </div>
    </div>
  );
}

export { DisplayCardsDemo };
