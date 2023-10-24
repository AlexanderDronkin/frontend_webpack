'use strict'
import { deleteAsync } from 'del'
import gulp from 'gulp'
import * as dir from './env.mjs'

// удаляем из папок назначения все файлы
gulp.task('deploy_clean', () => {
  return deleteAsync([
    dir.deployJs,
    dir.deployCss,
    dir.deployAssets
  ], { force: true })
})

// добавляем задачи по копированию файлов
gulp.task('deploy_copy_js', () => {
  return gulp.src(`${dir.dist}/js/*`).pipe(gulp.dest(dir.deployJs))
})
gulp.task('deploy_copy_css', () => {
  return gulp.src(`${dir.dist}/css/*`).pipe(gulp.dest(dir.deployCss))
})
gulp.task('deploy_copy_img', () => {
  return gulp.src(`${dir.dist}/media/**/*`).pipe(gulp.dest(dir.deployAssets))
})

// запускаем все задачи
gulp.task('deploy', gulp.series('deploy_clean', gulp.parallel('deploy_copy_js', 'deploy_copy_css', 'deploy_copy_img')))
