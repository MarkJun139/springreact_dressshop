import { configureStore, createSlice } from '@reduxjs/toolkit'
import menuReducer, { toggleCategory } from './menuSlice';
import loginReducer from './loginSlice';


export default configureStore({
  reducer: { 
    menu: menuReducer,
    login: loginReducer
  }
}) 

export { toggleCategory };
