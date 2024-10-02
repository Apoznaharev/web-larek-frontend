import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface Iform {
	isValid: boolean;
	errors: string[];
}

export class Form<T> extends Component<Iform> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._submit = ensureElement<HTMLButtonElement>(
			'.button[type="submit"]',
			container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', container);
		this.container.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	onInputChange(field: keyof T, value: string) {
		this.events.emit('formInput:change', {
			field,
			value,
		});
	}
}
