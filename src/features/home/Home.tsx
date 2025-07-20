import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <Card className="space-y-2">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <Button variant='ghost' className="font-medium">Edit your store name <Edit /></Button>

        <Card>
          <h2 className="text-lg font-semibold mb-2">Add your product</h2>
          <p className="text-sm text-gray-600 mb-4">You can add your products here.</p>
          <Button>Add Product</Button>
        </Card>
      </Card>
    </div>
  );
};

export default Home;
