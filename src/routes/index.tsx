import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Loader } from "@/components/site/Loader";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { Collection } from "@/components/site/Collection";
import { Experience } from "@/components/site/Experience";
import { ChefHighlight } from "@/components/site/ChefHighlight";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Reservation } from "@/components/site/Reservation";
import { Location } from "@/components/site/Location";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Circles · Bakery, Pâtisserie & Café · Sahiwal" },
      {
        name: "description",
        content:
          "Circles — a premium modern bakery, French pâtisserie, café and family dining destination in Farid Town, Sahiwal. Freshly baked every day: cakes, pastries, cookies, bread, live sandwiches, coffee and fast food.",
      },
      { property: "og:title", content: "Circles · Bakery, Pâtisserie & Café · Sahiwal" },
      {
        property: "og:description",
        content:
          "Freshly baked every day — custom cakes, artisan pastries, live sandwiches, premium coffee and family dining in Sahiwal, Pakistan.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className={loaded ? "" : "pointer-events-none"}>
        <Hero />
        <Story />
        <Collection />
        <Experience />
        <ChefHighlight />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Location />
        <Footer />
      </main>
    </>
  );
}
