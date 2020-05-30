<template>
    <transition name="fade">
        <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow':ifHideShadow}">
            <div class="shelf-text-wrapper">
                <span class="shelf-title-text">{{title}}</span>
                <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-left" v-if="!showBack">
                <div class="shelf-title-btn-text" @click="clearCache()">
                    {{this.$t('shelf.clearCache')}}
                </div>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-right">
                <div class="shelf-title-btn-text" @click="onEditClick()">
                    {{ isEditMode ? this.$t('shelf.cancel') : this.$t('shelf.edit')}}
                </div>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
                <span class="icon-back" @click="back"></span>
            </div>
        </div>
    </transition>
</template>

<script>
    import { storeShelfMixin } from '../../utils/mixin'
    import { clearLocalStorage } from '../../utils/localstorage'
    import { clearLocalForage } from '../../utils/localForage'

    export default {
        mixins: [storeShelfMixin],
        name: 'shelfTitle',
        props: {
            title: {
                type: String
            },
            showBack: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            selectedText() {
                const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
                return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t(
                      'shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks')
                .replace('$1', selectedNumber))
            }
        },
        watch: {
            offsetY(v) {
                if (v > 0) {
                    this.ifHideShadow = false
                } else {
                    this.ifHideShadow = true
                }
            }
        },
        data() {
            return {
                ifHideShadow: true
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            onEditClick() {
                if (!this.isEditMode) {
                    this.setShelfSelected([])
                    this.shelfList.forEach((item) => {
                        item.selected = false
                    })
                    // this.ClearChooseState()
                    // 修改list中的Selected来区别是否被添加
                }
                this.setIsEditMode(!this.isEditMode)
            },
            clearCache() {
                clearLocalStorage()
                clearLocalForage()
                this.setShelfList([])
                this.setShelfSelected([])
                console.log('1')
                this.getShelfList()
                console.log('2')
                this.simpleToast(this.$t('shelf.clearCacheSuccess'))
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/global";

    .icon-back {
        font-size: px2rem(20);
        color: #666666;
    }

    .shelf-title {
        z-index: 130;
        position: relative;
        width: 100%;
        height: px2rem(42);
        background: white;
        box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

        &.hide-shadow {
            box-shadow: none;
        }

        .shelf-text-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: px2rem(42);
            @include columnCenter;

            .shelf-title-text {
                font-size: px2rem(16);
                line-height: px2rem(20);
                font-weight: bold;
                color: #333333;
            }

            .shelf-title-sub-text {
                font-size: px2rem(16);
                color: #333333;
            }

        }

        .shelf-title-btn-wrapper {
            position: absolute;
            top: 0;
            box-sizing: border-box;
            height: 100%;
            @include center;

            .shelf-title-btn-text {
                font-size: px2rem(14);
                color: #666666;
            }

            &.shelf-title-left {
                left: 0;
                padding-left: px2rem(15);
            }

            &.shelf-title-right {
                right: 0;
                padding-right: px2rem(15);
            }
        }
    }
</style>
