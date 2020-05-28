import Vue from 'vue'
import VueI18N from 'vue-i18n'
import EN from './en.js'
import CN from './cn.js'
import {
  getLocale,
  saveLocale
} from '../utils/localstorage.js'
Vue.use(VueI18N)
const messages = {
  EN,
  CN
}
let locale = getLocale()
if (!locale) {
  locale = 'CN'
  saveLocale(locale)
}
const i18n = new VueI18N({
  locale,
  messages
})
export default i18n
