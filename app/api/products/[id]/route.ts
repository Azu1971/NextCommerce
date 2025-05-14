import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}