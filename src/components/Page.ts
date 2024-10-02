import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

interface IPage {
	catalog: HTMLAreaElement[];
}

export class Page extends Component<IPage> {
	protected _gallery: HTMLAreaElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLButtonElement;
	protected _counter: HTMLElement;

	constructor(container: HTMLElement, actions?: EventEmitter) {
		super(container);
		this._gallery = ensureElement<HTMLAreaElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLButtonElement>('.header__basket');
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._basket.addEventListener('click', () => {
			actions.emit('basket:open');
		})
	}

	set galary(items: HTMLElement[]) {
		this._gallery.append(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}

	setCounterZero() {
		this._counter.textContent = '0';
	}
}
