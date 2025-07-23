import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductForm from "./ProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { Product } from "../types";
import { useProductStore } from "@/stores/productStore";
import { toast } from "sonner";
import DeleteProduct from "./DeleteProduct";

type Props = {
  children?: React.ReactNode;
  product: Product;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductCard = ({ className, children, product, ...props }: Props) => {
  const [open, setOpen] = useState(false);
  const editProduct = useProductStore((s) => s.editProduct);

  const handleShowModal = () => {
    setOpen((prev) => !prev);
  };

  const handleOnSubmit = async (values: Product) => {
    await editProduct(values.sku, values);
    toast.success("Product updated successfully");
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update your product details here.</DialogDescription>
          </DialogHeader>
          <ProductForm onShowModal={handleShowModal} defaultValues={product} onSubmit={handleOnSubmit} />
        </DialogContent>
      </Dialog>

      <div {...props} onClick={handleShowModal} className={cn("bg-white border rounded-md cursor-pointer hover:shadow", className)}>
        <div className="xl:w-60 w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden border-b rounded-t-md">
          <img
            src={product.thumbnail_url}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
            }}
            alt={product.title || "Product Image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          {product.title && <h2 className="md:text-base text-xs font-semibold mb-1 h-12 line-clamp-2">{product.title}</h2>}
          {product.sku && <div className="text-xs text-gray-500 font-semibold">SKU: {product.sku}</div>}
          {!!product.stock && <div className={`text-xs font-semibold ${product.stock > 0 ? "text-sky-600" : "text-rose-600"}`}>{product.stock > 0 ? `Stok: ${product.stock}` : "Stok habis"}</div>}
          {children}
        </div>
        <div className="border-t px-4 py-2 flex items-center justify-between">
          {!!product.price && <div className="text-base font-bold text-gray-800">Rp. {product.price.toLocaleString()}</div>}
          <DeleteProduct product={product} onShowModalEdit={handleShowModal} />
        </div>
      </div>
    </>
  );
};

export { ProductCard };
