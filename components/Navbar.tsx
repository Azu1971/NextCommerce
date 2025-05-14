"use client";
import React from "react";
import Link from "next/link";
import "./Navbar.css";
import { useCartStore } from "@/store/cart-store";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  return (
    <nav className="navbar">
      <div>
        <Link href="/">NextCommerce</Link>
      </div>
      <div>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/checkout">Checkout</Link>
      </div>
      <div className="cart-icon">
        <Link href="/checkout">
          <span>{cartCount > 0 && cartCount}</span>
          <MdOutlineShoppingCart size={30} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
