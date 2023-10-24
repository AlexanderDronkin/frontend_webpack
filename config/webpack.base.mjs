'use strict'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as dir from './env.mjs'
import plugins from './webpack.plugins.mjs'

// базовая конфигурация webpack
export default {
  // конфигурация тестового сервера
  mode: 'development',

  entry: {
    // вендорные модули и стили в отдельной сущности
    vendors: {
      import: [
        /**
         * В основном как полифил async/await
         * {@link https://github.com/facebook/regenerator/tree/main/packages/runtime}
         */
        '@babel/runtime/regenerator',
        /**
         * Работа декораторов
         * {@link https://github.com/rbuckton/reflect-metadata}
         */
        'reflect-metadata',
        /**
         * DI - менеджер зависимостей
         * @requires reflect-metadata
         * {@link https://github.com/microsoft/tsyringe}
         */
        'tsyringe',
        /**
         * Полифил для fetch
         * {@link https://github.com/whatwg/fetch}
         */
        'whatwg-fetch',
        /**
         * Работа с куки
         * {@link https://github.com/aoiste/cookies-ts}
         */
        'cookies-ts',
        /**
         * Работа с v-dom
         * {@link https://github.com/snabbdom/snabbdom}
         */
        'snabbdom',
        /**
         * Type-save event emmiter
         * {@link https://github.com/Morglod/tseep}
         */
        'tseep',
        /**
         * Слайдер
         * {@link https://swiperjs.com/}
         */
        'swiper',
        // стили сторонних библиотек
        `${dir.scss}/vendors.scss`
      ],
      filename: 'js/[name].js'
    },
    // десктоп и мобилка
    app: {
      import: [
        `${dir.src}/index.ts`,
      ],
      filename: 'js/[name].js',
      // компонент будет загружен после vendors
      dependOn: 'vendors'
    }
  },

  // управление выводом
  // в режиме разработки файлы хранятся в оперативной памяти и не сохраняются в /dist/
  output: {
    // все скрипты будут определены в окружении по названию в глобальной переменной
    // library: 'App',
    // libraryTarget: 'var',
    // очистить папку dist перед сборкой (build)
    clean: true,
    // папка для экспорта
    path: dir.dist,
    // у всех файлов указаны абсолютные пути для devTools
    devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
    // настройки для всех файлов с типом asset, перемещаем в media
    assetModuleFilename: 'media/[name][ext]'
  },

  // маппинг кода на исходные файлы
  devtool: 'inline-source-map',

  // настройки тестового сервера для разработки
  devServer: {
    // опции сервера берутся из .env
    host: process.env.WEBPACK_DEV_IP,
    port: process.env.WEBPACK_DEV_PORT,
    // игнорируем домен
    allowedHosts: 'all',
    // папка upload проксируется на сайт для загрузки статики
    proxy: {
      '/upload': 'https://www.podrygka.ru/'
    },
    // опции клиента
    client: {
      // можно отключить вывод ошибок, если мешает
      progress: true,
      overlay: true,
      logging: 'verbose'
    },
    // настройки автоматического обновления страницы при изменении файла
    hot: true,
    watchFiles: [`${dir.assets}/**/*`, `${dir.static}/**/*`],
    // сервер отдает статику из папки dist
    // dist/example.png -> localhost:8080/example.png
    static: dir.dist,
    // заголовки ответа сервера разрешающие CORS на любой домен
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  // построение зависимостей
  resolve: {
    // форматы файлов, которые автоматически импортируются
    // пример: import './dir/file'
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    plugins: [
      // транспайл зависимостей typescript->javascript
      // этот плагин должен быть размещен только здесь
      // берем алиасы директорий из конфига typescript
      new TsconfigPathsPlugin({
        baseUrl: dir.src,
        extensions: ['.ts', '.tsx', '.js', '.json'],
        configFile: `${dir.src}/tsconfig.json`
      })
    ],
    // определяем папку с node модулями
    modules: [`${dir.root}/node_modules`],
    // алиас папок для стилей, для ts они прописаны в tsconfig.json
    alias: {
      // url("~images/img.png") = url("~assets/images/img.png")
      fonts: `${dir.assets}/fonts`,
      images: `${dir.assets}/images`,
      svg: `${dir.assets}/svg`
    },
    // агрессивный кеш node_modules для оптимизации сборки
    unsafeCache: true
  },

  module: {
    // правила применяются от последнего к первому
    rules: [
      // обработка ts компонентов и скриптов
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // даунгрейд javascript
          {
            loader: 'babel-loader',
            options: {
              configFile: `${dir.config}/.babelrc`
            }
          },
          // typescript->javascript
          {
            loader: 'ts-loader',
            options: {
              // только трансплайт кода
              // это влияет на время сборки
              transpileOnly: true
            }
          },
          // импорт и объявление глобальных зависимостей
          {
            loader: 'imports-loader',
            options: {
              imports: [
                // полифил reflect-metadata для работы DI
                'side-effects reflect-metadata',
                // полифил для fetch
                'side-effects whatwg-fetch'
              ]
            }
          }
        ]
      },
      // правила для обычных js скриптов
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: `${dir.config}/.babelrc`
            }
          }
        ]
      },
      // правила для стилей
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // минимизация стилей, можно подключить style-loader
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          // полифилы и префиксы для css
          // настойки в postcss.config.js
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: `${dir.config}/postcss.config.js`
              },
              sourceMap: true
            }
          },
          // scss->css
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          // модуль позволяет импортировать стили по папкам типа /**/*.scss
          // заменяет регулярные выражения на отдельные @import file
          'import-glob-loader?+nodir'
        ]
      },
      // ассеты объявлены отдельным типом
      // если файл меньше 12kb, он будет вставлен как data:image
      // если в пути к файлу в конце есть ?url то это всегда файл
      // background-image: url("~assets/svg/gear.svg?url")
      {
        test: /\.(png|jpg|gif|svg|woff2?|otf|eot|ttf)$/,
        oneOf: [
          {
            resourceQuery: /url/,
            type: 'asset/resource'
          },
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 12 * 1024 // 12kb
              }
            }
          }
        ]
      },
      // шаблоны EJS
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          esModule: false
        }
      },
      // шаблоны pug/jade
      {
        test: /\.(pug|jade)$/,
        loader: 'pug-loader',
        options: {
          self: true
        }
      }
    ]
  },

  // общие настройки оптимизации только для режима разработки
  optimization: {
    // отдельный чанк только для разработки
    // здесь только скрипты для работы webpack
    runtimeChunk: {
      name: 'js/runtime'
    },
    // отдельный чанк для разработки с вендорными скриптами
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          type: 'javascript/auto',
          idHint: 'vendors',
          // суффикс runtime нужен потому что у нас уже есть vendors.js
          name: 'js/vendors.runtime',
          chunks: 'all'
        }
      }
    }
  },

  // добавляем плагины
  plugins: plugins
}
