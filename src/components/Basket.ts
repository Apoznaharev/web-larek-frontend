import { IOrder } from '../types';
import { Component } from './base/Component';
import { ensureElement, ensureAllElements } from '../utils/utils';
import { EventEmitter } from './base/events';
import { Card, CardBase } from './Card';

export class Basket extends Component<IOrder> {
	cardList: CardBase[] = [];

	protected _list: HTMLElement[];
	protected _total: HTMLElement;
	protected _submit: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: EventEmitter) {
		super(container);

		this._list = ensureAllElements<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__price', container);
		this._submit = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);
		this._submit.addEventListener('click', () => {
			actions.emit('basket:submit', this);
		});
	}

	set list(items: HTMLElement[]) {
		this._list.forEach((parent) => parent.append(...items));
	}

	get list(): HTMLElement[] {
		return this._list;
	}

	set total(value: number) {
		this.setText(this._total, `${value.toString()} синапсов.`);
		this.setDisabled(this._submit, value === 0);
	}

	listUpdate(items: HTMLElement[]) {
		this._list.forEach((parent) => parent.replaceChildren(...items));
	}

	clearCardList() {
		this.cardList = [];
	}
}
