import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

interface IPage {
	catalog: HTMLAreaElement[];
	counter: string;
}

export class Page extends Component<IPage> {
	protected _gallery: HTMLAreaElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLButtonElement;
	_counter: HTMLElement;

	constructor(container: HTMLElement, actions?: EventEmitter) {
		super(container);
		this._gallery = ensureElement<HTMLAreaElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLButtonElement>('.header__basket');
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._basket.addEventListener('click', () => {
			actions.emit('basket:open');
		});
	}

	set galary(items: HTMLElement[]) {
		this._gallery.append(...items);
	}

	set counter(value: string) {
		this.setText(this._counter, value.toString());
	}

	setCounter(value: number) {
		this.setText(this._counter, value.toString());
	}

	set locked(value: boolean) {
		if (value) {
			this.toggleClass(this._wrapper, 'page__wrapper_locked', true);
		} else {
			this.toggleClass(this._wrapper, 'page__wrapper_locked', false);
		}
	}
}
