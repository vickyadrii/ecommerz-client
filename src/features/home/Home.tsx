import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";
import AddProductContent from "./components/AddProductContent";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <Card className="space-y-2">
        <h1 className="text-2xl font-bold mb-4">Hello, welcome back!</h1>
        <Button variant='ghost' className="font-medium">Edit your store name <Edit /></Button>

        <AddProductContent />
      </Card>
    </div>
  );
};

export default Home;
