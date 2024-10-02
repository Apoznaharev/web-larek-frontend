import { Api } from './base/api';
import { IProduct } from '../types/index';

export interface IProductApi {
	getProducts(): Promise<IProduct[]>;

}
export type ApiResponse<Type> = {
	total: number;
	items: Type[];
}

export interface ApiItemRespone {
	promiseResult: object;
}

export class ProductApi extends Api implements IProductApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiResponse<IProduct>) => 
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
}
