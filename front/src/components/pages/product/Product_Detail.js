import React from 'react';
import { useParams } from "react-router-dom"

const Product_Detail = (props) => {
    const { id } = useParams();
    return (
        <>
            <h3>{id}상품 페이지입니다.</h3>
            <img src={`http://localhost:3000/image/${id} 상세.jpg`} className="rounded float-start" alt="..."></img>
        </>
    );
}

export default Product_Detail;