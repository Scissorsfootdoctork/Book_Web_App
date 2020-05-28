const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1, // -1:不显示，0:字号显示，1:主题显示，2：进度，3:目录
    defultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null
  },
  mutations: {
    SET_fileName: (state, fileName) => {
      state.fileName = fileName
    },
    SET_menuVisible: (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    SET_settingVisible: (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    SET_defultFontSize: (state, defultFontSize) => {
      state.defultFontSize = defultFontSize
    },
    SET_defaultFontFamily: (state, font) => {
      state.defaultFontFamily = font
    },
    SET_fontFamilyVisible: (state, visible) => {
      state.fontFamilyVisible = visible
    },
    SET_defaultTheme: (state, theme) => {
      state.defaultTheme = theme
    },
    SET_bookAvailable: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_progress: (state, progress) => {
      state.progress = progress
    },
    SET_section: (state, section) => {
      state.section = section
    },
    SET_isPaginating: (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    SET_currentBook: (state, currentBook) => {
      state.currentBook = currentBook
    },
    SET_navigation: (state, navigation) => {
      state.navigation = navigation
    },
    SET_cover: (state, cover) => {
      state.cover = cover
    },
    SET_metadata: (state, metadata) => {
      state.metadata = metadata
    },
    SET_paginate: (state, paginate) => {
      state.paginate = paginate
    },
    SET_pagelist: (state, pagelist) => {
      state.pagelist = pagelist
    },
    SET_offsetY: (state, offsetY) => {
      state.offsetY = offsetY
    },
    SET_isBookmark: (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
  },
  actions: {}
}
export default book
