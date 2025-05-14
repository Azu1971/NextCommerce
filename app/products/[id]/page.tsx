"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import "./id.css";

import { useCartStore } from "@/store/cart-store";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const normalizedId = Array.isArray(id) ? id[0] : id;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.default_price.unit_amount,
      image: product.images[0],
    });
  };

  return (
    <div className="product-detail">
      {product.images?.[0] && (
        <Image
          src={product.images[0]}
          alt={product.name || "Product image"}
          width={500}
          height={500}
          priority
        />
      )}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">
          ৳ {((product.default_price?.unit_amount || 0) / 100).toFixed(2)}
        </p>
        <div>
          <button onClick={() => removeItem(normalizedId)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onAddItem()}>+</button>
        </div>
        {/* <button>Add to Cart</button> */}
        <p>
          Total: ৳
          {(
            (quantity * (Number(product.default_price?.unit_amount) || 0)) /
            100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
