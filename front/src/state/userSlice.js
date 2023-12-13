import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userNick: null, // 초기 상태는 null로 설정합니다.
  },
  reducers: {
    setUserNick: (state, action) => {
      state.userNick = action.payload; // userNick 상태를 변경합니다.
    },
    resetUserNick: state => {
      state.userNick = null; // userNick 상태를 초기화합니다.
    },
  },
});

export const { setUserNick, resetUserNick } = userSlice.actions;

export default userSlice.reducer;