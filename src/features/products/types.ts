export type Product = {
  id?: string;
  title: string;
  sku: string;
  thumbnail_url: string;
  price: number;
  stock: number;
  description?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ResponseMessageSuccess = {
  data?: {
    message?: string
  }
}