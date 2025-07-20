import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AddProductContent = () => {
  return (
    <Card className="space-y-6">
      <img src="/assets/images/home-banner.webp" alt="home-banner" className="h-80 w-full object-cover rounded-md" />
      <h2 className="text-lg font-semibold mb-2">Add your product</h2>
      <p className="text-sm text-gray-600 mb-4">You can add your products here.</p>
      <Button asChild>
        <Link to="/products">Go to products page</Link>
      </Button>
    </Card>
  );
};

export default AddProductContent;
