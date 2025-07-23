import { useEffect, useRef } from "react";
import { useProductStore } from "@/stores/productStore";
import { ProductCard } from "./components/ProductCard";
import ProductHeader from "./components/ProductHeader";
import { useSidebar } from "@/components/ui/sidebar";

const Products = () => {
  const { open } = useSidebar();
  const { products, fetchProducts, loading, hasMore, error } = useProductStore();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedInitially = useRef(false);

  useEffect(() => {
    if (!hasFetchedInitially.current) {
      fetchProducts();
      hasFetchedInitially.current = true;
    }
  }, [fetchProducts]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore) {
          fetchProducts();
        }
      },
      { rootMargin: "100px" }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading, hasMore, fetchProducts]);

  console.log("Products:", products);

  return (
    <div className="space-y-4">
      <ProductHeader />

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${open ? "lg:grid-cols-4" : "lg:grid-cols-5"} gap-4 mt-4 place-items-center`}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product}  />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {loading ? <span className="text-sm text-gray-400">Loading more...</span> : !hasMore ? <span className="text-sm text-gray-400">No more products.</span> : null}
      </div>

      {error && <div className="text-sm text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default Products;
