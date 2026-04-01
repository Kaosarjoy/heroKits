import Banner from "@/components/home/Banner";
import ProductPage from "@/components/home/ProductPage";
import Test from "@/components/Test";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./lib/authOption";

export default async function Home() {
  const session =await getServerSession(authOptions);
  return (
    <div className="space-y-20 ">
      <Test></Test>
      <p>{JSON.stringify(session)}</p>
      <section>
        <Banner></Banner>
      </section>
      <section>
       <ProductPage></ProductPage>
      </section>
    </div>
  );
}

