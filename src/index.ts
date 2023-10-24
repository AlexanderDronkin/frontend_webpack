import * as di from 'tsyringe'
import { dispatch } from '@components/Event'

@di.singleton()
class Application {
  constructor () {
    setTimeout(dispatch('init'))
  }
}

module.hot?.accept()

const App = di.container.resolve(Application)
if (window) {
  Object.defineProperty(window, 'app', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: App
  } as PropertyDescriptor)
}

export default App
