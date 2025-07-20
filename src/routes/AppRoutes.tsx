import { AppLayout } from "@/layouts";
import { Route, Routes } from "react-router";
import { HomePage, ProductsPage } from "@/pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
