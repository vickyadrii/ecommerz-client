import { useEffect, useRef, useState } from "react";
import { products as allProducts } from "./constants";
import { ProductCard } from "@/components/common/product-card";
import ProductHeader from "./components/ProductHeader";
import { useSidebar } from "@/components/ui/sidebar";
import type { Product } from "./types";

const LIMIT = 8;

const Products = () => {
  const { open } = useSidebar();

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadData = () => {
      const start = (page - 1) * LIMIT;
      const end = start + LIMIT;

      setLoading(true);
      const timeout = setTimeout(() => {
        const nextProducts = allProducts.slice(start, end);
        setVisibleProducts((prev) => [...prev, ...nextProducts]);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    };

    loadData();
  }, [page]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          const totalLoaded = page * LIMIT;
          if (totalLoaded < allProducts.length) {
            setPage((prev) => prev + 1);
          }
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [page, loading]);

  return (
    <div className="space-y-4">
      <ProductHeader />

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          open ? "lg:grid-cols-4 xl:grid-cols-4" : "lg:grid-cols-5 xl:grid-cols-4"
        } gap-4 mt-4 place-items-center`}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={index}
            thumbnailUrl={product.thumbnail_url}
            title={product.title}
            sku={product.sku}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {loading ? (
          <span className="text-sm text-gray-400">Loading more...</span>
        ) : visibleProducts.length >= allProducts.length ? (
          <span className="text-sm text-gray-400">No more products.</span>
        ) : null}
      </div>
    </div>
  );
};

export default Products;
