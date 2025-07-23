import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useProductStore } from "@/stores/productStore";
import type { Product } from "../types";

const AddProduct = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleShowModal = () => {
    setOpen(!open);
  };

  const addProduct = useProductStore((s) => s.addProduct);

  const handleOnSubmit = async (values: Product) => {
    await addProduct(values);
    toast.success("Product added successfully");
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={handleShowModal}>
        <DialogTrigger>
          <Button>
            <Plus /> Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Add your new product here.</DialogDescription>
          </DialogHeader>
          <ProductForm onShowModal={handleShowModal} onSubmit={handleOnSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
