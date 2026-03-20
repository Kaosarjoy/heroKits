import Banner from "@/components/home/Banner";
import ProductPage from "@/components/home/ProductPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20 ">
      <section>
        <Banner></Banner>
      </section>
      <section>
       <ProductPage></ProductPage>
      </section>
    </div>
  );
}
