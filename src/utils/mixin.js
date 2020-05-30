import { mapGetters, mapActions } from 'vuex'
import {
    ThemeList,
    addCss,
    removeAllCss,
    getReadTimeByMinute
} from './book.js'
import {
    saveLocation,
    getBookmark,
    getBookShelf,
    saveBookShelf
} from './localstorage.js'
import { appendAddToShelf, gotoBookDetail } from './store'
import { shelf } from '../api/store'

export const ebookMinx = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defultFontSize',
            'currentBook',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        ThemeList() {
            return ThemeList(this)
        }
    },
    methods: {
        ...mapActions([
            'setFontFamilyVisible',
            'setDefaultFontFamily',
            'setDefaultFontSize',
            'setSettingVisible',
            'setMenuVisible',
            'setFileName',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setIsBookmark',
            'setOffsetY'
        ]),
        initGlobleStyle() {
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(
                          `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
                    break
                case 'Gold':
                    addCss(
                          `${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
                    break
                case 'Night':
                    addCss(
                          `${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
                    break
                default:
                    addCss(
                          `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
            }
        },
        refreshLocation() {
            const currentLocation = this.currentBook.rendition.currentLocation()
            const startCfi = currentLocation.start.cfi
            const progress = this.currentBook.locations.percentageFromCfi(
                  currentLocation.start.cfi
            )
            this.setProgress(Math.floor(progress * 100))
            saveLocation(this.fileName, startCfi)
            const bookmark = getBookmark(this.fileName)
            if (bookmark) {
                if (bookmark.some(item => item.cfi === startCfi)) {
                    this.setIsBookmark(true)
                } else {
                    this.setIsBookmark(false)
                }
            } else {
                this.setIsBookmark(false)
            }
        },
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            this.setFontFamilyVisible(false)
            this.setSettingVisible(-1)
        },
        getReadTimeText() {
            return this.$t('book.haveRead').replace(
                  '$1',
                  getReadTimeByMinute(this.fileName)
            )
        }
    }
}
export const storeHomeMinx = {
    computed: {
        ...mapGetters(['offsetY', 'hotSearchOffsetY', 'FlapCardVisible'])
    },
    methods: {
        ...mapActions(
              ['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible']),
        showBookDetail(book) {
            gotoBookDetail(this, book)
        }
    }
}
export const storeShelfMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'currentType',
            'shelfCategory'
        ])
    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfList',
            'setShelfSelected',
            'setShelfTitleVisible',
            'setOffsetY',
            'ClearChooseState',
            'setCurrentType',
            'setShelfCategory'
        ]),
        getCategoryList(title) {
            this.getShelfList().then(() => {
                const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
                this.setShelfCategory(categoryList)
            })
        },
        showBookDetail(book) {
            gotoBookDetail(this, book)
        },
        getShelfList() {
            let shelfList = getBookShelf()
            if (!shelfList) {
                shelf().then(response => {
                    if (response.status === 200 && response.data &&
                          response.data.bookList) {
                        shelfList = appendAddToShelf(response.data.bookList)
                        saveBookShelf(shelfList)
                        return this.setShelfList(shelfList)
                    }
                })
            } else {
                return this.setShelfList(shelfList)
            }
        }
    }
}
