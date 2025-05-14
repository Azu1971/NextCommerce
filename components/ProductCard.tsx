import "./ProductCard.css";
import Link from "next/link";
import Stripe from "stripe";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="product-card">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>
          <b>৳{product.default_price.unit_amount_decimal / 100}</b>
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
