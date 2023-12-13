import { createSlice } from '@reduxjs/toolkit';

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
  
  export const { toggleCategory } = menuSlice.actions;

  export default menuSlice.reducer;