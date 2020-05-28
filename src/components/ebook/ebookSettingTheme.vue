<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in ThemeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :style="{ background: item.style.body.background }"
            :class="{ select: item.name === defaultTheme }"
          ></div>
          <div class="text" :class="{ select: item.name === defaultTheme }">
            {{ item.alias }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMinx } from '../../utils/mixin.js'
import { saveTheme } from '../../utils/localstorage.js'
export default {
  mixins: [ebookMinx],
  methods: {
    setTheme (index) {
      const theme = this.ThemeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        this.initGlobleStyle()
      })
      saveTheme(this.fileName, theme.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  position: absolute;
  left: 0;
  bottom: px2rem(48);
  width: 100%;
  z-index: 151;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  background: white;
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        &.select {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(30);
        font-size: px2rem(16);
        color: #ccc;
        @include center;
        &.select {
          color: #333;
        }
      }
    }
  }
}
</style>
