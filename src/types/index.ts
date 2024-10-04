// Тип способа оплаты
export type Payment = 'Онлайн' | 'при получении' | null;

// Интерфейс объекта заказа
export interface IOrder {
	payment: Payment;
	items: Array<string>;
	phone: string;
	address: string;
	email: string;
	total: number;
}

// Интерфейс продукта
export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	category: string;
	inOrder?: boolean;
}
