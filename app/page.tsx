import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";
import "./Home.css";
import CartImage from "@/assets/Cart.png";
import ChangingSlide from "@/components/ChangingSlide";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  console.log(products);

  return (
    <div>
      <div className="first">
        <div>
          <h1>Welcome to NextCommerce</h1>
          <p>Discover the latest products at the best prices</p>
          <button>Browse All Products</button>
        </div>
        <div>
          <Image src={CartImage} alt="Shopping Cart" width={500} priority />
        </div>
      </div>
      <div>
        <ChangingSlide products={products.data} />
      </div>
    </div>
  );
}
