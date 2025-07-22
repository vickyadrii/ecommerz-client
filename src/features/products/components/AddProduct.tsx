import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddProductForm from "./AddProductForm";
import { DialogDescription } from "@radix-ui/react-dialog";


const AddProduct = () => {
  const [open, setOpen] = useState<boolean>(false);
  
  const handleShowModal = () => {
    setOpen(!open);
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
          <AddProductForm onShowModal={handleShowModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
