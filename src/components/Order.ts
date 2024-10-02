import { IProduct } from '../types/index';
import { IOrder, Payment } from '../types/index';

export class Order implements IOrder {
	payment: Payment = null;
	items: string[] = [];
	phone: string | null;
	address: string | null;
	email: string | null;
	total: number = 0;

	addProduct(item: IProduct) {
		if (!this.items.includes(item.id)) {
			this.items.push(item.id);
			item.inOrder = true;
			this.total += item.price;
		}
	}

	deleteProduct(item: IProduct) {
		if (this.items.includes(item.id)) {
			this.items.splice(this.items.indexOf(item.id), 1);
			item.inOrder = false;
			this.total -= item.price;
		}
	}

	clearPersonalInfo() {
		this.phone = null;
		this.address = null;
		this.email = null;
		this.payment = null;
	}
}
