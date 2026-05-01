import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TopCourses from "@/components/home/TopCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TopInstructors from "@/components/home/TopInstructors";
import CTA from "@/components/home/CTA";
import ExplorePreview from "@/components/home/ExplorePreview";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <main className="space-y-12">
      <Hero />
      <HowItWorks />
      <ExplorePreview />
      <TopCourses />
      <WhyChooseUs />
      <TopInstructors />
      <CTA />
      <Testimonials />
    </main>
  );
}

