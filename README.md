# To-do Week List

Недельный планировщик задач для тренировки тайм-менеджмента. Приложение помогает распределять задачи по дням недели, отслеживать приоритеты и хранить данные локально в браузере.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5-0170FE?logo=antdesign&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

**Демо:** [https://romochkasarychev-cell.github.io/To-do-week-list/](https://romochkasarychev-cell.github.io/To-do-week-list/)

## О проекте

Pet-проект с недельной Kanban-доской: задачи распределены по семи колонкам (понедельник — воскресенье). Интерфейс построен на React и [Ant Design](https://ant.design/) с русской локализацией.

Данные сохраняются в `localStorage` — сервер и база данных не требуются.

## Возможности

### Список задач
- Создание, редактирование и удаление задач
- Название, описание, день недели
- Приоритет: **высокий**, **средний**, **низкий** (с цветовой индикацией)
- Прикрепление файлов (до 2 МБ, хранение в браузере)
- Drag & drop между днями недели
- Фильтрация по дате создания

### Дашборды
- Общая статистика по задачам
- Распределение по дням недели
- Распределение по приоритетам
- Количество задач с вложениями

### Личный кабинет
- Профиль пользователя (имя и email)
- Сохранение данных профиля в `localStorage`

## Стек технологий

| Категория | Технология |
|-----------|------------|
| UI | React 18, Ant Design 5 |
| Сборка | Vite 6 |
| Даты | dayjs |
| Хранение | localStorage |

## Быстрый старт

### Требования

- [Node.js](https://nodejs.org/) 18+
- npm

### Установка и запуск

```bash
git clone https://github.com/romochkasarychev-cell/To-do-week-list.git
cd To-do-week-list
npm install
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173).

> **Windows / PowerShell:** если команда `npm` не работает из-за политики выполнения скриптов, используйте `npm.cmd`:
>
> ```bash
> npm.cmd install
> npm.cmd run dev
> ```

### Сборка для продакшена

```bash
npm run build
npm run preview
```

Собранные файлы будут в папке `dist/`.

## Деплой на GitHub Pages

При пуше в ветку `main` GitHub Actions автоматически собирает проект и публикует его на Pages.

1. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. После успешного workflow приложение доступно по адресу:
   [https://romochkasarychev-cell.github.io/To-do-week-list/](https://romochkasarychev-cell.github.io/To-do-week-list/)

## Структура проекта

```
src/
├── App.jsx                 # Layout и навигация по вкладкам
├── components/
│   ├── DayColumn.jsx       # Колонка дня (drop-зона)
│   ├── PriorityLabel.jsx   # Цветной бейдж приоритета
│   ├── TaskAttachment.jsx  # Блок вложения на карточке
│   ├── TaskCard.jsx        # Карточка задачи
│   ├── TaskModal.jsx       # Модалка создания / редактирования
│   └── WeekBoard.jsx       # Сетка из 7 дней
├── constants/
│   ├── days.js             # Дни недели
│   ├── files.js            # Лимиты для вложений
│   └── priority.js         # Уровни приоритета
├── hooks/
│   └── useTasks.js         # State задач + localStorage
├── pages/
│   ├── DashboardTab.jsx    # Вкладка «Дашборды»
│   ├── ProfileTab.jsx      # Вкладка «Личный кабинет»
│   └── TaskListTab.jsx     # Вкладка «Список задач»
└── utils/
    ├── fileAttachment.js   # Чтение и скачивание файлов
    ├── filterTasks.js      # Фильтр по дате
    ├── sortTasks.js        # Сортировка по приоритету
    └── taskStats.js        # Статистика для дашборда
```

## Ключи localStorage

| Ключ | Описание |
|------|----------|
| `todo-week-tasks` | Задачи по дням недели |
| `todo-week-profile` | Профиль пользователя |

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с hot reload |
| `npm run build` | Production-сборка |
| `npm run preview` | Просмотр production-сборки |

## История разработки

| Дата | Изменение |
|------|-----------|
| 22.10.2025 | Drag & drop между днями недели |
| 2026 | Переход на React + Ant Design |
| 2026 | localStorage, фильтр по датам |
| 2026 | Приоритеты, вложения, вкладки, редактирование |

## Лицензия

Учебный проект. Свободное использование.
