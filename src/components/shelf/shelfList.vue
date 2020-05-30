<template>
    <div class="shelf-list" :style="{top: shelfListTop}">
        <div class="shelf-list-item-wrapper" v-for="(item, index) in List" :key="index">
            <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
            <div class="shelf-list-title-wrapper">
                <span class="shelf-list-title title-small">
                    {{item.title}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { storeShelfMixin } from '../../utils/mixin'
    import { realPx, px2rem } from '../../utils/utils'
    import ShelfItem from './shelfItem'

    export default {
        components: { ShelfItem },
        mixins: [storeShelfMixin],
        props: {
            top: {
                type: Number,
                default: 94
            },
            data: Array
        },
        computed: {
            List() {
                return this.data && this.data.length > 0 ? this.data : this.shelfList
            },
            shelfListTop() {
                return px2rem(this.top) + 'rem'
            },
            itemHeight() {
                // w / 250 = h / 350
                // h = w / 250 * 350
                return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/styles/global";

    .shelf-list {
        position: absolute;
        left: 0;
        z-index: 100;
        width: 100%;

        display: flex;
        flex-flow: row wrap;
        padding: 0 px2rem(15);
        box-sizing: border-box;

        .shelf-list-item-wrapper {
            flex: 0 0 33.33%;
            width: 33.33%;
            padding: px2rem(15);
            box-sizing: border-box;

            .shelf-list-title-wrapper {
                margin-top: px2rem(10);
            }
        }
    }
</style>
