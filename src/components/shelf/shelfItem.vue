<template>
    <div class="shelf-item" :class="{ 'shelf-item-shadow' : data.type === 1 || data.type === 2 }" @click="onItemClick">
        <component :is="item" :data="data" class="shelf-item-comp"
                   :class="{'is-edit': isEditMode && data.type === 2}"></component>
        <div class="icon-selected"
             :class="{'is-selected': data.selected}"
             v-show="isEditMode && data.type === 1"></div>
    </div>
</template>

<script>
    import shelfAdd from './shelfAdd'
    import shelfCategory from './shelfCategory'
    import shelfImage from './shelfImage'
    import { gotoStoreHome } from '../../utils/store'
    import { storeShelfMixin } from '../../utils/mixin'

    export default {
        mixins: [storeShelfMixin],
        props: {
            data: Object
        },
        data() {
            return {
                add: shelfAdd,
                category: shelfCategory,
                book: shelfImage
            }
        },
        methods: {
            onItemClick() {
                if (this.isEditMode) {
                    this.data.selected = !this.data.selected
                    if (this.data.selected) {
                        if (this.shelfSelected.indexOf(this.data) === -1) {
                            this.shelfSelected.push(this.data)
                            console.log(this.shelfSelected)
                        }
                    } else {
                        this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
                    }
                } else {
                    if (this.data.type === 1) {
                        this.showBookDetail(this.data)
                    } else if (this.data.type === 2) {
                        this.$router.push({
                            path: '/store/category',
                            query: {
                                title: this.data.title
                            }
                        })
                    } else {
                        gotoStoreHome(this)
                    }
                }
            }
        },
        computed: {
            item() {
                return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/global";

    .shelf-item {
        position: relative;
        width: 100%;
        height: 100%;

        &.shelf-item-shadow {
            box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
        }

        .shelf-item-comp {
            opacity: 1;

            &.is-edit {
                opacity: .5;
            }
        }

        .icon-selected {
            position: absolute;
            bottom: px2rem(2);
            right: px2rem(2);
            font-size: px2rem(18);
            color: rgba(0, 0, 0, .4);

            &.is-selected {
                color: $color-blue;
            }
        }
    }
</style>
