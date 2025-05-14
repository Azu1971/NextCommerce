"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Stripe } from "stripe";
import "./ChangingSlide.css";

interface Props {
  products: Stripe.Product[];
}

const ChangingSlide = ({ products }: Props) => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = Math.floor(Math.random() * 5);
      setRandomNumber(newNumber);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="changing-slide">
      <Image
        src={products[randomNumber].images[0]}
        alt="Shopping Cart"
        width={500}
        height={500}
        priority
      />
      <div>
        <h2>{products[randomNumber].name}</h2>
        <p>{products[randomNumber].description}</p>
      </div>
    </div>
  );
};

export default ChangingSlide;
