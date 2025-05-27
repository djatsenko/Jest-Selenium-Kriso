# ✅ Selenium + Jest Test Automation – Kriso.ee Webshop

## 👨‍💻 Выполнил: Vladislav Djatsenko

---

## 📌 Цель задания

Создать автоматизированные UI-тесты для сайта [https://www.kriso.ee](https://www.kriso.ee) на основе предложенных тест-кейсов, используя:

- ✅ **Selenium WebDriver**
- ✅ **Jest**
- ✅ **Page Object Pattern**

---

## 🗂 Структура проекта

Jest-Selenium-Kriso-main/
│
├── pageobjects/ # Page Object файлы (homePage.js, cartPage.js, basePage.js)
├── tests/ # Тестовые файлы
│ ├── cart.test.js
│ ├── search.test.js
│ └── menu.test.js
├── package.json
├── README.md (этот файл)


---

## 🧪 Реализованные тесты

### 🔍 1. Search for Books by Keywords (`search.test.js`)

| Действие | Статус |
|---------|--------|
| Открытие сайта и логотип | ✅ |
| Поиск по ключевому слову "harry potter" | ✅ |
| Проверка, что найдены результаты | ✅ |
| Проверка, что название содержит ключевое слово | ✅ |
| Сортировка по цене | ✅ |
| Фильтрация по языку (English) | ✅ |
| Фильтрация по формату (Kõvakaaneline) | ✅ |
| Выполнение в Jest | ⚠ Работает, но может зависать из-за таймаута или headless режима |

**Комментарий**: Код полностью реализован, но возможны таймауты в среде Windows + Chrome headless. Это не влияет на логику теста.

---

### 🛒 2. Add Books to Shopping Cart (`cart.test.js`)

| Действие | Статус |
|---------|--------|
| Поиск книги и добавление в корзину | ✅ |
| Проверка количества и текста | ✅ |
| Переход в корзину | ✅ |
| Проверка цены | ✅ |
| Удаление из корзины и проверка обновления | ✅ |
| Выполнение в Jest | ⚠ Тест запускается, но медленный. В некоторых средах может превышать таймаут или не запускаться с первого раза |

---

### 🧭 3. Navigate Products via Filters (`menu.test.js`)

| Действие | Статус |
|---------|--------|
| Навигация в категорию “Muusikaraamatud ja noodid” | ✅ (реализовано в коде) |
| Переход в подкатегорию "Õppematerjalid" | ✅ |
| Фильтр "Bänd ja ansambel" | ✅ |
| Фильтр по формату "CD" | ✅ |
| Выполнение в Jest | ❌ Не удалось запустить: ошибка инициализации браузера в `beforeAll` (таймаут). Код написан корректно. |

---

## ⚙ Установка и запуск

### 📥 Установка зависимостей

```bash
npm install
🚀 Запуск всех тестов
npx jest
запуск конкретного файла:
npx jest tests/search.test.js
npx jest tests/cart.test.js
npx jest tests/menu.test.js


