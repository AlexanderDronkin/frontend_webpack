'use strict'
import './env.mjs'
// объявляем плагины webpack
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import zlib from 'zlib'
// модификация конфига для сборки в продакшен
import config from './webpack.base.mjs'

// режим сборки для продакшена, меняет глобальные настройки webpack
config.mode = 'production'

// отключаем маппинг и дебаг
config.devtool = false

// все чанки в один файл с минификацией
config.optimization = {
  minimizer: [
    // можно использовать разные минификаторы на выбор
    // TerserPlugin, uglifyJs, MiniCss, css-minimizer и т.д.
    // css-minimizer дает наилучший результат по размеру файла css

    // минификатор для js
    new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      // minify: TerserPlugin.uglifyJsMinify,
      // minify: TerserPlugin.swcMinify,
      // в настройках минификатора указываем не создавать файлы с лицензиями
      terserOptions: {
        compress: true,
        format: {
          comments: false
        }
      },
      extractComments: false
    }),

    // postcss минификатор, дает наилучший результат
    new CssMinimizerPlugin({
      minify: [
        CssMinimizerPlugin.cssnanoMinify,
        CssMinimizerPlugin.cleanCssMinify,
        CssMinimizerPlugin.cssoMinify,
      ],
      minimizerOptions: [
        {
          test: /\.css$/i,
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        { compatibility: '*' }
      ]
    })
  ]
}

// делаем сжатые версии
config.plugins.push(
  new CompressionPlugin({
    test: /.(js|css|svg)$/,
    filename: '[path][base].gz',
    minRatio: 0.8
  }),
  new CompressionPlugin({
    test: /.(js|css|svg)$/,
    filename: '[path][base].br',
    algorithm: 'brotliCompress',
    minRatio: 0.8,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    }
  })
)

export default config
