<template>
  <div class="ebook" ref="ebook">
    <EbookBokMark></EbookBokMark>
    <EbookTitle></EbookTitle>
    <EbookReder></EbookReder>
    <EbookMenu></EbookMenu>
  </div>
</template>

<script>
import EbookReder from '../../components/ebook/EbookReder'
import EbookTitle from '../../components/ebook/EbookTitle.vue'
import EbookMenu from '../../components/ebook/EbookMenu.vue'
import EbookBokMark from '../../components/ebook/EbookBookMark.vue'
import { getReadTime, saveReadTime } from '../../utils/localstorage.js'
import { ebookMinx } from '../../utils/mixin.js'
export default {
  mixins: [ebookMinx],
  components: { EbookReder, EbookTitle, EbookMenu, EbookBokMark },
  methods: {
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move (v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    restore () {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  },
  mounted () {
    this.startLoopReadTime()
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  },
  watch: {
    offsetY (v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
