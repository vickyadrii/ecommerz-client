"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useProductStore } from "@/stores/productStore";

type Props = {
  onShowModal: () => void;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  thumbnail_url: z.string().refine(
    (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Thumbnail URL must be a valid URL" }
  ),
  price: z.string().min(0, "Price must be a positive number"),
  stock: z.string().min(0, "Stock must be a non-negative number"),
});

const AddProductForm = ({ onShowModal }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      sku: "",
      thumbnail_url: "",
      price: "0",
      stock: "0",
      description: "",
    },
  });
  const addProduct = useProductStore((s) => s.addProduct);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    };

    await addProduct(payload);
    form.reset();
    toast.success("Product added successfully");
    onShowModal();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Short sleeve t-shirt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the product in detail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Url</FormLabel>
              <FormControl>
                <Input placeholder="https://ecommerz.com/media/short-sleeve.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="SHRTSLV-005" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="200000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
