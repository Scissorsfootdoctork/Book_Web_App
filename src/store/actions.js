const actions = {
    setShelfCategory({ commit }, category) {
        return commit('SET_SHELF_CATEGORY', category)
    },
    setCurrentType({ commit }, type) {
        return commit('SET_CURRENT_TYPE', type)
    },
    ClearChooseState(ctx) {
        ctx.commit('Shelf_List_ClearChooseState')
    },
    setFontFamilyVisible: ({
        commit
    }, visible) => {
        return commit('SET_fontFamilyVisible', visible)
    },
    setDefaultFontFamily: ({
        commit
    }, font) => {
        return commit('SET_defaultFontFamily', font)
    },
    setDefaultFontSize: ({
        commit
    }, fontSize) => {
        return commit('SET_defultFontSize', fontSize)
    },
    setSettingVisible: ({
        commit
    }, visible) => {
        return commit('SET_settingVisible', visible)
    },
    setMenuVisible: ({
        commit
    }, visible) => {
        return commit('SET_menuVisible', visible)
    },
    setFileName: ({
        commit
    }, fileName) => {
        return commit('SET_fileName', fileName)
    },
    setDefaultTheme: ({
        commit
    }, theme) => {
        return commit('SET_defaultTheme', theme)
    },
    setBookAvailable: ({
        commit
    }, bookAvailable) => {
        return commit('SET_bookAvailable', bookAvailable)
    },
    setProgress: ({
        commit
    }, progress) => {
        return commit('SET_progress', progress)
    },
    setSection: ({
        commit
    }, section) => {
        return commit('SET_section', section)
    },
    setIsPaginating: ({
        commit
    }, isPaginating) => {
        return commit('SET_isPaginating', isPaginating)
    },
    setCurrentBook: ({
        commit
    }, book) => {
        return commit('SET_currentBook', book)
    },
    setNavigation: ({
        commit
    }, navigation) => {
        return commit('SET_navigation', navigation)
    },
    setCover: ({
        commit
    }, cover) => {
        return commit('SET_cover', cover)
    },
    setMetadata: ({
        commit
    }, metadata) => {
        return commit('SET_metadata', metadata)
    },
    setPaginate: ({
        commit
    }, paginate) => {
        return commit('SET_paginate', paginate)
    },
    setPagelist: ({
        commit
    }, pagelist) => {
        return commit('SET_pagelist', pagelist)
    },
    setIsBookmark({
        commit
    }, isBookmark) {
        return commit('SET_isBookmark', isBookmark)
    },
    setOffsetY({
        commit
    }, offsetY) {
        return commit('SET_offsetY', offsetY)
    },
    setHotSearchOffsetY(ctx, data) {
        return ctx.commit('Set_hotSearchOffsetY', data)
    },
    setFlapCardVisible(ctx, data) {
        return ctx.commit('Set_FlapCardVisible', data)
    },
    setIsEditMode({ commit }, isEditMode) {
        return commit('Set_isEditMode', isEditMode)
    },
    setShelfList({ commit }, list) {
        return commit('Set_shelfList', list)
    },
    setShelfSelected({ commit }, selected) {
        return commit('Set_shelfSelected', selected)
    },
    setShelfTitleVisible({ commit }, visible) {
        return commit('Set_shelfTitleVisible', visible)
    }
}
export default actions
