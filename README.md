
<h1>
    Frontend 
    <img src="https://img.shields.io/badge/2.1.0-green">
</h1> 

Заготовка для нового frontend приложения с правильно сконфигурированным webpack, postcss, линтерами и т.д. Старый путь для написания своего велосипеда до появления Vite, позволяет тонко настроить и оптимизировать сборку.

### Требования к платформе

[![node][node]][node-url] [![webpack][webpack]][webpack-url] [![webpack-cli][webpack-cli]][webpack-url] [![webpack-dev][webpack-dev]][webpack-url] [![gulp][gulp]][gulp-url]

### Установка
1. Установите последнюю версию [NodeJS][node-url] и [npm][node-url]. Для переключения версий можно использовать утилиту [nvm][nvm-url]
2. В папке `.frontend` выполните команду:
```shell
npm install
```
!!! info Все необходимые зависимости должны установиться автоматически.
    Так же можно дополнительно установить глобально `webpack` и `gulp`
    ```shell
    npm install -g webpack webpack-cli webpack-dev-server gulp
    ```
3. Установите линтеры для своей IDE: [ESLint][eslint-url] и [Stylelint][stylelint-url]

### Команды
- `npm run build` - собрать проект в папку dist
- `npm run dev` - запустить сервер для локальной разработки
- `npm run deploy` - собрать и выгрузить проект в корень сайта
- `npm run lint` - проверка кода на ошибки

!!! warning Проект должен обязательно проходить проверку линтерами перед релизом
    
### Структура проекта

```
dist - папка с собранным проектом
│───css - стили и их сжатые версии
│───js - скрипты
└───media - все ассеты
    index.html - примеры и документация
    ...

config - конфигурация сборщика
    .env - создайте файл для локального изменения настроек
    ...

src
├── assets
│   ├── fonts - шрифты
│   ├── images - растровая графика
│   └── svg - векторная графика
├── components - логика
│   ├── abstract - базовые абстрактные компоненты
│   ├── form - валидатор формы *in progress*
│   │   └── data - данные формы
│   ├── layout - компоненты привязанные к dom
│   ├── lib - функциональные компоненты
│   ├── popups - окна popup
│   └── sliders - слайдеры
│       Basket.ts - контроллер корзины (HOC)
│       Page.ts - контроллер страницы (HOC)
│       User.ts - контроллер данных пользователя (HOC)
├── scss - стили
│   ├── desktop
│   │   ├── popup - модальные окна
│   │   └── svg - для svg картинок собираемых в css
│   │   ...
│   └── mobile
│       ├── popup - модальные окна
│       └── svg - для svg картинок собираемых в css
│       ...
│   variables.scss - переменные
│   vendors.scss - вендорные стили
│   ...
└── static
    ├── img - файлы, которые нужны только в статике
    ├── layout
    ├── popups
    └── utils
        ...

package.json
README.md
```

[homepage]: http://localhost:8080
[node]: https://img.shields.io/badge/node-%3E%3D18.10.0-green
[node-url]: https://nodejs.org
[webpack]: https://img.shields.io/badge/webpack-%5E5.75.0-green
[webpack-cli]: https://img.shields.io/badge/webpack--cli-%5E5.0.1-green
[webpack-dev]: https://img.shields.io/badge/webpack--dev--server-%5E4.11.1-green
[webpack-url]: https://webpack.js.org/guides/getting-started/
[gulp]: https://img.shields.io/badge/gulp-%5E4.0.2-green
[gulp-url]: https://gulpjs.com/
[nvm-url]: https://github.com/nvm-sh/nvm
[npm-url]: https://www.npmjs.com/
[eslint-url]: https://eslint.org/docs/latest/user-guide/integrations
[stylelint-url]: https://stylelint.io/user-guide/integrations/editor
