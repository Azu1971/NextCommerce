import "./ProductCard.css";
import Link from "next/link";

const ProductCard = ({ product }: any) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="product-card">
        <img src={product.images[0]} alt={product.name} />
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
