// Тип продукта
export type Product = {
	id: number;
	name: string;
	title: string;
	description: string;
	price: number;
	image: string;
	category: string;
}

// Тип списка продуктов
export type ProductList = {
	products: Product[];
}


// Интерфейс для запроса создания заказа
export interface IOrder {
	payment: 'онлайн' | 'при получении';
	items: Array<Product>;
	phone: string;
	address: string;
	email: string;
	total: number;
}

// class Order implements IOrder {
// 	payment: 'card' | 'cash';
// 	items: Array<Product>;
// 	phone: string;
// 	address: string;
// 	email: string;
// 	total: number;

// 	constructor(order: Order) {
// 		this.payment = order.payment;
// 		this.items = order.items;
// 		this.phone = order.phone;
// 		this.address = order.address;
// 		this.email = order.email;
// 		this.total = order.total;
// 	}
// }

// // Интерфейс слушателя событий
// export interface IEventEmitter {
// 	on(eventName: string, callback: (data: unknown) => void): void;
// 	emit(eventName: string, data: unknown): void;
// 	trigger(eventName: string, context?: unknown): (data: unknown) => void;
// }

// // Интерфейс для модели корзины
// export interface IOrderModel {
// 	addProduct(product: Product): void;
// 	removeProduct(productId: number): void;
// 	calculateTotal(): number;
// 	getItems(): Array<Product>;
//   validate(): boolean;
// }

// //Интерфейс базового класса отображенияx
// export interface IView {  
//   buttonActiveState(element: HTMLElement, state: boolean): void;
// 	render(data?: object): HTMLElement;
// }

// // Интерфейс для компонента, отображающего продукт
// export interface ProductView extends IView {
	
// }

// // Интерфейс для компонентов, отображающих список продуктов
// export interface ProductListView {
// 	render(products: Product[]): void;
// }

