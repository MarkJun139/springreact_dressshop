import React from 'react';
import Product from '../product/Product';
import './Main.css'; // 추가된 부분

const Main = (props) => {
	return (
		<div className="main-layout">
			<Product/>
		</div>
	);
};

export default Main;
