// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest, { params }) {
  const id = params.id as string;

  try {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });
    return NextResponse.json(product);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
