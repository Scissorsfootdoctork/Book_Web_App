import CreateApi from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/common/Toast'
import Popup from '../components/common/Popup'

Vue.use(CreateApi)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.mixin(
      {
          methods: {
              toast(setting) {
                  return this.$createToast({
                      $props: setting
                  })
              },
              simpleToast(text) {
                  const toast = this.toast({
                      text: text
                  })
                  toast.show()
              },
              popup(setting) {
                  return this.$createPopup({
                      $props: setting
                  })
              }
          }
      }
)
