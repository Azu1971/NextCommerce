import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    return NextResponse.json(products.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}