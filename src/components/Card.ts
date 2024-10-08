import { Component } from './base/Component';
import { IProduct } from '../types/index';
import { ensureElement } from '../utils/utils';
import { EventEmitter, IActions } from './base/events';

export class CardBase extends Component<IProduct> {
	protected _index?: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: EventEmitter) {
		super(container);
		if (container.querySelector('.basket__item-index')) {
			this._index = ensureElement<HTMLElement>(
				'.basket__item-index',
				container
			);
		}

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		if (container.querySelector('.basket__item-delete')) {
			this._button = ensureElement<HTMLButtonElement>(
				'.basket__item-delete',
				container
			);
			this._button.addEventListener('click', () =>
				actions.emit('basket:deleteProduct', this)
			);
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set index(value: number) {
		if (this._index) {
			this.setText(this._index, (value + 1).toString());
		}
	}

	set price(value: number) {
		this.setText(this._price, value);
		if (this._button) {
			if (value === null) {
				this.setDisabled(this._button, true);
				this.setText(this._button, 'Товар бесценен.');
			}
		}
	}

	delete() {
		this.container.remove();
	}
}

export class Card extends CardBase {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;

	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		if (container.querySelector('.card__button')) {
			this._button = ensureElement<HTMLButtonElement>(
				'.card__button',
				container
			);
		}
		if (container.querySelector('.card__text')) {
			this._description = ensureElement<HTMLElement>('.card__text', container);
		}
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set inOrder(value: boolean) {
		if (this._button) {
			if (value) {
				this.setDisabled(this._button, true);
				this.setText(this._button, 'В корзине');
			} else {
				this.setDisabled(this._button, false);
				this.setText(this._button, 'В корзину');
			}
		}
	}
}
