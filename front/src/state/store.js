import { configureStore } from '@reduxjs/toolkit'
import menuReducer, { toggleCategory } from './menuSlice';
import loginReducer from './loginSlice';
import userReducer, { setUserNick, resetUserNick } from './userSlice';
import productReducer from './productSlice';

export default configureStore({
  reducer: { 
    menu: menuReducer,
    login: loginReducer,
    user: userReducer,
    product: productReducer
  }
}) 

export { toggleCategory, setUserNick, resetUserNick };
