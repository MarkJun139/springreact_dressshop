import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../state/loginSlice';
import { resetUserNick } from "../../state/userSlice";

function Header_User(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const userNick = useSelector(state => state.user.userNick);

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(resetUserNick());
    setShowModal(false);
  };

  return (
    <>
      <div className="header-user-container">
        <div className="header-user-nick">
          <Dropdown>
            {userNick}
            <Dropdown.Toggle variant="success" id="dropdown-basic" />
            <Dropdown.Menu>
              <Dropdown.Item><Link to="/user" className="link">회원정보수정</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/action-2" className="link">장바구니</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/action-2" className="link">구매목록</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/action-3" className="link">회원탈퇴</Link></Dropdown.Item>
              <Dropdown.Item onClick={() => setShowModal(true)}>로그아웃</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>로그아웃</Modal.Title>
        </Modal.Header>
        <Modal.Body>로그아웃하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            로그아웃
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header_User;
