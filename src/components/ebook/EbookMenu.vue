<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': !menuVisible || settingVisible >= 0 }"
        v-show="menuVisible"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <settingFont></settingFont>
    <EbookSettingFontPopup></EbookSettingFontPopup>
    <ebookSettingTheme></ebookSettingTheme>
    <EbookSettingProgress></EbookSettingProgress>
    <EbookSlide></EbookSlide>
  </div>
</template>

<script>
import { ebookMinx } from '../../utils/mixin'
import settingFont from './EbookSettingFont.vue'
import ebookSettingTheme from './ebookSettingTheme.vue'
import EbookSettingFontPopup from './EbookSettingFontPopup.vue'
import EbookSettingProgress from './EbookSettingProgress.vue'
import EbookSlide from './EbookSlide.vue'
export default {
  components: {
    settingFont,
    EbookSettingFontPopup,
    ebookSettingTheme,
    EbookSettingProgress,
    EbookSlide
  },
  mixins: [ebookMinx],
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/global.scss";
.slide-up-enter,
.slide-up-leave-to {
  transform: translate3d(0, px2rem(138), 0);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s linear;
}

.slide-up-enter-to,
.slide-up-leave {
  transform: translate3d(0, 0, 0);
}
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(48);
  display: flex;
  background: white;
  font-size: px2rem(20);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .icon-wrapper {
    flex: 1;
    @include center;
  }
  &.hide-box-shadow {
    box-shadow: none;
  }
}
</style>
