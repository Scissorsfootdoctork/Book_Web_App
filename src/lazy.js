import Vue from 'vue'
import lazyload from 'vue-lazyload'

Vue.use(lazyload, {
  error: require('./assets/logo.png'),
  loading: require('./assets/logo.png')
})
