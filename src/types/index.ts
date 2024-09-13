export interface Product {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductList {
  products: Product[];
}

export interface Order {
  id: number;
  products: Array<Product>;
  total: number;
  status: "pending" | "completed" | "canceled";
}

// Интерфейс для API-клиента
export interface ApiClient {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product>;
  createOrder(order: CreateOrderRequest): Promise<Order>;
}

// Интерфейс для запроса создания заказа
export interface CreateOrderRequest {
  payment: "card" | "cash";
  items: Array<Product>;
  phone: string;
  address: string;  
  email: string;
  total: number;
}

// Интерфейс для модели продуктов
export interface ProductModel {
  fetchProducts(): Promise<Product[]>;
  fetchProductById(id: number): Promise<Product>;
}

// Интерфейс для модели корзины
export interface OrderModel {
  addProduct(product: Product): void;
  removeProduct(productId: number): void;
  getTotal(): number;
  getItems(): Array<OrderProduct>;
}

export interface OrderProduct {
  product: Product;
  quantity: number;
}

// Интерфейс для компонентов, отображающих список продуктов
export interface ProductListView {
  render(products: Product[]): void;
}

// Интерфейс для компонента, отображающего детали продукта
export interface ProductView {
  render(product: Product): void;
}

// Интерфейс для корзины
export interface View {
  render(OrderProducts: OrderProduct[], total: number): void;
}