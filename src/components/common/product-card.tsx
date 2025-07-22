import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  title?: string;
  sku?: string;
  thumbnail_url?: string;
  price?: number;
  stock?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductCard = ({ className, children, thumbnail_url = "", title, sku, price, stock, ...props }: Props) => {
  return (
    <div {...props} className={cn("bg-white border rounded-md", className)}>
      <div className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden border-b rounded-t-md">
        <img
          src={thumbnail_url}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; 
            target.src = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
          }}
          alt={title || "Product Image"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        {title && <h2 className="md:text-base text-xs font-semibold mb-1 h-12 line-clamp-2">{title}</h2>}
        {sku && <div className="text-xs text-gray-500 font-semibold">SKU: {sku}</div>}
        {children}
      </div>
      <div className="border-t px-4 py-2 flex items-center justify-between">
        {!!price && <div className="text-base font-bold text-gray-800">Rp{price.toLocaleString()}</div>}
        {!!stock && <div className={`text-xs font-semibold ${stock > 0 ? "text-sky-600" : "text-rose-600"}`}>{stock > 0 ? `Stok: ${stock}` : "Stok habis"}</div>}
      </div>
    </div>
  );
};

export { ProductCard };
