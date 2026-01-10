"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/Services/products.js";
import ProductCard from "@/Components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Продукты</h1>
      {products.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
