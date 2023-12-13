import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../state/loginSlice';
import axios from 'axios';
import "./Login.css";
import { setUserNick } from '../../../state/userSlice';
import { Button, Modal } from 'react-bootstrap';

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setShowModal(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      handleShow('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      handleShow('비밀번호를 입력해주세요.');
      return;
    }

    const data = {
        uId: username,
        uPw: password
    };
    console.log(data);

    const response = await axios.post("http://localhost:3001/login", data);

    if(response.data) {
        dispatch(setLogin(true));
        console.log(response.data);
        const userNickFromResponse = response.data.unick;
        dispatch(setUserNick(userNickFromResponse));
        navigate('/');
    } else {
        dispatch(setLogin(false));
        console.log('로그인 실패');
    }
  }
  
  return (
    <>
      <div className="center-box">
        <div className="box">
          <h2 className="mb-4">로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">아이디:</label>
              <input type="text" id="username" className="form-control" autoComplete="username" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">비밀번호:</label>
              <input type="password" id="password" className="form-control" autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-outline-secondary">로그인</button>
              <Link to="/sign_up">
                <button type="button" className="btn btn-outline-secondary">회원가입</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>경고</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
