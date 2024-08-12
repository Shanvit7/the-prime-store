import ApiService from "@/app/services/index";


class ProductsService extends ApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL);
  }

  async getProductsList(): Promise<any> {
    return this.get('/products');
  }
}

export const productsApi = new ProductsService();
