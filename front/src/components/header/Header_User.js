import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Dropdown from "react-bootstrap/Dropdown";

function Header_User(props) {
  const dropdownElementList = document.querySelectorAll(".dropdown-toggle");

  const userNick = "유저1";

  return (
    <>
      <div className="header-user-container">
        <div className="header-user-nick">
        <Dropdown>{userNick}
          <Dropdown.Toggle variant="success" id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">회원정보수정</Dropdown.Item>
            <Dropdown.Item href="#/action-2">장바구니</Dropdown.Item>
            <Dropdown.Item href="#/action-3">구매목록</Dropdown.Item>
            <Dropdown.Item href="#/action-4">회원탈퇴</Dropdown.Item>
            <Dropdown.Item href="#/action-5">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </div>
    </>
  );
}

export default Header_User;