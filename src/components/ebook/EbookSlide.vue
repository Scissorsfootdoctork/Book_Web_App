<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-show="menuVisible && settingVisible === 3"
    >
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component
                :is="currentTable === 1 ? content : bookmark"
              ></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTable === 1 }"
                @click="selectTab(1)"
              >
                {{ this.$t("book.navigation") }}
              </div>
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTable === 2 }"
                @click="selectTab(2)"
              >
                {{ this.$t("book.bookmark") }}
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <loading></loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMinx } from '../../utils/mixin.js'
import one from './EbookSlideContent.vue'
import two from './EbookSlideBookmark'
import loading from '../common/loading.vue'

export default {
  mixins: [ebookMinx],
  components: {
    loading
  },
  data () {
    return {
      currentTable: 1,
      content: one,
      bookmark: two
    }
  },
  methods: {
    selectTab (index) {
      this.currentTable = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";

.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 300;
  width: 100%;
  height: 100%;

  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;

    .content-page-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }

      .content-page-tab {
        flex: 0 0 px2rem(48);
        height: px2rem(48);
        width: 100%;
        display: flex;

        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          @include center;
        }
      }
    }

    .empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }

  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
