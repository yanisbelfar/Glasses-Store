import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import PopularProducts from "@/components/PopularProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <PopularProducts />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
