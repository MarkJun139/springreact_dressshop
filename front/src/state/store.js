import { configureStore, createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isCategoryOpen: false, // 초기 상태는 false로 설정합니다.
  },
  reducers: {
    toggleCategory: state => {
      state.isCategoryOpen = !state.isCategoryOpen; // 카테고리 메뉴의 상태를 토글합니다.
    },
  },
});

export const { toggleCategory } = menuSlice.actions; // toggleCategory 액션을 내보냅니다.

export default configureStore({
  reducer: { 
    menu: menuSlice.reducer, // 스토어에 menuSlice를 추가합니다.
  }
}) 


