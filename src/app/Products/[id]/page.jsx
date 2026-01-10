"use client";
import { useEffect, useState } from "react";
import { getProduct } from "@/Services/products.js";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(params.id).then(setProduct);
  }, []);

  if (!product) return null;
  return <h1>{product.dealer}</h1>;
}
