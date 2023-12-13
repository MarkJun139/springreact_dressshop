import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header_Guest(props) {
    return (
        <>
            <Link to="/login">
                <button class="btn btn-outline-secondary btn-header">로그인</button>
            </Link>
            <Link to="/sign_up">
                <button class="btn btn-outline-secondary btn-header">회원가입</button>
            </Link>
        </>
    );
};

export default Header_Guest;