import ApiService from "@/services/index";

class ProductsService extends ApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL as string);
  };
  async getProductsList(limit: number = 30, skip: number = 0): Promise<any> {
    return this.get(`/products?limit=${limit}&skip=${skip}`);
  };
  async getProductById(productId: number):Promise<any>{
    return this.get(`/products/${productId}`);
  };
}

export const productsApi = new ProductsService();
