# Форми, які передають дані в Bitrix24 CRM

## Загальна інформація

Всі форми на сайті ALTEG UK відправляють дані в Bitrix24 через REST API (`crm.lead.add`). Перед створенням ліда виконується пошук існуючого контакту або компанії за телефоном/email. Якщо знайдено — лід прив'язується до контакту (`CONTACT_ID`) або компанії (`COMPANY_ID`), і відповідальний (`ASSIGNED_BY_ID`) береться з контакту/компанії. Якщо не знайдено — використовується `NEXT_PUBLIC_BITRIX24_USER_ID` з `.env`.

---

## 1. Форма зв'язку (Contact Form)

**API маршрут:** `POST /api/contact`  
**Компонент:** `components/shared/ContactModal.tsx`, `components/landing/Footer.tsx` (модальне вікно)  
**Валідація:** `contactFormSchema` (`lib/utils/validators.ts`)

### Поля форми:
- **`name`** (string, обов'язкове, мін. 2 символи) — ім'я користувача
- **`phone`** (string, обов'язкове, мін. 10 цифр) — номер телефону
- **`interest`** (string, опціональне, мін. 3 символи якщо вказано) — що цікавить користувача

### Що передається в Bitrix24:

| Поле Bitrix24 | Значення | Примітки |
|---------------|----------|----------|
| `TITLE` | `"ALTEG UK Contact Form - {name}"` | Назва ліда |
| `NAME` | `{name}` | Ім'я з форми |
| `PHONE` | `[{ VALUE: phone, VALUE_TYPE: 'WORK' }]` | Телефон у форматі масиву |
| `EMAIL` | `[]` (порожній масив) | Email не збирається в цій формі |
| `COMMENTS` | Мультирядковий текст:<br>`"Contact Form Inquiry\n\nName: {name}\nPhone: {phone}\n\nWhat interests them:\n{interest}"` | Коментар з усією інформацією |
| `SOURCE_ID` | `"WEB"` | Джерело — веб-сайт |
| `SOURCE_DESCRIPTION` | `"Website Contact Form"` | Опис джерела |
| `CONTACT_ID` | ID існуючого контакту (якщо знайдено за телефоном) | Автоматично, якщо контакт існує |
| `COMPANY_ID` | ID існуючої компанії (якщо знайдено за телефоном) | Автоматично, якщо компанія існує |
| `ASSIGNED_BY_ID` | ID відповідального з контакту/компанії або `NEXT_PUBLIC_BITRIX24_USER_ID` | Автоматично |

---

## 2. Форма замовлення (Order Form)

**API маршрут:** `POST /api/order`  
**Компонент:** `components/forms/OrderForm.tsx` (сторінка `/checkout`)  
**Валідація:** `orderSchema` (`lib/utils/validators.ts`)

### Поля форми:

#### Клієнт (`customer`):
- **`name`** (string, обов'язкове) — ім'я клієнта
- **`email`** (string, обов'язкове, email формат) — email клієнта
- **`phone`** (string, обов'язкове, мін. 10 цифр) — телефон клієнта
- **`company`** (string, опціональне) — назва компанії
- **`address.street`** (string, обов'язкове) — вулиця
- **`address.city`** (string, обов'язкове) — місто
- **`address.postcode`** (string, обов'язкове, мін. 5 символів) — поштовий індекс
- **`address.country`** (string, опціональне, за замовчуванням "United Kingdom") — країна

#### Доставка (`delivery`):
- **`postcode`** (string, обов'язкове) — поштовий індекс доставки
- **`method`** (enum: 'standard' | 'express' | 'collection', за замовчуванням 'standard') — метод доставки
- **`instructions`** (string, опціональне) — інструкції для доставки

#### Інше:
- **`cart`** (array) — масив товарів у кошику (кожен товар містить: `product`, `length`, `quantity`, `calculatedPrice`, `calculatedWeight`)
- **`subtotal`** (number) — підсумок без доставки
- **`deliveryCost`** (number) — вартість доставки
- **`total`** (number) — загальна сума замовлення
- **`totalWeight`** (number) — загальна вага замовлення (кг)
- **`isWholesale`** (boolean) — чи це оптове замовлення
- **`notes`** (string, опціональне) — примітки до замовлення

### Що передається в Bitrix24:

| Поле Bitrix24 | Значення | Примітки |
|---------------|----------|----------|
| `TITLE` | `"ALTEG UK Order - {customer.name}"` | Назва ліда |
| `NAME` | `{customer.name}` | Ім'я клієнта |
| `COMPANY_TITLE` | `{customer.company}` | Назва компанії (якщо вказана) |
| `EMAIL` | `[{ VALUE: customer.email, VALUE_TYPE: 'WORK' }]` | Email клієнта |
| `PHONE` | `[{ VALUE: customer.phone, VALUE_TYPE: 'WORK' }]` | Телефон клієнта |
| `ADDRESS` | `{customer.address.street}` | Вулиця адреси |
| `ADDRESS_CITY` | `{customer.address.city}` | Місто |
| `ADDRESS_POSTAL_CODE` | `{customer.address.postcode}` | Поштовий індекс |
| `COMMENTS` | Форматований текст з деталями замовлення:<br>`"Order Details:\nCustomer: {name}\nCompany: {company} (якщо є)\nEmail: {email}\nPhone: {phone}\n\nProducts:\n1. {product.name} ({dimensions})\n   Length: {length}m x Quantity: {quantity}\n...\n\nTotal Weight: {totalWeight}kg\nTotal Amount: £{total}\nNote: {notes} (якщо є)"` | Повний опис замовлення |
| `SOURCE_ID` | `"WEB"` | Джерело — веб-сайт |
| `SOURCE_DESCRIPTION` | `"Website Order"` | Опис джерела |
| `UF_CRM_ORDER_WEIGHT` | `{totalWeight.toFixed(2)}` | Вага замовлення (кг) — користувацьке поле |
| `UF_CRM_ORDER_TOTAL` | `{total.toFixed(2)}` | Сума замовлення (£) — користувацьке поле |
| `UF_CRM_PRODUCT_LIST` | `"{product.name} ({dimensions}) - {length}m x {quantity}; {product2}..."` | Список товарів через `;` — користувацьке поле |
| `CONTACT_ID` | ID існуючого контакту (якщо знайдено за телефоном/email) | Автоматично |
| `COMPANY_ID` | ID існуючої компанії (якщо знайдено за телефоном/email) | Автоматично |
| `ASSIGNED_BY_ID` | ID відповідального з контакту/компанії або `NEXT_PUBLIC_BITRIX24_USER_ID` | Автоматично |

---

## 3. Форма Wholesale Inquiry (Запит на оптову поставку)

**API маршрут:** `POST /api/wholesale-inquiry`  
**Компонент:** `app/(marketing)/wholesale/page.tsx` (сторінка `/wholesale`)  
**Валідація:** `wholesaleFormSchema` (`lib/utils/validators.ts`)

### Поля форми:
- **`company`** (string, обов'язкове, мін. 2 символи) — назва компанії
- **`contactName`** (string, обов'язкове, мін. 2 символи) — ім'я контактної особи
- **`email`** (string, обов'язкове, email формат) — email компанії/контакту
- **`phone`** (string, обов'язкове, мін. 10 цифр) — телефон
- **`annualVolume`** (string, опціональне) — річний обсяг поставок
- **`productInterests`** (array of strings, опціональне) — масив назв продуктів, що цікавлять
- **`message`** (string, опціональне) — повідомлення/коментар
- **`attachmentUrl`** (string, опціональне) — URL вкладення (якщо завантажено файл)

### Що передається в Bitrix24:

| Поле Bitrix24 | Значення | Примітки |
|---------------|----------|----------|
| `TITLE` | `"ALTEG UK Wholesale Inquiry - {company}"` | Назва ліда |
| `NAME` | `{contactName}` | Ім'я контактної особи |
| `COMPANY_TITLE` | `{company}` | Назва компанії |
| `EMAIL` | `[{ VALUE: email, VALUE_TYPE: 'WORK' }]` | Email |
| `PHONE` | `[{ VALUE: phone, VALUE_TYPE: 'WORK' }]` | Телефон |
| `COMMENTS` | Мультирядковий текст:<br>`"Wholesale Inquiry\n\nCompany: {company}\nContact: {contactName}\nAnnual Volume: {annualVolume || 'Not specified'}\nProduct Interests: {productInterests.join(', ') || 'Not specified'}\n\nMessage:\n{message || 'No message provided'}\nAttachment: {attachmentUrl} (якщо є)"` | Коментар з усією інформацією |
| `SOURCE_ID` | `"WEB"` | Джерело — веб-сайт |
| `SOURCE_DESCRIPTION` | `"Website Wholesale Inquiry"` | Опис джерела |
| `CONTACT_ID` | ID існуючого контакту (якщо знайдено за телефоном/email) | Автоматично |
| `COMPANY_ID` | ID існуючої компанії (якщо знайдено за телефоном/email) | Автоматично |
| `ASSIGNED_BY_ID` | ID відповідального з контакту/компанії або `NEXT_PUBLIC_BITRIX24_USER_ID` | Автоматично |

---

## 4. Форма Quote Request (Запит на розрахунок)

**API маршрут:** `POST /api/quote`  
**Компонент:** `components/catalog/OrderCalculator.tsx` (форма "Request a quote")  
**Валідація:** `quoteRequestSchema` (`lib/utils/validators.ts`)

### Поля форми:

#### Клієнт (`customer`):
- **`name`** (string, обов'язкове) — ім'я клієнта
- **`email`** (string, обов'язкове, email формат) — email
- **`phone`** (string, обов'язкове, мін. 10 цифр) — телефон
- **`company`** (string, опціональне) — назва компанії
- **`address`** (object, опціональне) — адреса (street, city, postcode, country)

#### Інше:
- **`products`** (array) — масив товарів для розрахунку (кожен містить: `product`, `length`, `quantity`)
- **`totalWeight`** (number) — загальна вага (кг)
- **`estimatedTotal`** (number, опціональне) — орієнтовна сума
- **`isWholesale`** (boolean, за замовчуванням false) — чи це оптовий запит
- **`notes`** (string, опціональне) — примітки

### Що передається в Bitrix24:

| Поле Bitrix24 | Значення | Примітки |
|---------------|----------|----------|
| `TITLE` | `"ALTEG UK Quote Request - {customer.name}"` | Назва ліда |
| `NAME` | `{customer.name}` | Ім'я клієнта |
| `COMPANY_TITLE` | `{customer.company}` | Назва компанії (якщо вказана) |
| `EMAIL` | `[{ VALUE: customer.email, VALUE_TYPE: 'WORK' }]` | Email |
| `PHONE` | `[{ VALUE: customer.phone, VALUE_TYPE: 'WORK' }]` | Телефон |
| `COMMENTS` | Мультирядковий текст:<br>`"Quote Request - Wholesale: {isWholesale ? 'Yes' : 'No'}\nTotal Weight: {totalWeight.toFixed(2)}kg\n\nProducts:\n{product.name} ({dimensions}) - {length}m x {quantity}\n...\n\n{notes} (якщо є)"` | Коментар з деталями запиту |
| `SOURCE_ID` | `"WEB"` | Джерело — веб-сайт |
| `SOURCE_DESCRIPTION` | `"Website Quote Request"` | Опис джерела |
| `UF_CRM_ORDER_WEIGHT` | `{totalWeight.toFixed(2)}` | Вага (кг) — користувацьке поле |
| `UF_CRM_ORDER_TOTAL` | `{estimatedTotal.toFixed(2)}` | Орієнтовна сума (£) — користувацьке поле (якщо вказана) |
| `CONTACT_ID` | ID існуючого контакту (якщо знайдено за телефоном/email) | Автоматично |
| `COMPANY_ID` | ID існуючої компанії (якщо знайдено за телефоном/email) | Автоматично |
| `ASSIGNED_BY_ID` | ID відповідального з контакту/компанії або `NEXT_PUBLIC_BITRIX24_USER_ID` | Автоматично |

---

## Загальна логіка роботи з Bitrix24

### Пошук перед створенням ліда:

1. **По телефону** (якщо є):
   - Шукає контакт: `crm.contact.list` з фільтром `PHONE = нормалізований_номер`
   - Якщо не знайдено — шукає компанію: `crm.company.list` з фільтром `PHONE = нормалізований_номер`

2. **По email** (якщо є і контакт/компанія не знайдені):
   - Шукає контакт: `crm.contact.list` з фільтром `EMAIL = email`
   - Якщо не знайдено — шукає компанію: `crm.company.list` з фільтром `EMAIL = email`

3. **Створення ліда:**
   - Якщо знайдено контакт → встановлюється `CONTACT_ID` і `ASSIGNED_BY_ID` з контакту
   - Якщо знайдено компанію → встановлюється `COMPANY_ID` і `ASSIGNED_BY_ID` з компанії
   - Якщо нічого не знайдено → лід створюється без прив'язки, `ASSIGNED_BY_ID` береться з `NEXT_PUBLIC_BITRIX24_USER_ID`

### Нормалізація телефону:

Перед пошуком телефон нормалізується: видаляються всі нецифрові символи (пробіли, дефіси, дужки тощо). Наприклад:
- `+44 7441 429829` → `447441429829`
- `(07771) 656-297` → `07771656297`

---

## Файли коду

- **API routes:**
  - `app/api/contact/route.ts` — форма зв'язку
  - `app/api/order/route.ts` — форма замовлення
  - `app/api/wholesale-inquiry/route.ts` — форма wholesale
  - `app/api/quote/route.ts` — форма quote request

- **Сервіси Bitrix24:**
  - `lib/services/bitrix24.ts` — основна логіка (пошук контактів/компаній, створення лідів)
  - `lib/services/orders.ts` — обробка замовлень і quote (викликає Bitrix24)

- **Валідація:**
  - `lib/utils/validators.ts` — схеми валідації для всіх форм

---

## Примітки

- Всі форми також відправляють сповіщення в **Telegram** (якщо налаштовано `TELEGRAM_BOT_TOKEN` і `TELEGRAM_CHAT_ID`).
- Форма замовлення також зберігає дані в **локальну БД** (SQLite) перед відправкою в Bitrix24.
- Якщо Bitrix24 недоступний (помилка мережі/API), форми все одно повертають успіх користувачу, але дані не потрапляють в CRM (лишаються в Telegram і БД для замовлень).
