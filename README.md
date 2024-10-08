# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

## Сборка

```
npm run build
```


## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.


## Архитектура проекта:

### Базовые классы
1. **`Api`**  
Назначение:
Базовый класс для работы с внешним API. Он выполняет запросы на получение и отправку данных.
Функции:
get(url: string): Выполняет get запрос к серверу.
post(url: string, data: object, method: ApiPostMethods = 'POST'): Отправляет на сервер информацию.

1. **`ApiProduct` наследуется от `Api`**  
Назначение:
Расширяет функционал Api под задачи проекта.
Функции:
getProducts(): Получает объекты товаров с сервера.

2. **`EventEmitter`**  
Назначение:
Этот класс реализует систему событий. Он позволяет подписываться на события и передавать данные между компонентами через события.
Функции:
emit(event: string, data?: any): Назначает событие и передает объект.
on(eventName: EventName, callback: (event: T) => void): Отрабатывает логику реализации события.
off(eventName: EventName, callback: Subscriber): Отменяет событие.

3. **`Components`**
Назначение:
Базовые класс для элементов представлениея.
setText(element: HTMLElement, value: unknown): Устанавливает текстовое значение для выбранного элемента
setImage(element: HTMLImageElement, src: string, alt?: string): Устанавливает изображение для выбранного элемента
render(data?: Partial<T>): Отрисовывает выбранный компонент

4. **`Model`**
Назначение:
Базовые класс для объектов.
хдл 


### Компоненты модели данных (бизнес-логика)

1. **`Order`**  
Назначение:
Компонент, который управляет корзиной пользователя. Хранит список товаров, добавленных в корзину, их количество и общую стоимость.
Содержит поля:
`payment`: 'онлайн' | 'при получении';
`items`: Array<string>;
`phone`: string;
`address`: string;
`email`: string;
`total`: number;
Методы: 
`addProduct` - добавляет товар в корзину
`deleteProduct` - удаляет товар из корзины
`clearPersonalInfo` - очищает данные пользователя. 


### Общие компоненты представления  

1. **`Form<T> extends Component<Iform>`**  
Назначение:
Базовые компонент для оформления заказа. Содержит назначение элементов ошибки и кнопки `submit`.


2. **`Modal extends Component<IModalData>`**  
Назначение:
Базовые компонент для открытия модальных окон. Содержит назначение элементов контейнера и кнопки закрытия модального окна.
`open` - метод открытия модального окна.
`close` - метод закрытия модального окна.
`render` - метод отрисовки и открытия модального окна.

3. **`Success extends Component<ISuccess>`**  
Модель отображения успешной отправки данных.


### Компоненты представления  
1. **`Page extends Component<IPage> `**  
Компонент отрисовки главной страницы. Содержит кнопку открытия корзины, счетчик товаров в корзине и галерею товаров.
`setCounterZero()` - Обнуляет счетчик, после отправки заказа на сервер

2. **`Basket extends Component<IOrder>`**  
Компонент представления корзины заказа. Отображает список выбранных товаров и их общую стоимость. 
`listUpdate(items: HTMLElement[])` - Обновляет отображение элементов галереи товаров.
`refreshIndices()` - обновляет индексы товаров в корзине при изменении их количества.

3. **`CardBase extends Component<IProduct>`**  
Компонент отрисовки карточки в рамках корзины. Принимает и отображает название товара, стоимость и кнопку "удалить из корзины"
`delete()` - удаляет товар из контейнера корзины.

4. **`Card extends CardBase`** 
Расширенный компонент карточки. Содержит все поля, а также, при наличии, отображает свойство `description`.

5. **`Аddress extends Form<IАddress>`**  
Компонент представления формы выбора способа оплаты и введения адреса.
`checkValid()` - проверяет наличие значения в полях, а также выбран ли способ оплаты
`clearForm()` - очищает введение значения в форме.

6. **` Contact extends Form<IContact> `**  
Компонент представления ввода телефона и почты.
`checkValid()` - проверяет наличие значения в полях, а также выбран ли способ оплаты
`clearForm()` - очищает введение значения в форме.


### Получаемые типы данных

```ts
type Product = {
	id: number;
	name: string;
	title: string;
	description: string;
	price: number;
	image: string;
	category: string;
}
type ProductList = {
	products: Product[];
}
```

### События в приложении

**Главная страница**
Загрузить список товаров
Открыть корзину
Открыть модальное окно товара

**Модальное окно товара:**
Нажать кнопку “Купить”
Модальное окно корзины:
Удалить товар
Оформить заказ

**Модальное окно оформление:**
Выбрать способ оплаты
Ввести адрес доставки
Нажать кнопку “Далее”

**Модальное окно покупки:**
Указать почту
Указать телефон
Нажать кнопку “Оплатить”

