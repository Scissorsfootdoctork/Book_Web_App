<template>
    <div class="Ebook-Reder">
        <div id="read"></div>
        <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd"></div>
    </div>
</template>

<script>
    import { ebookMinx } from '../../utils/mixin'
    import {
        getFontFamily,
        saveFontFamily,
        getFontSize,
        saveFontSize,
        getTheme,
        saveTheme,
        getLocation
    } from '../../utils/localstorage.js'
    import Epub from 'epubjs'
    import { getLocalForage } from '../../utils/localForage'

    global.epub = Epub
    export default {
        mixins: [ebookMinx],
        data() {
            return {
                touchStart: '',
                touchTime: ''
            }
        },
        methods: {
            move(e) {
                let offSetY = 0
                if (this.firstOffsetY) {
                    offSetY = e.changedTouches[0].clientY - this.firstOffsetY
                    this.setOffsetY(offSetY)
                } else {
                    this.firstOffsetY = e.changedTouches[0].clientY
                }
                e.preventDefault()
                e.stopPropagation()
            },
            moveEnd(e) {
                this.setOffsetY(0)
                this.firstOffsetY = null
            },
            onMaskClick(e) {
                const offSetX = e.offsetX
                const width = window.innerWidth
                if (offSetX > 0 && offSetX < width * 0.3) {
                    this.prevPage()
                } else if (offSetX > 0 && offSetX > width * 0.7) {
                    this.nextPage()
                } else {
                    this.showTitleAndMenu()
                }
            },
            prevPage() {
                if (this.rendition) {
                    this.rendition.prev().then(() => {
                        this.refreshLocation()
                    })
                    this.hideTitleAndMenu()
                }
            },
            nextPage() {
                if (this.rendition) {
                    this.rendition.next().then(() => {
                        this.refreshLocation()
                    })
                    this.hideTitleAndMenu()
                }
            },
            showTitleAndMenu() {
                if (this.menuVisible) {
                    this.setSettingVisible(-1)
                    this.setFontFamilyVisible(false)
                }
                this.setMenuVisible(!this.menuVisible)
            },
            initFontSize() {
                const fontSize = getFontSize(this.fileName)
                if (!fontSize) {
                    saveFontSize(this.fileName, this.defultFontSize)
                } else {
                    this.currentBook.rendition.themes.fontSize(fontSize)
                    this.setDefaultFontSize(fontSize)
                }
            },
            initFontFamily() {
                const font = getFontFamily(this.fileName)
                if (!font) {
                    saveFontFamily(this.fileName, this.defaultFontFamily)
                } else {
                    this.currentBook.rendition.themes.font(font)
                    this.setDefaultFontFamily(font)
                }
            },
            initTheme() {
                let defaultTheme = getTheme(this.fileName)
                if (!defaultTheme) {
                    defaultTheme = this.ThemeList[0].name
                    saveTheme(this.fileName, defaultTheme)
                }
                this.setDefaultTheme(defaultTheme)
                this.ThemeList.forEach(element => {
                    this.rendition.themes.register(element.name, element.style)
                })
                this.rendition.themes.select(defaultTheme)
            },
            initRendition() {
                this.rendition = this.book.renderTo('read', {
                    width: innerWidth,
                    height: innerHeight,
                    method: 'default'
                })

                this.rendition.display().then(() => {
                    const localtion = getLocation(this.fileName)
                    this.display(localtion, () => {
                        this.initTheme()
                        this.initFontSize()
                        this.initFontFamily()
                        this.initGlobleStyle()
                    })
                })
                this.rendition.hooks.content.register(contents => {
                    Promise.all([
                        contents.addStylesheet(
                              `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
                        ),
                        contents.addStylesheet(
                              `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
                        ),
                        contents.addStylesheet(
                              `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
                        ),
                        contents.addStylesheet(
                              `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
                        )
                    ]).then(() => {
                        console.log('字体全部加载完毕...')
                    })
                })
            },
            initGesture() {
                this.rendition.on('touchstart', e => {
                    this.touchStart = e.changedTouches[0].clientX
                    this.touchTime = e.timeStamp
                })
                this.rendition.on('touchend', e => {
                    const offsetX = this.touchStart - e.changedTouches[0].clientX
                    const Time = e.timeStamp - this.touchTime
                    if (Time < 400 && offsetX > 40) {
                        this.nextPage()
                    } else if (Time < 400 && offsetX < -40) {
                        this.prevPage()
                    } else {
                        this.showTitleAndMenu()
                    }
                    e.preventDefault()
                    e.stopPropagation()
                })
            },
            parseBook() {
                this.book.loaded.cover.then(cover => {
                    this.book.archive.createUrl(cover).then(url => {
                        this.setCover(url)
                    })
                })
                this.book.loaded.metadata.then(metadata => {
                    this.setMetadata(metadata)
                })
                this.book.loaded.navigation.then(navig => {
                    const navItem = navig.toc
                    this.setNavigation(navItem)
                })
            },
            initEpub(Url) {
                this.book = new Epub(Url)
                this.setCurrentBook(this.book)
                this.initRendition()
                this.initGesture()
                this.parseBook()
                this.book.ready
                .then(() => {
                    return this.book.locations.generate(
                          750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
                    )
                })
                .then(locations => {
                    this.setBookAvailable(true)
                    this.refreshLocation()
                })
            }
        },

        mounted() {
            const books = this.$route.params.fileName.split('|')
            const fileName = books[1]
            getLocalForage(fileName, (err, blob) => {
                if (!err && blob) {
                    console.log('1')
                    this.setFileName(books.join('/')).then(() => {
                        this.initEpub(blob)
                    })
                } else {
                    console.log('1')
                    this.setFileName(books.join('/')).then(
                          () => {
                              const Url =
                                    `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + '.epub'
                              this.initEpub(Url)
                          }
                    )
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .Ebook-Reder {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .ebook-reader-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 150;
            background: transparent;
        }
    }
</style>
