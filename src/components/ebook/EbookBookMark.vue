<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="icondown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{ text }}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? FixedStyle : {}">
      <Bookmark :color="color" :width="15" :height="35"></Bookmark>
    </div>
  </div>
</template>

<script>
import { realPx } from '../../utils/utils.js'
import { ebookMinx } from '../../utils/mixin.js'
import Bookmark from '../common/Bookmark.vue'
import { getBookmark, saveBookmark } from '../../utils/localstorage.js'

const BLUE = '#346cbc'
const WHITE = '#ffffff'
export default {
  mixins: [ebookMinx],
  components: {
    Bookmark
  },
  data () {
    return {
      text: '',
      color: WHITE,
      isFixed: false
    }
  },
  computed: {
    height () {
      return realPx(35)
    },
    threshold () {
      return realPx(55)
    },
    FixedStyle () {
      return {
        position: 'fixed',
        top: '0',
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}`
      }
    }
  },
  methods: {
    beforeHeight (v) {
      // stateOne
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    beforeThreshold (v) {
      // stateTwo
      this.$refs.bookmark.style.top = `${-v}px`
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
      }

      const iconDown = this.$refs.icondown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
    },
    afterThreshold (v) {
      // stateThree
      this.$refs.bookmark.style.top = `${-v}px`
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark')
        this.isFixed = false
        this.color = WHITE
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.isFixed = true
        this.color = BLUE
      }
      const iconDown = this.$refs.icondown
      if (
        iconDown.style.transform === '' ||
        iconDown.style.transform === 'rotate(0deg)'
      ) {
        iconDown.style.transform = 'rotate(180deg)'
      }
    },
    restore () {
      // stateFour
      setTimeout(() => {
        this.$refs.bookmark.style.top = '$ { -this.height }px'
        this.$refs.icondown.style.transform = 'rotate(0deg)'
      }, 200)
      if (this.isFixed) {
        this.setIsBookmark(true)
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBookmark()
      }
    },
    addBookmark () {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
      }
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfiBase = currentLocation.start.cfi.replace(/!.*/, '')
      const cfiStart = currentLocation.start.cfi
        .replace(/.*!/, '')
        .replace(/\)$/, '')
      const cfiEnd = currentLocation.end.cfi
        .replace(/.*!/, '')
        .replace(/\)$/, '')
      const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`
      this.currentBook.getRange(cfiRange).then(range => {
        const text = range.toString().replace(/\s\s/g, '')
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text: text
        })
        saveBookmark(this.fileName, this.bookmark)
      })
    },
    removeBookmark () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      this.bookmark = getBookmark(this.fileName)
      if (this.bookmark) {
        this.bookmark = this.bookmark.filter(item => item.cfi !== cfi)
        saveBookmark(this.fileName, this.bookmark)
        this.setIsBookmark(false)
      }
    }
  },
  watch: {
    offsetY (v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return
      }
      if (v >= this.height && v < this.threshold) {
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        this.beforeHeight()
      } else if (v === 0) {
        this.restore()
      }
    },
    isBookmark (isBookmark) {
      if (isBookmark) {
        this.color = BLUE
        this.isFixed = true
      } else {
        this.color = WHITE
        this.isFixed = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";

.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  width: 100%;
  height: px2rem(35);
  z-index: 200;

  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;

    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      color: white;
      transition: all 0.2s linear;
      @include center;
    }

    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: white;
    }
  }

  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>
