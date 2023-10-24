// настройки PostCSS
module.exports = {
  plugins: [
    /**
     * Добавляет в каждый блок all: initial, для изоляции от других стилей
     * {@link https://github.com/maximkoretskiy/postcss-autoreset}
     * @deprecated не работает с nodejs 18, ждем фикс
     */
    // require('postcss-autoreset'),

    /**
     * Автопрефиксы для поддержки старых браузеров ("-moz-*", "-ms-*", "-webkit-*", ...)
     * {@link https://github.com/postcss/autoprefixer}
     */
    require('autoprefixer'),

    /**
     * Полифил для дочерних элементов объявленных с &
     * {@link https://github.com/postcss/postcss-nested}
     */
    require('postcss-nested'),

    /**
     * Создание svg в css
     * Настройки: всегда кодировать в base64
     * {@link https://github.com/csstools/postcss-write-svg}
     */
    require('postcss-write-svg')({ utf8: false }),

    /**
     * Полифил для загрузки svg inline и изменения его свойств
     * Настройки: всегда кодировать в base64
     * {@link https://github.com/TrySound/postcss-inline-svg}
     */
    require('postcss-inline-svg')({
      encode: (svg) => Buffer.from(svg).toString('base64'),
      transform: (encoded) => `"data:image/svg+xml;base64,${encoded}"`
    }),


    /**
     * Минификация svg добавленных в стили через data:image/
     * {@link https://github.com/cssnano/cssnano/tree/master/packages/postcss-svgo}
     */
    require('postcss-svgo'),

    /**
     * Полифил для двойного свойства display
     * {@link https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-normalize-display-values}
     */
    require('@csstools/postcss-normalize-display-values'),
    
    /**
     * Полифил для большого количества новых возможностей в css
     * {@link https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env}
     *
     * Список доступных фич, mustread!
     * {@link https://cssdb.org/}
     */
    require('postcss-preset-env')
  ]
}
