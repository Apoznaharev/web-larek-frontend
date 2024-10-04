import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

interface ISuccess {
	description: number;
}

export class Success extends Component<ISuccess> {
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this._description = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);
		this._button = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);

		this._button.addEventListener('click', () => {
			events.emit('success:close', this);
		});
	}

	set description(value: string) {
		this.setText(this._description, `Списано ${value} синапсов!`);
	}
}
