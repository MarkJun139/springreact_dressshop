import { configureStore } from '@reduxjs/toolkit'
import menuReducer, { toggleCategory } from './menuSlice';
import loginReducer from './loginSlice';
import userReducer, { setUserNick, resetUserNick } from './userSlice';

export default configureStore({
  reducer: { 
    menu: menuReducer,
    login: loginReducer,
    user: userReducer,
  }
}) 

export { toggleCategory, setUserNick, resetUserNick };
