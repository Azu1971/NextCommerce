"use client";
import React from "react";
import { useCartStore } from "@/store/cart-store";
import "./checkout.css";
import Image from "next/image";
import { checkoutAction } from "./checkoutAction";

const CheckoutPage = () => {
  const { items, removeItem, addItem, clearCart, removeFull } = useCartStore();
  const cartCount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <div className="checkout-page">
      <h1>Checkout Page</h1>
      <h2>Total: ৳{cartCount / 100}</h2>
      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart.</p>
        </div>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <div className="cart-item-quantity">
                  <button onClick={() => removeItem(item.id)}>-</button>
                  <p>&nbsp; Quantity: {item.quantity} &nbsp;</p>
                  <button onClick={() => addItem(item)}>+</button>
                </div>
                <p>Price: ৳{item.price / 100}</p>
                <button onClick={() => removeFull(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <br />
      <br />
      {items.length > 0 && (
        <>
          <button onClick={() => clearCart()}>Clear Cart</button>
          <br />
          <br />
          <form action={checkoutAction}>
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            <button type="submit">Proceed to payment</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
