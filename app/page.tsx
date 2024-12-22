"use client";
import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/mode-toggle";
import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
    </div>
  );
}
