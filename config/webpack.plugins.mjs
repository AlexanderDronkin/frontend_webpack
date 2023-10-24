'use strict'
import * as fs from 'fs'
import * as dir from './env.mjs'
// объявляем плагины webpack
import { BundleStatsWebpackPlugin } from 'bundle-stats-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

// создаем массив статичных html страниц для добавления в сборку
// const PAGES = fs
//   .readdirSync(dir.templates)
//   .filter((fileName) => fileName.match(/\.(pug|jade|ejs)/))

const PAGES = ['checkout.pug', 'checkout-empty.pug']

// объявление плагинов
export default [
  // статистика сборки
  new BundleStatsWebpackPlugin(),
  // плагин позволяет всегда сохранять копию в файлы
  new HtmlWebpackHarddiskPlugin(),
  // все стили собираем в файлы по шаблону
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[id].css'
  }),
  // автоматически импортируем модули: Underscore
  new webpack.ProvidePlugin({
    _: 'underscore'
  }),
  // копируем картинки статики из папки img
  new CopyPlugin({
    patterns: [{
      from: `${dir.templates}/img`,
      to: `${dir.dist}/img`,
      noErrorOnMissing: true
    }]
  }),
  // копируем папку api с mock данными
  new CopyPlugin({
    patterns: [{
      from: `${dir.templates}/api`,
      to: `${dir.dist}/api`,
      noErrorOnMissing: true
    }]
  }),
  // собираем статику в отдельные страницы
  ...PAGES.map(
    (page) => new HtmlWebpackPlugin({
      template: `${dir.templates}/${page}`,
      filename: `./${page.replace(/\.(pug|jade|ejs)/, '.html')}`,
      title: 'Подружка Frontend ' + process.env.npm_package_version,
      inject: false,
      hash: false,
      minify: false,
      alwaysWriteToDisk: true,
      version: process.env.npm_package_version
    })
  )
]
