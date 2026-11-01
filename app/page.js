import HeroSlider from "@/components/HeroSlider";
import NewArrivals from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </div>
  );
}