'use strict'
import * as path from 'path'
import * as dotenv from 'dotenv'

// определяем где мы
const root = (path.basename(process.cwd()) === 'config') ? path.dirname(process.cwd()) : process.cwd()
const config = path.join(root, '/config')

// загружаем переменные окружения из файлов .env.default и перезаписываем из .env
dotenv.config({ path: `${config}/.env.default` })

// объявляем пути к главным папкам
export { root, config }
export const src = path.join(root, './src')
export const dist = path.join(root, './dist')
export const templates = path.join(root, './src/static')
export const assets = path.join(root, './src/assets')
export const scss = path.join(root, './src/scss')

// пути к папкам деплоя
export const deployPath = path.join(root, process.env.GULP_DEPLOY_PATH_ROOT)
export const deployJs = path.join(deployPath, process.env.GULP_DEPLOY_PATH_JS)
export const deployCss = path.join(deployPath, process.env.GULP_DEPLOY_PATH_CSS)
export const deployAssets = path.join(deployPath, process.env.GULP_DEPLOY_PATH_ASSETS)
