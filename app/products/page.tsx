"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import "./products.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
