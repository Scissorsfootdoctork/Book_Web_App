const store = {
    state: {
        hotSearchOffsetY: 0,
        FlapCardVisible: false,
        isEditMode: false,
        shelfList: [],
        shelfSelected: [],
        shelfTitleVisible: true
    },
    mutations: {
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
