"use client";
import Link from "next/link";
import "./success.css";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

const Success = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <Link href="/" className="home-link">
        Return to Homepage
      </Link>
    </div>
  );
};

export default Success;
