import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useProductStore } from "@/stores/productStore";
import { toast } from "sonner";
import type { Product } from "../types";

type Props = {
  product: Product;
  onShowModalEdit: () => void;
};

const DeleteProduct = ({ product, onShowModalEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const deleteProduct = useProductStore((s) => s.deleteProduct)

  const handleDelete = async () => {
    await deleteProduct(product.sku);
    toast.success(`Product "${product.title}" has been deleted`);
    setOpen(false);
    onShowModalEdit();
  };

  const handleClose = () => {
    setOpen(!open);
    onShowModalEdit();
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{product.title}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, delete it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-500/90"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Trash />
      </Button>
    </>
  );
};

export default DeleteProduct;
