import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/pages/main/Main';
import NotFound from './components/pages/notfound/NotFound';
import Login from './components/pages/login/Login';
import SignUp from './components/pages/signup/Signup';
import Product_Detail from './components/pages/product/Product_Detail';
import Product_Instert from './components/pages/admin/Product_Instert/Product_Instert';



const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/product/:id" element={<Product_Detail />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/sign_up' element={<SignUp/>}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;