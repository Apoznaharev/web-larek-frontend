import { Form } from './common/Form';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { Payment } from '../types/index';

interface IАddress {
	address: string;
	payment: Payment;
}

interface IContact {
	phone: string;
	email: string;
}

export class Аddress extends Form<IАddress> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _errors: HTMLElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._address = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			container
		);

		this._card = ensureElement<HTMLButtonElement>(
			'.button[name="card"]',
			container
		);
		this._cash = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			container
		);
		const toggleActive = (button: HTMLButtonElement) => () => {
			this.toggleClass(this._card, 'button_alt-active', button === this._card);
			this.toggleClass(this._cash, 'button_alt-active', button === this._cash);
			this.checkValid();
		};
		this._card.addEventListener('click', toggleActive(this._card));
		this._cash.addEventListener('click', toggleActive(this._cash));
		this._address.addEventListener('input', () => this.checkValid());
		this._submit.addEventListener(
			'click',
			events.emit.bind(events, 'address:submit', this)
		);
	}

	get address() {
		return this._address.value;
	}

	get payment(): Payment {
		const selectedPayment = this.container.querySelector('.button_alt-active');
		if (selectedPayment) {
			return selectedPayment.textContent as Payment;
		}
	}
	checkValid() {
		if (!this._address.value) {
			this.setText(this._errors, 'Укажите ваш адрес.');
			return (this._submit.disabled = true);
		}
		if (!this.container.querySelector('.button_alt-active')) {
			this.setText(this._errors, 'Укажите способ оплаты.');
			return (this._submit.disabled = true);
		}

		this.setText(this._errors, '');
		return (this._submit.disabled = false);
	}

	clearForm() {
		this._address.value = '';
		this.toggleClass(this._card, 'button_alt-active', false);
		this.toggleClass(this._cash, 'button_alt-active', false);
	}
}

export class Contact extends Form<IContact> {
	protected _errors: HTMLElement;
	protected _phone: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._phone = ensureElement<HTMLInputElement>(
			'input[name="phone"]',
			container
		);
		this._email = ensureElement<HTMLInputElement>(
			'input[name="email"]',
			container
		);
		this._email.addEventListener('input', () => this.chekValid());
		this._phone.addEventListener('input', () => this.chekValid());
		this._submit.addEventListener('click', (event) => {
			event.preventDefault();
			this.events.emit('contact:submit', this);
		});
	}

	get phone() {
		return this._phone.value;
	}

	get email() {
		return this._email.value;
	}

	chekValid() {
		if (!this._phone.value) {
			this.setText(this._errors, 'Укажите ваш телефон.');
			return (this._submit.disabled = true);
		}
		if (!this._email.value) {
			this.setText(this._errors, 'Укажите вашу почту.');
			return (this._submit.disabled = true);
		}

		this.setText(this._errors, '');
		return (this._submit.disabled = false);
	}

	clearForm() {
		this._phone.value = '';
		this._email.value = '';
	}
}
