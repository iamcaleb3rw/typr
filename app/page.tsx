"use client";
import DisplayCards from "@/components/Features";
import Features from "@/components/Features";
import Header from "@/components/Header";
import Preview from "@/components/Hero";
import Hero from "@/components/Hero";

import Navigation from "@/components/Navigation";
import { DisplayCardsDemo } from "@/components/Section";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Preview />
    </div>
  );
}
