<template>
  <div>
    <div
      class="search-bar"
      :class="{'hide-title' : !titleVisible, 'hide-shadow' : !shadowVisible}">
      <div class="title-icon-back-wrapper" :class="{'hide-title' : !titleVisible}" @click="back()">
        <span class="icon-back icon"></span>
      </div>
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard()">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="search-bar-input-wrapper" :class="{'hide-title' : !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title' : titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
            type="text"
            :placeholder="$t('home.hint')"
            class="input"
            v-model="searchText"
            @click="showHotSearch()"
            @keyup.13.exact="search"
          >
        </div>
      </div>
    </div>
    <HotSearchList v-show="hotSrarchVisibae"></HotSearchList>
  </div>
</template>

<script>
import { storeHomeMinx } from '../../utils/mixin'
import HotSearchList from './HotSearchList'

export default {
  mixins: [storeHomeMinx],
  components: {
    HotSearchList
  },
  name: 'SearchBar',
  data () {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSrarchVisibae: false
    }
  },
  methods: {
    search () {
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText
        }
      })
    },
    showFlapCard () {
      this.setFlapCardVisible(true)
    },
    back () {
      if (this.offsetY > 0) {
        this.showTiele()
      } else {
        this.hideHotSearch()
      }
      if (this.hotSrarchVisibae) {
        this.hideHotSearch()
      } else {
        this.$router.push('/store/shelf')
      }
    },
    hideHotSearch () {
      this.hotSrarchVisibae = false
    },
    showHotSearch () {
      this.hideTiele()
      this.hotSrarchVisibae = true
    },
    hideTiele () {
      this.titleVisible = false
    },
    showTiele () {
      this.titleVisible = true
    },
    hideShadow () {
      this.shadowVisible = false
    },
    showShadow () {
      this.shadowVisible = true
    }
  },
  watch: {
    offsetY (v) {
      if (v > 0) {
        this.hideTiele()
        this.showShadow()
      } else {
        this.showTiele()
        this.hideShadow()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .search-bar {
    width: 100%;
    height: px2rem(94);
    position: relative;
    z-index: 150;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-title {
      height: px2rem(52);
    }

    &.hide-shadow {
      box-shadow: none;
    }

    .title-icon-back-wrapper {
      z-index: 200;
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: px2rem(42);
      @include center;
      transition: height .2s linear;

      &.hide-title {
        height: px2rem(52);
      }
    }

    .search-bar-title-wrapper {
      width: 100%;
      height: px2rem(42);
      position: absolute;
      top: 0;
      left: 0;

      .title-text-wrapper {
        width: 100%;
        height: px2rem(42);
        @include center;
      }

      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
    }

    .search-bar-input-wrapper {
      position: absolute;
      top: px2rem(42);
      left: 0;
      display: flex;
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      transition: top .2s linear;

      &.hide-title {
        top: 0;
      }

      .search-bar-blank {
        /*flex: 0 0 px2rem(31);*/
        width: px2rem(31);
        transition: all .2s linear;

        &.hide-title {
          width: 0;
        }
      }

      .search-bar-input {
        flex: 1;
        width: 100%;
        border-radius: px2rem(20);
        background: #f4f4f4;
        @include left;
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;

        .icon-search {
          color: #999;
        }

        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          background: transparent;
          outline: none;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;

          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
