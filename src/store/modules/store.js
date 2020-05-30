const store = {
    state: {
        hotSearchOffsetY: 0,
        FlapCardVisible: false,
        isEditMode: false,
        shelfList: [],
        shelfSelected: [],
        shelfTitleVisible: true,
        shelfCategory: [],
        currentType: 1
    },
    mutations: {
        SET_SHELF_CATEGORY(state, category) {
            state.shelfCategory = category
        },
        SET_CURRENT_TYPE(state, type) {
            state.currentType = type
        },
        Shelf_List_ClearChooseState(state) {
            state.shelfList.forEach((item) => {
                item.selected = false
            })
        },
        Set_hotSearchOffsetY(state, offsetY) {
            state.hotsearchOffsetY = offsetY
        },
        Set_FlapCardVisible(state, data) {
            state.FlapCardVisible = data
        },
        Set_isEditMode(state, isEditMode) {
            state.isEditMode = isEditMode
        },
        Set_shelfList(state, list) {
            state.shelfList = list
        },
        Set_shelfSelected(state, selected) {
            state.shelfSelected = selected
        },
        Set_shelfTitleVisible(state, visible) {
            state.shelfTitleVisible = visible
        }
    }
}
export default store
