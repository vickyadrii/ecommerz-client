import AddProduct from "./AddProduct";

const ProductHeader = () => {
  return (
    <div className="flex justify-between items-center gap-4">
      <h3 className="font-bold md:text-lg text-md">Products</h3>

      <AddProduct />
    </div>
  );
};

export default ProductHeader;
