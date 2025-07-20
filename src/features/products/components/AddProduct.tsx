import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddProductForm from "./AddProductForm";
import { DialogDescription } from "@radix-ui/react-dialog";


const AddProduct = () => {
  return (
    <div>
      <Dialog>
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
          <AddProductForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
