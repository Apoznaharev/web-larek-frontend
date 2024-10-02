import { IOrder } from '../types';
import { Component } from './base/Component';
import { ensureElement, ensureAllElements } from '../utils/utils';
import { EventEmitter } from './base/events';

export class Basket extends Component<IOrder> {
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

	set total(value: number) {
		this._total.textContent = value.toString();
    if (value === 0) {
      this._submit.disabled = true;
    } else {
      this._submit.disabled = false;
    }
	}

  listUpdate(items: HTMLElement[]) {
    this._list.forEach((parent) => parent.replaceChildren(...items));
  }

	refreshIndices() {
      this._list.forEach((list) => {
        list.querySelectorAll(`.basket__item-index`).forEach( (item, index)  => {
          item.textContent = (index+1).toString()
        })
      })
		}	}

