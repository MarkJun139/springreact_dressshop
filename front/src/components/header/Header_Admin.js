import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header_Admin(props) {
    return (
        <>
            <Link to="/login">
                <button class="btn btn-outline-secondary btn-header">회원관리</button>
            </Link>
            <Link to="/sign_up">
                <button class="btn btn-outline-secondary btn-header">상품관리</button>
            </Link>
        </>
    );
};

export default Header_Admin;