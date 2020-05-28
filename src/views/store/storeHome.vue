<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <FlapCard :data="ran"></FlapCard>
    <scroll :top="top" :bottom="0" @onScroll="onscroll" ref="scroll">
      <div class="mk">
        <img :src="banner" alt="" style="width: 100%; height: 140px">
      </div>
      <GuessYouLike :data="guessYouLike"></GuessYouLike>
      <Recommend :data="recommend"></Recommend>
      <featured :data="featured" :title-text="$t('home.featured')" :btn-text="$t('home.seeAll')"></featured>
      <category :data="category"></category>
    </scroll>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import scroll from '../../components/common/scroll'
import FlapCard from '../../components/home/FlapCard'
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import { storeHomeMinx } from '../../utils/mixin'
import { home } from '../../api/store'
import Featured from '../../components/home/Featured'
import Category from '../../components/home/Category'

export default {
  name: 'storeHome',
  mixins: [storeHomeMinx],
  components: {
    Category,
    Featured,
    SearchBar,
    scroll,
    FlapCard,
    GuessYouLike,
    Recommend
  },
  data () {
    return {
      top: 94,
      ran: null,
      banner: null,
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      category: null
    }
  },
  methods: {
    onscroll (offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.top = 52
      } else {
        this.top = 94
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted () {
    home().then(res => {
      if (res && res.status === 200) {
        const index = Math.floor(Math.random() * res.data.random.length)
        this.ran = res.data.random[index]
        this.banner = res.data.banner
        this.guessYouLike = res.data.guessYouLike
        this.recommend = res.data.recommend
        this.featured = res.data.featured
        this.categoryList = res.data.categoryList
        this.category = res.data.categories
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .mk {
    padding: px2rem(10);

    .mkb {
      width: 100%;
      height: px2rem(140);
    }
  }

  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
