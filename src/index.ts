import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ProductApi } from './components/ProductAPI';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Card, CardBase } from './components/Card';
import { IProduct } from './types/index';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { Order } from './components/Order';
import { Basket } from './components/Basket';
import { Success } from './components/common/Success';
import { Аddress, Contact } from './components/PersonalInfo';

// Базовые переменные
const events = new EventEmitter();
const api = new ProductApi(CDN_URL, API_URL);
const page = new Page(document.body, events);
const order = new Order();
const counter = ensureElement<HTMLElement>('.header__basket-counter');

//Переменная каталога продуктов и вспомогательная функция получения продукта по id
let productList = [] as IProduct[];
const getProductById = (id: string) => {
	return productList.find((item: IProduct) => item.id === id);
};

// Шаблоны
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const cardGaleryTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// Представления
const basketView = new Basket(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')),
	events
);
const orderAddress = new Аddress(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#order')),
	events
);
const orderContact = new Contact(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')),
	events
);
const succsess = new Success(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#success')),
	events
);

// Открытие и рендер корзины
events.on('basket:open', () => {
	basketView.listUpdate(
		order.items.map((item: string) => {
			const card = new CardBase(cloneTemplate(cardBasketTemplate), events);
			return card.render(getProductById(item));
		})
	);
	basketView.refreshIndices();
	modal.render({ content: basketView.render(order) });
});

// Удаление объектов из корзины и обновление представления
events.on('basket:deleteProduct', (item: CardBase) => {
	order.deleteProduct(getProductById(item.id));
	item.delete();
	counter.textContent = order.items.length.toString();
	basketView.refreshIndices();
	basketView.render(order);
});

// Переход к оформлению заказа из корзины
events.on('basket:submit', () => {
	modal.render({ content: orderAddress.render() });
});

// Переход к форме ввода телефона и почты
events.on('address:submit', (item: Аddress) => {
	order.address = item.address;
	order.payment = item.payment;
	modal.render({ content: orderContact.render() });
});

// Подтверждение ввода телефона и почты
events.on('contact:submit', (item: Contact) => {
	order.phone = item.phone;
	order.email = item.email;
	api
		.post('/order', order)
		.then(() => {
			order.clearPersonalInfo();
			orderAddress.clearForm();
			orderContact.clearForm();
			order.items.forEach((item: string) => {
				order.deleteProduct(getProductById(item));
			});
			page.setCounterZero();
		})
		.catch((err) => {
			console.log(err);
		});
	modal.render({ content: succsess.render({ description: order.total }) });
});

// Закрытие окна подтверждения покупки
events.on('success:close', () => {
	modal.close();
});

// Перерисовка галереи при обновлении каталога товаров
events.on('catalog:change', () => {
	page.galary = productList.map((item: IProduct) => {
		const card = new Card(cloneTemplate(cardGaleryTemplate), {
			onClick: () => events.emit('card:preview', item),
		});
		return card.render(item);
	});
});

// Представление карточки в полном виде
events.on('card:preview', (item: IProduct) => {
	const cardFull = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			order.addProduct(item);
			cardFull.render({ inOrder: true });
			counter.textContent = order.items.length.toString();
		},
	});
	modal.render({ content: cardFull.render(item) });
});

// Блокировка экрана при открытии модального окна
events.on('modal:open', () => {
	page.locked = true;
});

// Разблокировка экрана при открытии модального окна
events.on('modal:close', () => {
	page.locked = false;
});

// Получение каталога товаров с сервера
api
	.getProducts()
	.then((data) => {
		productList = data;
		events.emit('catalog:change', this);
	})
	.catch((err) => {
		console.error(err);
	});
