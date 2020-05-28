<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="this.fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="left-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-title-text">{{ $t("book.selectFont") }}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item, index) in FontFamilyList"
          :key="index"
          @click="setFontFamilt(item.font)"
        >
          <div class="item-text" :class="{ seleted: isSeleted(item) }">
            {{ item.font }}
          </div>
          <div class="item-check" v-if="isSeleted(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FontFamilyList } from '../../utils/book.js'
import { ebookMinx } from '../../utils/mixin.js'
import { saveFontFamily } from '../../utils/localstorage.js'
export default {
  mixins: [ebookMinx],
  data () {
    return {
      FontFamilyList: FontFamilyList
    }
  },
  methods: {
    setFontFamilt (item) {
      this.setDefaultFontFamily(item)
      saveFontFamily(this.fileName, item)
      if (item === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(item)
      }
    },
    hide () {
      this.setFontFamilyVisible(false)
    },
    isSeleted (item) {
      return this.defaultFontFamily === item.font
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background: white;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    padding: px2rem(15);
    position: relative;
    text-align: center;
    @include center;
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    .left-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      font-size: px2rem(16);
      font-weight: bold;
      height: 100%;
      @include center;
    }
    .ebook-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: px2rem(15);
      .item-text {
        flex: 1;
        text-align: left;
        font-size: px2rem(14);
        &.seleted {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .item-check {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);
        color: #346cb9;
        font-weight: bold;
      }
    }
  }
}
</style>
